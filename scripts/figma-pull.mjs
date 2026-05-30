#!/usr/bin/env node
// figma-pull — pull design data from Figma via the OFFICIAL REST API.
//
// Adapted for create-skill-design from plugin87/figma-rest-api (MIT, © plugin87).
// Upstream maps Figma colors to OKLCH tokens; THIS project's tokens are HSL, so
// this copy adds HSL support (hslToOklab) and falls back to the semantic tokens
// in app/globals.css when no OKLCH primitive table is present.
//
// Usage (run from the project root):
//   node scripts/figma-pull.mjs <nodeId> [nodeId ...] [--file <KEY>] [--out report.json]
//   npm run figma:pull -- 0-1
//
// Token resolution (first found wins):
//   1. $FIGMA_PERSONAL_ACCESS_TOKEN
//   2. mcpServers.figma.env.FIGMA_PERSONAL_ACCESS_TOKEN in ./.mcp.json
//
// File key:  --file <KEY> or $FIGMA_FILE_KEY (the npm script passes --file).
//
// Color → token mapping (auto when present in the cwd):
//   - semantic tokens from app/globals.css  (:root / .dark)  — hsl() or oklch()
//   - primitives  from .claude/skills/*/references/DESIGN.md  (§B oklch table, if any)

import { readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const root = process.cwd()
const API = "https://api.figma.com"

/* --------------------------------------------------------------- args + auth */

function parseArgs(argv) {
  const opts = { nodes: [], file: null, out: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--file") opts.file = argv[++i]
    else if (a === "--out") opts.out = argv[++i]
    else if (a === "--help" || a === "-h") opts.help = true
    else opts.nodes.push(...a.split(",").filter(Boolean))
  }
  opts.nodes = [...new Set(opts.nodes.map((n) => n.replace(":", "-")))]
  return opts
}

function resolveToken() {
  if (process.env.FIGMA_PERSONAL_ACCESS_TOKEN) {
    return process.env.FIGMA_PERSONAL_ACCESS_TOKEN.trim()
  }
  try {
    const mcp = JSON.parse(readFileSync(join(root, ".mcp.json"), "utf8"))
    const tok = mcp?.mcpServers?.figma?.env?.FIGMA_PERSONAL_ACCESS_TOKEN
    if (tok) return tok.trim()
  } catch {
    /* no .mcp.json — fall through */
  }
  return null
}

async function figmaFetch(path, token) {
  const res = await fetch(`${API}${path}`, { headers: { "X-Figma-Token": token } })
  const body = await res.text()
  if (!res.ok) {
    let msg = body
    try {
      msg = JSON.parse(body).message ?? body
    } catch {
      /* keep raw */
    }
    throw new Error(`HTTP ${res.status} on ${path} — ${msg}`)
  }
  return JSON.parse(body)
}

/* ------------------------------------------------------------ color helpers */

const channel = (v) =>
  Math.round(v * 255)
    .toString(16)
    .padStart(2, "0")

function rgbaToHex(c) {
  const base = `#${channel(c.r)}${channel(c.g)}${channel(c.b)}`
  return c.a !== undefined && c.a < 1 ? base + channel(c.a) : base
}

function rgbaString(c) {
  const r = Math.round(c.r * 255)
  const g = Math.round(c.g * 255)
  const b = Math.round(c.b * 255)
  const a = c.a ?? 1
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${+a.toFixed(3)})` : `rgb(${r}, ${g}, ${b})`
}

/* --------------------------------------------- token matching (sRGB ↔ OKLab) */
// Both the Figma fills (sRGB hex) and the project tokens (HSL or OKLCH) are
// converted into OKLab and matched by perceptual distance (deltaE).

function srgbToLinear(v) {
  const c = v / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

// shared core: r,g,b in 0..255 -> OKLab
function rgbToOklab(r255, g255, b255) {
  const r = srgbToLinear(r255)
  const g = srgbToLinear(g255)
  const b = srgbToLinear(b255)
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  }
}

function hexToOklab(hex) {
  const h = hex.replace("#", "")
  return rgbToOklab(
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  )
}

function oklchToOklab(str) {
  const inner = str.slice(str.indexOf("(") + 1, str.lastIndexOf(")"))
  const [L, C, H] = inner.split("/")[0].trim().split(/\s+/).map(Number)
  const rad = ((H || 0) * Math.PI) / 180
  return { L, a: (C || 0) * Math.cos(rad), b: (C || 0) * Math.sin(rad) }
}

// hsl(H S% L% [/ A]) -> OKLab  (added for this project's HSL tokens)
function hslToOklab(str) {
  const nums = (str.slice(str.indexOf("(") + 1).split("/")[0].match(/[\d.]+/g) || []).map(Number)
  const [h, sp, lp] = nums
  const s = (sp ?? 0) / 100
  const l = (lp ?? 0) / 100
  const k = (n) => (n + h / 30) % 12
  const aa = s * Math.min(l, 1 - l)
  const f = (n) => l - aa * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return rgbToOklab(f(0) * 255, f(8) * 255, f(4) * 255)
}

function cssColorToOklab(val) {
  return val.startsWith("oklch") ? oklchToOklab(val) : hslToOklab(val)
}

function loadReference() {
  const ref = []
  // primitives — DESIGN.md §B oklch table (blue/700, neutral/200, …), if present
  try {
    const design = readFileSync(
      join(root, ".claude/skills/shadcn-ui-design/references/DESIGN.md"),
      "utf8",
    )
    const sectionB = design.slice(design.indexOf("## §B"), design.indexOf("## §C"))
    for (const m of sectionB.matchAll(/`([a-z]+)\/(\d+)`\s*\|\s*`(oklch\([^`]+)`/g)) {
      ref.push({ name: `${m[1]}/${m[2]}`, kind: "primitive", ...oklchToOklab(m[3]) })
    }
  } catch {
    /* no §B primitives — semantic tokens below carry the mapping */
  }
  // semantic — globals.css :root / .dark  (--primary, --border, …) in hsl() or oklch()
  try {
    const css = readFileSync(join(root, "app/globals.css"), "utf8")
    for (const [selector, mode] of [[":root", "light"], ["\\.dark", "dark"]]) {
      const body =
        css.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\}`, "m"))?.[1] ?? ""
      for (const m of body.matchAll(/--([\w-]+):\s*((?:hsl|oklch)\([^;]+)\s*;/g)) {
        ref.push({ name: `--${m[1]}`, kind: "semantic", mode, ...cssColorToOklab(m[2]) })
      }
    }
  } catch {
    /* no globals.css — semantic unavailable */
  }
  return ref
}

function makeMatcher() {
  const ref = loadReference()
  const primitives = ref.filter((r) => r.kind === "primitive")
  const semantics = ref.filter((r) => r.kind === "semantic")
  const nearest = (lab, list) =>
    list.reduce((best, r) => {
      const d = deltaE(lab, r)
      return !best || d < best.delta ? { name: r.name, mode: r.mode, delta: d } : best
    }, null)

  return function match(hex) {
    if (!/^#[0-9a-fA-F]{6}/.test(hex)) return null
    if (!primitives.length && !semantics.length) return null
    const lab = hexToOklab(hex)
    const prim = primitives.length ? nearest(lab, primitives) : null
    const sem = semantics.length ? nearest(lab, semantics) : null
    const src = prim ?? sem // prefer a named primitive; else the nearest token
    return {
      token: src.name,
      delta: +src.delta.toFixed(4),
      exact: src.delta < 0.003,
      // show a separate semantic match only when a primitive was the primary hit
      semantic: prim && sem && sem.delta < 0.012 ? { name: sem.name, mode: sem.mode } : null,
    }
  }
}

const deltaE = (x, y) => Math.hypot(x.L - y.L, x.a - y.a, x.b - y.b)

/* ----------------------------------------------------------------- traversal */

function inspect(node) {
  const colors = new Map() // hex -> { count, rgba }
  const bindings = [] // { nodeName, type, property, variableId }

  function addPaint(p, key, nodeName, nodeType) {
    if (p?.type === "SOLID" && p.color) {
      const c = { ...p.color, a: p.opacity ?? p.color.a }
      const hex = rgbaToHex(c)
      const entry = colors.get(hex) ?? { count: 0, rgba: rgbaString(c) }
      entry.count++
      colors.set(hex, entry)
    }
    const vid = p?.boundVariables?.color?.id
    if (vid) bindings.push({ nodeName, nodeType, property: `${key}.color`, variableId: vid })
  }

  function walk(n) {
    if (!n || typeof n !== "object") return
    for (const key of ["fills", "strokes"]) {
      if (Array.isArray(n[key])) n[key].forEach((p) => addPaint(p, key, n.name, n.type))
    }
    if (n.boundVariables && typeof n.boundVariables === "object") {
      for (const [prop, binding] of Object.entries(n.boundVariables)) {
        if (prop === "color") continue
        const b = Array.isArray(binding) ? binding[0] : binding
        if (b?.id) {
          bindings.push({ nodeName: n.name, nodeType: n.type, property: prop, variableId: b.id })
        }
      }
    }
    if (Array.isArray(n.children)) n.children.forEach(walk)
  }

  walk(node)

  return {
    colors: [...colors.entries()]
      .map(([hex, v]) => ({ hex, rgba: v.rgba, count: v.count }))
      .sort((a, b) => b.count - a.count),
    bindings,
  }
}

/* ---------------------------------------------------------------------- main */

async function main() {
  const opts = parseArgs(process.argv.slice(2))

  if (opts.help || opts.nodes.length === 0) {
    console.log(
      "Usage: node scripts/figma-pull.mjs <nodeId> [nodeId ...] [--file KEY] [--out report.json]\n" +
        "Example: npm run figma:pull -- 0-1",
    )
    process.exit(opts.help ? 0 : 1)
  }

  const token = resolveToken()
  if (!token) {
    console.error("✗ No Figma token found. Set $FIGMA_PERSONAL_ACCESS_TOKEN or add it to .mcp.json.")
    process.exit(1)
  }

  const fileKey = opts.file ?? process.env.FIGMA_FILE_KEY
  if (!fileKey) {
    console.error("✗ No file key. Pass --file <KEY> or set $FIGMA_FILE_KEY.")
    process.exit(1)
  }

  let varNames = null
  try {
    const vars = await figmaFetch(`/v1/files/${fileKey}/variables/local`, token)
    varNames = new Map(
      Object.entries(vars.meta?.variables ?? {}).map(([id, v]) => [id, v.name]),
    )
    console.log(`✓ Variables API: resolved ${varNames.size} variable names\n`)
  } catch (e) {
    console.log(`· Variables API unavailable (${String(e.message).slice(0, 60)}…)`)
    console.log("  → bound variables will be shown as raw IDs.\n")
  }

  const match = makeMatcher()

  const ids = opts.nodes.join(",")
  const data = await figmaFetch(`/v1/files/${fileKey}/nodes?ids=${ids}`, token)

  const report = { fileKey, file: data.name, nodes: [] }

  for (const id of opts.nodes) {
    const wrap = data.nodes[id] ?? data.nodes[id.replace("-", ":")]
    if (!wrap?.document) {
      console.log(`⚠ node ${id} not found in file\n`)
      continue
    }
    const doc = wrap.document
    const { colors, bindings } = inspect(doc)

    const mapped = colors.map((c) => {
      const m = match(c.hex)
      return {
        ...c,
        token: m?.token ?? null,
        delta: m?.delta ?? null,
        exact: m?.exact ?? null,
        semantic: m?.semantic ?? null,
      }
    })

    const named = bindings.map((b) => ({
      ...b,
      variableName: varNames?.get(b.variableId) ?? null,
    }))

    report.nodes.push({ id, name: doc.name, type: doc.type, colors: mapped, bindings: named })

    console.log(`━━ ${doc.type}  "${doc.name}"  (${id}) ━━`)
    console.log(`  ${colors.length} solid colors · ${bindings.length} variable bindings`)
    console.log("  Color → token:")
    for (const c of mapped.slice(0, 14)) {
      let tag = ""
      if (c.token) {
        tag = `  ${c.exact ? "=" : "≈"} ${c.token}${c.exact ? "" : ` (Δ${c.delta})`}`
        if (c.semantic) {
          tag += `  · ${c.semantic.name}${c.semantic.mode === "dark" ? " (dark)" : ""}`
        }
      }
      console.log(`    ${c.hex.padEnd(9)} ${String(c.count).padStart(3)}×${tag}`)
    }
    if (named.length) {
      const uniq = [...new Map(named.map((b) => [b.variableName ?? b.variableId, b])).values()]
      console.log("  Bound variables:")
      for (const b of uniq.slice(0, 12)) {
        console.log(`    ${(b.variableName ?? b.variableId).padEnd(28)} ← ${b.property}`)
      }
    }
    console.log("")
  }

  if (opts.out) {
    const outPath = resolve(root, opts.out)
    writeFileSync(outPath, JSON.stringify(report, null, 2))
    console.log(`✓ wrote ${outPath} (${report.nodes.length} nodes)`)
  }
}

main().catch((e) => {
  console.error(`✗ ${e.message}`)
  process.exit(1)
})
