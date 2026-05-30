# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

A **Next.js (App Router) web app** whose UI is built with **shadcn/ui + Tailwind CSS v4**,
driven by a design system whose tokens live in the `shadcn-ui-design` skill
(`.claude/skills/shadcn-ui-design/`), which Claude Code auto-discovers.

The theme is a **warm brand** — cream (`#faf9f5`) + charcoal (`#141413`) surfaces with an
**orange (`#d97757`) primary**, plus blue/green accents. Full light + dark support.

### Current status

- ✅ Next.js scaffolded (App Router, TypeScript, Tailwind v4, ESLint, no `src/`, alias `@/*`);
  `npm run dev` / `build` / `lint` all work; production build verified.
- ✅ Git repo initialized.
- ✅ shadcn config in place — `components.json` + `lib/utils.ts` (`cn()`) at the root.
- ✅ **Brand tokens wired into `app/globals.css`** (35 semantic tokens, light + dark).

## Tech stack

- **Next.js** (App Router) · **React** · **TypeScript**
- **Tailwind CSS v4** (CSS-first config — no `tailwind.config` for colors; theme lives in
  `app/globals.css` via `@theme inline`)
- **shadcn/ui** (style: new-york, CSS variables, lucide icons) with **custom brand tokens**
- **next-themes** (class-based dark mode) · **clsx** + **tailwind-merge** via `cn()` helper
- **Figma** (Dev Mode MCP) as the design source
- Package manager: **npm**

## Figma source

- File: https://www.figma.com/design/NN6Wp4Hgsug3OKhiQdL27d/-shadcn_ui-components-not-token--Fluke---Copy-?node-id=0-1&t=mEHamhvqeP1gFHAQ-1 — used by the Figma Dev Mode MCP and (optionally) Code Connect.
- Build only from a Figma node a task explicitly provides — never invent one.

## Directory structure

```
.
├── CLAUDE.md                            # this file
├── app/                                 # Next.js App Router (layout, pages, globals.css)
├── components/
│   └── ui/                              # shadcn primitives (added via CLI — don't fork)
├── lib/
│   └── utils.ts                         # cn() helper
├── components.json                      # shadcn config
└── .claude/
    └── skills/shadcn-ui-design/         # the design-system skill (authority on tokens)
        ├── SKILL.md                     # how to build UI in this project
        ├── references/
        │   └── DESIGN.md                # token + component spec (source of truth)
        └── assets/                      # scaffold templates (cp into the app)
            ├── globals.css              # brand tokens — mirrors app/globals.css
            ├── components.json
            └── lib/utils.ts
```

## Setup

Next.js is scaffolded, the shadcn config is in place, and the brand tokens are already wired
into `app/globals.css`. To re-apply the tokens (or after a fresh `shadcn init`):

```bash
cp .claude/skills/shadcn-ui-design/assets/globals.css     app/globals.css
cp .claude/skills/shadcn-ui-design/assets/components.json  components.json
cp .claude/skills/shadcn-ui-design/assets/lib/utils.ts     lib/utils.ts
```

For dark mode, wrap `app/layout.tsx` in a `next-themes` `ThemeProvider`
(`attribute="class"`, `defaultTheme="system"`, `enableSystem`) and add `suppressHydrationWarning`
on `<html>`. The `.dark` token values ship in `app/globals.css`.

Before any UI change, read real project context:

```bash
npx shadcn@latest info --json
```

## The design system & the skill

**`.claude/skills/shadcn-ui-design/` is the authority for all UI/styling.** Whenever you add or
edit a component, build a page, style anything, theme, or wire dark mode, **follow that skill**
and treat `references/DESIGN.md` as the source of truth for tokens.

Core rules (full detail in `SKILL.md`):

- **Semantic tokens only** — `bg-background`, `text-muted-foreground`, `bg-primary text-primary-foreground`,
  `border-border`. **Never** hardcode colors (`bg-white`, `bg-orange-500`, `bg-[#d97757]`) — use the
  semantic token (`bg-primary`, not `bg-orange-*`).
- **Add components via the CLI** (`npx shadcn@latest add …`) — don't hand-write or fork `components/ui/*`.
- **Pair surface/foreground** (on `bg-card` → `text-card-foreground`).
- **Keep a11y** — `focus-visible` rings, `aria-*`, `Label htmlFor`. (Primary uses charcoal text on
  orange for 6.2:1 contrast.)

## Tokens

The 35 semantic tokens are defined in **`DESIGN.md` §2** (light + dark) and mirrored verbatim in
**`app/globals.css`** and **`assets/globals.css`**. They are the source of truth — there is no
auto-generator. **To change a token, edit `DESIGN.md` §2 and both `globals.css` files together**
so they stay in sync. Sections §3–§12 of `DESIGN.md` are the supporting reference palette.

## Figma integration (MCP)

A Figma Dev Mode MCP server is the design source (see **Figma source** for the file). When a task
references a Figma node, never skip to coding:

1. **Read** the frame — `get_design_context`, `get_screenshot`, `get_metadata` — to see structure,
   visuals, and the exact variables it uses.
2. **Map** every Figma variable to a token in `DESIGN.md` (§2 colors, §3 type, §5 radius, §6 spacing).
   Use **only** this project's semantic tokens — never the raw colors Figma reports. No matching
   token → stop and ask.
3. **Build** from shadcn primitives via the CLI, then compose. Never hand-write `components/ui/*`.
4. **Verify** fidelity against the screenshot — build exactly what the node shows; no added states,
   no dropped details, no "polish".

**Code ↔ design mapping:** use Code Connect (`get_code_connect_map`, `add_code_connect_map`) to link
`components/ui/*` to their Figma components so design-to-code stays consistent.

## Do / Don't

### Do

- ✓ Follow the `shadcn-ui-design` skill for every UI change; read `references/DESIGN.md` first.
- ✓ Keep `DESIGN.md` §2 and both `globals.css` files in sync when changing a token.
- ✓ Build from shadcn primitives via the CLI, then compose with `className` + `cn()`.
- ✓ Server Components by default; add `"use client"` only at the deepest interactive leaf.
- ✓ Verify before done: no hardcoded colors, light + dark both work, responsive, accessible,
  `npm run lint` + `tsc` pass.

### Don't

- ✗ Hardcode colors / spacing / radius outside the token set.
- ✗ Fork `components/ui/*` — override with `className` + `cn()` instead.
- ✗ Change a token in only one place — `DESIGN.md` and the `globals.css` files must match.
- ✗ Use raw Figma color values when implementing a design — map them to this project's semantic tokens.
- ✗ Invent Figma details: doesn't show it → don't add it; shows it → don't drop it.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # ESLint
npx tsc --noEmit     # typecheck

npx shadcn@latest info --json                        # project context (run first)
npx shadcn@latest search <query>                     # find a component
npx shadcn@latest add <component>                    # install a component
npx shadcn@latest add <component> --dry-run --diff   # preview an update before applying
```
