# CLAUDE.md

## Project overview

A Next.js UI project built against a fixed design system. The design system is the
authority — every color, space, radius, and type value comes from a token, never a guess.
Tokens, component rules, and the build workflow live in the `shadcn-ui-design` skill
(`.claude/skills/shadcn-ui-design/`), which Claude Code auto-discovers.

### Current status

- ✅ Next.js is scaffolded (App Router, TypeScript, Tailwind v4, ESLint, no `src/`,
  import alias `@/*`). `npm run dev` / `build` / `lint` all work; production build verified.
- ✅ Git repo initialized by `create-next-app`.
- ⏳ **shadcn/ui not initialized yet** — `components.json`, `lib/utils.ts` (`cn()`), and the
  design tokens in `app/globals.css` are not in place. See **Setup → step 2** below.

## Tech stack

- **Next.js** (App Router) · **React** · **TypeScript**
- **Tailwind CSS** v4 (CSS-first config — no `tailwind.config` for colors; tokens live in
  `app/globals.css` via `@theme inline`)
- **shadcn/ui** (style: new-york, baseColor: neutral, CSS variables, lucide icons)
- **next-themes** (class-based dark mode) · **clsx** + **tailwind-merge** via `cn()` helper
- **Figma** (Dev Mode MCP) as the design source
- Package manager: **npm**

## Figma source

- File: _not set yet_ — paste the Figma file URL / key here once available, e.g.
  `https://figma.com/design/<fileKey>/<name>`. Used by the Figma Dev Mode MCP and (optionally)
  Code Connect.
- Until a file is set, only build from a Figma node a task explicitly provides — never invent one.

## Directory structure (intended)

```
.
├── CLAUDE.md                       # this file
├── app/                            # Next.js App Router (pages, layout, globals.css)
├── components/
│   └── ui/                         # shadcn primitives (added via CLI — don't fork)
├── lib/
│   └── utils.ts                    # cn() helper
├── components.json                 # shadcn config
└── .claude/
    └── skills/shadcn-ui-design/    # the design-system skill (authority on tokens)
        ├── SKILL.md                # how to build UI in this project
        ├── references/
        │   └── DESIGN.md           # full token + component spec (source of truth)
        ├── assets/                 # static assets the skill ships (images, exports)
        └── scripts/                # helper scripts (token sync, codegen)
```

## Setup

Run once to scaffold the app into this folder, then verify.

```bash
# 1. Scaffold Next.js (App Router, TypeScript, Tailwind) into the current folder
npx create-next-app@latest . --typescript --tailwind --app --eslint

# 2. Init shadcn — choose style: new-york, base color: neutral, CSS variables: yes
npx shadcn@latest init

# 3. Dark mode + add components as needed
npm install next-themes
npx shadcn@latest add button card input

# 4. Start git
git init
```

After setup, **always** run this before a code change to read real project context
(framework, style, base library, RSC, Tailwind version, CSS path, installed components):

```bash
npx shadcn@latest info --json
```

## Figma → code workflow

When a task references a Figma node or file, never skip to coding:

1. **Read the design** with the Figma Dev Mode MCP — `get_code` (structure),
   `get_variable_defs` (the exact variables used), `get_image` (visual reference).
2. **Map every Figma variable → a DESIGN.md token** (§2 colors, §3 type, §5 radius,
   §6 spacing). No matching token → **stop and ask**, don't hardcode a raw value.
3. **Build with the CLI** — `npx shadcn@latest add <name>`, then compose. Never hand-write
   `components/ui/*`.
4. **Verify fidelity** against `get_image`. Build exactly what the node shows — no added
   states, no inferred parts, no "polish".

## Do / Don't

### Do

- ✓ Follow the `shadcn-ui-design` skill for every UI change; read `references/DESIGN.md` first.
- ✓ Use design tokens identical to the Figma export; regenerate rather than hand-edit.
- ✓ Build from shadcn primitives via the CLI, then compose with `className` + `cn()`.
- ✓ Server Components by default; add `"use client"` only at the deepest interactive leaf.
- ✓ Verify before done: no hardcoded colors, font family/scale match the spec, responsive,
  accessible, `npm run lint` + `tsc` pass.

### Don't

- ✗ Hardcode colors / spacing / radius outside the token set.
- ✗ Fork `components/ui/*` — override with `className` + `cn()` instead.
- ✗ Edit generated files (`DESIGN.md`, `globals.css` values) by hand — change the Figma
  export and regenerate.
- ✗ Use raw Figma color values when implementing a design — map them to this project's
  semantic tokens.
- ✗ Invent Figma details: doesn't show it → don't add it; shows it → don't drop it.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # ESLint

npx shadcn@latest info --json                        # project context (run first)
npx shadcn@latest search <query>                     # find a component
npx shadcn@latest add <component>                    # install a component
npx shadcn@latest add <component> --dry-run --diff   # preview an update before applying
```
