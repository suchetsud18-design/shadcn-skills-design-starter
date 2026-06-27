#!/usr/bin/env node
// figma-push — the WRITE side of the round-trip. Sync a project token value into
// the matching Figma *variable* via the official Variables REST API.
//
// Pull is read-only; this is the counterpart that writes back. The Variables write
// endpoint (POST /v1/files/:key/variables) needs a PAT with the `file_variables:write`
// scope (and, per Figma's docs, an Enterprise org). This script is the empirical test
// of that requirement: run --list first, then --set one value, and read the verbatim
// API response to see whether the account is actually allowed to write.
//
// Usage (from project root):
//   node scripts/figma-push.mjs --list                       # read: dump every variable
//   node scripts/figma-push.mjs --set "muted-foreground" #67645b [--mode light]
//
// Token resolution (first found wins):
//   1. $FIGMA_PERSONAL_ACCESS_TOKEN   2. mcpServers.figma.env in ./.mcp.json
// File key:  --file <KEY> | $FIGMA_FILE_KEY | the project default below.

import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const API = "https://api.figma.com"
const DEFAULT_FILE_KEY = "NN6Wp4Hgsug3OKhiQdL27d" // the project's Figma file

/* ----------------------------------------------------------------- args + auth */

function parseArgs(argv) {
  const o = { list: false, set: null, hex: null, mode: null, file: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--list") o.list = true
    else if (a === "--set") o.set = argv[++i]
    else if (a === "--mode") o.mode = argv[++i]
    else if (a === "--file") o.file = argv[++i]
    else if (a === "--help" || a === "-h") o.help = true
    else if (!o.hex && /^#?[0-9a-fA-F]{6}$/.test(a)) o.hex = a
  }
  return o
}

function resolveToken() {
  if (process.env.FIGMA_PERSONAL_ACCESS_TOKEN) return process.env.FIGMA_PERSONAL_ACCESS_TOKEN.trim()
  try {
    const mcp = JSON.parse(readFileSync(join(root, ".mcp.json"), "utf8"))
    const tok = mcp?.mcpServers?.figma?.env?.FIGMA_PERSONAL_ACCESS_TOKEN
    if (tok) return tok.trim()
  } catch {
    /* no .mcp.json */
  }
  return null
}

async function figma(path, token, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "X-Figma-Token": token, "Content-Type": "application/json", ...(init.headers || {}) },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { ok: res.ok, status: res.status, body }
}

/* -------------------------------------------------------------- color → Figma rgba */
// Figma variable color values are { r,g,b,a } floats in 0..1.

function hexToRgba(hex) {
  const h = hex.replace("#", "")
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  }
}

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const t = (x) => Math.round(x * 255).toString(16).padStart(2, "0")
  return `#${t(f(0))}${t(f(8))}${t(f(4))}`
}

// Read a semantic token's hex from app/globals.css for a given selector (mode).
function tokenHexFromCss(name, selector) {
  try {
    const css = readFileSync(join(root, "app/globals.css"), "utf8")
    const block = css.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\}`, "m"))?.[1] ?? ""
    const line = block.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim()
    if (!line) return null
    let m
    if ((m = line.match(/^#?[0-9a-fA-F]{6}$/))) return line.startsWith("#") ? line : `#${line}`
    if ((m = line.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/)))
      return hslToHex(+m[1], +m[2], +m[3])
  } catch {
    /* no globals.css */
  }
  return null
}

/* ---------------------------------------------------------------------- main */

