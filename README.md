<div align="center">

# shadcn-skills-design-starter

A **Next.js + shadcn/ui + Tailwind v4** project where the **design system is the single source
of truth** — driven by **Claude Code agent skills** and a complete **design-token spec**, so AI
agents build UI that stays faithful to the system and to Figma. Ships with a live **component
documentation site** and a **warm brand theme** (cream + charcoal surfaces, orange primary).

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-new--york-111827">
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude_Code-skills-d97757">
  <img alt="Theme" src="https://img.shields.io/badge/theme-%23d97757-d97757">
</p>

</div>

---

## ✨ What is this?

Three things in one repo:

1. **A design-system starter** — every color, spacing, radius, and type value comes from a
   semantic token, never a guess. Two themes (**Brand** + **Neutral**), each with light + dark.
2. **A live documentation site** — browse all **55 shadcn/ui components** plus design-token
   foundation pages (colors, typography, spacing, sizing, effects) at `localhost:3000`.
3. **A Claude Code workspace** — agent skills + `CLAUDE.md` that make any AI agent build UI
   consistent with the system and with Figma, automatically.

| | |
|---|---|
| 🎨 **Two themes** | **Brand** (cream `#faf9f5` + charcoal `#141413` + orange `#d97757`) and **Neutral**, each in light + dark |
| 🧩 **35 semantic tokens** | full light/dark parity in [`DESIGN.md`](./.claude/skills/shadcn-ui-design/references/DESIGN.md) §2, backed by an extensive Tailwind + Radix reference palette (§3–§12) |
| 📚 **55 documented components** | every shadcn component from the Figma file — live demos, variants, props, tokens, and a11y notes |
| 🤖 **18 Claude Code skills** | the project's `shadcn-ui-design` authority + the `ux-ui-agent-skills` design kit (17 skills) |
| 🖼️ **Figma → code** | Dev Mode MCP workflow **and** a REST-API color puller — read the node, map to tokens, build |
| ⚡ **Modern stack** | Next.js 16 (App Router, Turbopack), React 19, Tailwind v4 |

---

## 🛠️ Tech stack

- **Framework** — Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5
- **Styling** — Tailwind CSS v4 (CSS-first, `@theme inline`, HSL tokens, light + dark)
- **UI** — shadcn/ui (style `new-york`, CSS variables, lucide icons) on Radix UI + **Base UI**
- **Theming** — `next-themes` (class-based dark mode) · `clsx` + `tailwind-merge` via `cn()`
- **Building blocks** — `cmdk`, `embla-carousel`, `react-day-picker`, `recharts`, `sonner`, `vaul`, `input-otp`
- **Design source** — Figma (Dev Mode MCP + REST API)
- **Tooling** — ESLint · npm

---

## 🚀 Getting started

