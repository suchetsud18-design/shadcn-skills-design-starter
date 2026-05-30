<div align="center">

# shadcn-skills-design-starter

A **Next.js + shadcn/ui + Tailwind v4** starter wired with a **Claude Code skill** and a
full **design-token spec** — so AI agents build UI that stays faithful to the design system
and to Figma.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-new--york-111827">
</p>

</div>

---

## ✨ What is this?

A starter where the **design system is the single source of truth**. Every color, spacing,
radius, and type value comes from a token — never a guess. The rules and tokens live in a
[Claude Code](https://claude.com/claude-code) skill that Claude (or any AI agent) discovers
automatically, so generated UI is consistent and Figma-faithful out of the box.

| | |
|---|---|
| 🎨 **Design tokens** | 1,788 variables across 16 collections — [`DESIGN.md`](./.claude/skills/shadcn-ui-design/references/DESIGN.md) |
| 🧩 **35 semantic tokens** | shadcn/ui tokens with full light + dark parity |
| 🤖 **Claude Code skill** | auto-discovered `shadcn-ui-design` skill drives every UI change |
| 🖼️ **Figma → code** | Figma Dev Mode MCP workflow: read the node, map to tokens, build |
| ⚡ **Modern stack** | Next.js 16 (App Router, Turbopack), React 19, Tailwind v4 |

---

## 🛠️ Tech stack

- **Framework** — Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5
- **Styling** — Tailwind CSS v4 (CSS-first, `@theme inline`, OKLCH/HSL tokens, light + dark)
- **UI** — shadcn/ui (style `new-york`, base `neutral`, CSS variables, lucide icons)
- **Theming** — `next-themes` (class-based dark mode) · `clsx` + `tailwind-merge` via `cn()`
- **Design source** — Figma (Dev Mode MCP)
- **Tooling** — ESLint · npm

---

## 📁 Project structure

```
.
├── app/                              # Next.js App Router (layout, pages, globals.css)
├── public/                           # static assets
├── components.json                   # shadcn config        (after Setup)
├── lib/utils.ts                      # cn() helper          (after Setup)
├── CLAUDE.md                         # instructions loaded into Claude on every session
└── .claude/
    └── skills/shadcn-ui-design/      # the design-system skill (authority on tokens)
        ├── SKILL.md                  # how to build UI in this project
        ├── references/DESIGN.md      # full token + component spec (source of truth)
        ├── assets/                   # static assets the skill ships
        └── scripts/                  # helper scripts
```

---

## 🚀 Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and edit `app/page.tsx` — it hot-reloads.

### Wire up the design system (one-time)

The Next.js app is scaffolded; finish wiring shadcn/ui and the tokens:

```bash
# 1. Init shadcn — choose style: new-york, base color: neutral, CSS variables: yes
npx shadcn@latest init

# 2. Dark mode
npm install next-themes
#    then wrap app/layout.tsx in <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

# 3. Copy the design tokens from DESIGN.md §2 into app/globals.css (light + dark)

# 4. Add components as you need them
npx shadcn@latest add button card input
```

---

## 🤖 Working with Claude Code

Open this repo in [Claude Code](https://claude.com/claude-code). On every session it loads
[`CLAUDE.md`](./CLAUDE.md), and the `shadcn-ui-design` skill activates automatically the
moment you touch UI (shadcn components, Tailwind classes, or Figma nodes).

**The non-negotiables it enforces:**

- ✅ Semantic tokens only — `bg-primary`, `text-muted-foreground` · never raw colors
- ✅ `gap-*` not `space-x/y-*` · `size-10` not `w-10 h-10` · `cn()` for conditional classes
- ✅ Components via the CLI (`npx shadcn@latest add`) — never hand-fork `components/ui/*`
- ✅ Tokens edited in `app/globals.css` only — no new CSS files
- ✅ Build exactly what Figma shows — no invented states, no dropped details

### Figma → code workflow

1. **Read** the selected node with the Figma Dev Mode MCP (`get_code`, `get_variable_defs`, `get_image`).
2. **Map** every Figma variable to a token in `DESIGN.md`. No matching token → stop and ask.
3. **Build** from shadcn primitives via the CLI, then compose.
4. **Verify** fidelity against the Figma image.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npx shadcn@latest info --json` | Print project context (run before any UI change) |
| `npx shadcn@latest add <component>` | Install a shadcn component |

---

## ☁️ Deploy

Deploy on [Vercel](https://vercel.com/new) — the platform built by the creators of Next.js.
See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
for other targets.