async function main() {
  const o = parseArgs(process.argv.slice(2))
  if (o.help || (!o.list && !o.set)) {
    console.log(
      "Usage:\n" +
        "  node scripts/figma-push.mjs --list\n" +
        '  node scripts/figma-push.mjs --set "muted-foreground" #67645b [--mode light]\n' +
        "(omit the hex on --set to read the value from app/globals.css)",
    )
    process.exit(o.help ? 0 : 1)
  }

  const token = resolveToken()
  if (!token) {
    console.error("✗ No Figma token. Set $FIGMA_PERSONAL_ACCESS_TOKEN or add it to .mcp.json.")
    process.exit(1)
  }
  const fileKey = o.file ?? process.env.FIGMA_FILE_KEY ?? DEFAULT_FILE_KEY

  // READ: the local variables of the file. Needs `file_variables:read`.
  console.log(`· GET /v1/files/${fileKey}/variables/local …`)
  const read = await figma(`/v1/files/${fileKey}/variables/local`, token)
  if (!read.ok) {
    console.error(`\n✗ HTTP ${read.status} — cannot read variables.`)
    console.error(JSON.stringify(read.body, null, 2))
    console.error(
      "\n→ If the message mentions `file_variables:read` scope, mint a new PAT with the\n" +
        "  Variables (read+write) scope. If it mentions plan/permission, the file's org\n" +
        "  gates the Variables API (Enterprise).",
    )
    process.exit(1)
  }

  const vars = read.body.meta?.variables ?? {}
  const cols = read.body.meta?.variableCollections ?? {}
  const colorVars = Object.values(vars).filter((v) => v.resolvedType === "COLOR")
  console.log(`✓ read ${Object.keys(vars).length} variables (${colorVars.length} color) in ${Object.keys(cols).length} collections\n`)

  const modeName = (collectionId, modeId) =>
    cols[collectionId]?.modes?.find((m) => m.modeId === modeId)?.name ?? modeId

  if (o.list) {
    for (const v of colorVars) {
      const modes = Object.entries(v.valuesByMode || {})
        .map(([mid, val]) => {
          const c = val && typeof val === "object" && "r" in val
            ? `#${[val.r, val.g, val.b].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("")}`
            : "→alias"
          return `${modeName(v.variableCollectionId, mid)}:${c}`
        })
        .join("  ")
      console.log(`  ${v.name.padEnd(28)} ${v.id}   ${modes}`)
    }
    return
  }

  // SET: find the variable by (fuzzy) name and write one mode value.
  const want = o.set.toLowerCase().replace(/[^a-z0-9]/g, "")
  const target = colorVars.find((v) => v.name.toLowerCase().replace(/[^a-z0-9]/g, "") === want)
    || colorVars.find((v) => v.name.toLowerCase().includes(o.set.toLowerCase()))
  if (!target) {
    console.error(`✗ No COLOR variable matching "${o.set}". Run --list to see available names.`)
    process.exit(1)
  }

  const col = cols[target.variableCollectionId]
  const modeId = o.mode
    ? col.modes.find((m) => m.name.toLowerCase() === o.mode.toLowerCase())?.modeId
    : col.defaultModeId
  if (!modeId) {
    console.error(`✗ Mode "${o.mode}" not in collection "${col?.name}". Modes: ${col?.modes?.map((m) => m.name).join(", ")}`)
    process.exit(1)
  }

  // value: explicit --hex wins, else read from globals.css for the matching mode
  const cssSelector = modeName(target.variableCollectionId, modeId).toLowerCase().includes("dark") ? "\\.dark" : ":root"
  const hex = (o.hex && (o.hex.startsWith("#") ? o.hex : `#${o.hex}`)) || tokenHexFromCss(target.name, cssSelector)
  if (!hex) {
    console.error(`✗ No hex given and couldn't read --${target.name} from app/globals.css. Pass a #hex.`)
    process.exit(1)
  }

  console.log(`→ set "${target.name}" (${target.id}) mode "${modeName(target.variableCollectionId, modeId)}" = ${hex}`)
  const payload = {
    variableModeValues: [{ variableId: target.id, modeId, value: hexToRgba(hex) }],
  }
  const write = await figma(`/v1/files/${fileKey}/variables`, token, {
    method: "POST",
    body: JSON.stringify(payload),
  })
  if (write.ok) {
    console.log(`\n✓ WRITE OK (HTTP ${write.status}) — REST variable write succeeded.`)
    console.log(JSON.stringify(write.body, null, 2))
  } else {
    console.error(`\n✗ WRITE FAILED — HTTP ${write.status}`)
    console.error(JSON.stringify(write.body, null, 2))
    console.error(
      "\n→ A `file_variables:write` scope message = fix the PAT scope.\n" +
        "  A plan/permission message = the Variables write API is gated (Enterprise).",
    )
    process.exit(1)
  }
}

main().catch((e) => {
  console.error(`✗ ${e.message}`)
  process.exit(1)
})