```bash
# 1. install dependencies
npm install

# 2. start the dev server (Turbopack)
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**. The home page is the documentation
site — use the sidebar to explore foundations and components. Toggle **light/dark** and switch
between the **Brand** and **Neutral** themes from the header controls.

> **Requirements:** Node ≥ 18 · npm.

---

## 📚 The documentation site

Everything renders from a single registry, so adding a component wires up its route, sidebar
entry, and page automatically.

### Foundations

| Route | What it shows |
|---|---|
| [`/tokens`](http://localhost:3000/tokens) | Live color-token swatches (Brand/Neutral × light/dark) |
| [`/typography`](http://localhost:3000/typography) | Type scale, families, weights |
| [`/spacing`](http://localhost:3000/spacing) | Spacing scale + usage |
| [`/sizing`](http://localhost:3000/sizing) | Size tokens |
| [`/effects`](http://localhost:3000/effects) | Shadows, radius, opacity, blur |

### Components

Browse all **55** at [`/components/<slug>`](http://localhost:3000/components/accordion). Each page
follows the shadcn docs shape: **Installation → Usage → Examples**, then this project's extras —
**API Reference, Design Tokens, Accessibility**, plus deep links to Figma and shadcn/ui.

<details>
<summary><b>All 55 components</b></summary>

accordion · alert · alert-dialog · aspect-ratio · avatar · badge · breadcrumb · button ·
button-group · calendar · card · carousel · chart · checkbox · collapsible · combobox · command ·
context-menu · data-table · date-picker · dialog · drawer · dropdown-menu · empty · field ·
hover-card · input · input-group · input-otp · item · kbd · label · menubar · native-select ·
navigation-menu · pagination · popover · progress · radio-group · scroll-area · select · separator ·
sheet · sidebar · skeleton · slider · sonner · spinner · switch · table · tabs · textarea · toggle ·
toggle-group · tooltip

</details>

---

## 🎨 Design system & tokens

The **35 semantic tokens** are the source of truth. They live in **two synced places** —
[`DESIGN.md`](./.claude/skills/shadcn-ui-design/references/DESIGN.md) §2 (the spec) and
[`app/globals.css`](./app/globals.css) (the runtime). **Change a token in both, together.**

Two themes share the same token names — switch by class on `<html>`:

| `<html>` class | Theme |
|---|---|
| _(none)_ | Brand light (default) |
| `dark` | Brand dark |
| `theme-neutral` | Neutral light |
| `theme-neutral dark` | Neutral dark |

**The rules** (full detail in the skill):

- ✅ Semantic tokens only — `bg-primary`, `text-muted-foreground`, `border-border` · **never** raw colors (`bg-white`, `bg-[#d97757]`)
- ✅ Pair surface + foreground — on `bg-card` use `text-card-foreground`
- ✅ `gap-*` not `space-x/y-*` · `size-10` not `w-10 h-10` · `cn()` for conditional classes
- ✅ Keep accessibility — `focus-visible` rings, `aria-*`, `Label htmlFor`

### Adding components

Always add via the CLI — never hand-fork `components/ui/*`:

```bash
npx shadcn@latest add button card input
npx shadcn@latest add <component> --dry-run --diff   # preview an update first
```

---

## 🤖 Claude Code skills

Open this repo in **[Claude Code](https://claude.com/claude-code)**. It loads
[`CLAUDE.md`](./CLAUDE.md) every session, and these skills under `.claude/skills/` activate
automatically (or via slash commands):

### `shadcn-ui-design` — the project authority

The single source of truth for building UI here. Reference docs:

| File | Read it when |
|---|---|
| `references/DESIGN.md` | **Always** — tokens, type, spacing, radius, palettes, dark mode |
| `references/TASTE.md` | Building anything visual — the anti-slop / aesthetic doctrine |
| `references/A11Y.md` | Verifying accessibility — WCAG 2.2 POUR checklist |
| `references/UX-WRITING.md` | Writing UI copy — labels, errors, empty states, microcopy |

### `ux-ui-agent-skills` — the design kit (17 skills)

A broader design toolkit. Invoke as slash commands in Claude Code:

`/design-tokens` · `/design-code` · `/design-component` · `/design-review` · `/design-qa` ·
`/apply-aesthetic` · `/brandkit` · `/a11y-audit` · `/redesign` · `/prototype` · `/image-to-code` ·
`/figma-integration` · `/migrate-design-system` · `/token-build` · `/governance` · `/performance` ·
`/ux-writing`

It also ships data folders at the repo root — `tokens/`, `design-systems/` (138 named systems),
`taste/`, `accessibility/`, `frameworks/`, `workflows/`, `content/`.

---

## 🖼️ Figma integration

This repo connects to a single Figma file and offers **two** ways to pull design data.

### 1. Dev Mode MCP (read a node, build it)

1. **Read** the selected node — `get_design_context`, `get_screenshot`, `get_metadata`.
2. **Map** every Figma variable to a token in `DESIGN.md`. No matching token → stop and ask.
3. **Build** from shadcn primitives via the CLI, then compose.
4. **Verify** fidelity against the screenshot — build exactly what the node shows.

### 2. REST-API color pull (no MCP)

Map Figma colors to the nearest project token (perceptual OKLab ΔE):

```bash
# the project's adapted puller (maps to this project's HSL tokens) — ships in this repo
npm run figma:pull -- <nodeId>

# OR the full upstream tool — clone it yourself (it is git-ignored, not bundled here)
git clone https://github.com/plugin87/figma-rest-api
node figma-rest-api/figma-pull.mjs --file <fileKey> <nodeId>
```

> **Token setup:** both read the Figma personal access token from `.mcp.json`, which is
> **git-ignored**. Copy [`.mcp.json.example`](./.mcp.json.example) → `.mcp.json` and add your PAT.

---

## 🧱 How the docs registry works

Add a component once and the whole site picks it up:

```
lib/docs.ts                       # registry: slug, title, description (drives routes + sidebar)
app/components/[slug]/demos.tsx   # the main Preview per component
app/components/[slug]/galleries.tsx  # the Examples (variants) per component
scripts/gen-meta.mjs   ──▶  lib/component-meta.ts   # Props / Tokens / a11y / usage
```

> ⚠️ **`lib/component-meta.ts` is auto-generated.** Edit the authored data in
> **`scripts/gen-meta.mjs`**, then run `node scripts/gen-meta.mjs` to regenerate it.

---

## 📜 Scripts & commands

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run figma:pull -- <nodeId>` | Pull Figma colors → map to this project's tokens |
| `node figma-rest-api/figma-pull.mjs --file <fileKey> <nodeId>` | Upstream puller (clone it yourself — git-ignored) |
| `node scripts/gen-meta.mjs` | Regenerate `lib/component-meta.ts` |
| `npx shadcn@latest info --json` | Print project context (run before any UI change) |
| `npx shadcn@latest add <component>` | Install a shadcn component |
| `npx tsc --noEmit` | Type-check |

---

## ☁️ Deploy

Deploy on **[Vercel](https://vercel.com/new)** — the platform built by the creators of Next.js.
See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
for other targets.

---

<div align="center">

Built with the **`shadcn-ui-design`** Claude Code skill · color puller adapted from
[`plugin87/figma-rest-api`](https://github.com/plugin87/figma-rest-api) (MIT)

</div>
