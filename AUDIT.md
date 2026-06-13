# Component Audit Report

**Figma file:** `@shadcn_ui components not token (Fluke) (Copy)`
(`NN6Wp4Hgsug3OKhiQdL27d`) — 90 pages
**Compared against:** docs registry (`lib/docs.ts`) · installed `components/ui/` · the
`shadcn-ui-design` skill (`SKILL.md` + `references/DESIGN.md`)
**Date:** 2026-06-01
**Method:** Figma REST API (`/v1/files/.../nodes`) → enumerate the "Components" section
pages, normalise names, diff against the project's documented + installed set.

---

## 1. Headline — Figma Components ↔ project

| Source | Count | Result |
|---|---|---|
| Figma "Components" section (pages 9–63) | **55** | — |
| Docs registry (`componentDocs`) | **55** | **1:1 exact match** |
| Installed `components/ui/` primitives | 52 | all present in the registry |
| Demos (`app/components/[slug]/demos.tsx`) | 55 | every component has a demo |

✅ **No gaps in either direction** — zero components are *in Figma but undocumented*, and
zero are *documented but missing from Figma*.

> The 52-vs-55 difference is expected: **combobox**, **data-table**, and **date-picker**
> are *composed* recipes (popover + command, table + tanstack, popover + calendar) with no
> single `ui/*.tsx` file. They still appear in the registry and have demos.

### Full component set (55)

accordion · alert · alert-dialog · aspect-ratio · avatar · badge · breadcrumb · button ·
button-group · calendar · card · carousel · chart · checkbox · collapsible · combobox ·
command · context-menu · data-table · date-picker · dialog · drawer · dropdown-menu · empty ·
field · hover-card · input · input-group · input-otp · item · kbd · label · menubar ·
native-select · navigation-menu · pagination · popover · progress · radio-group · scroll-area ·
select · separator · sheet · sidebar · skeleton · slider · sonner · spinner · switch · table ·
tabs · textarea · toggle · toggle-group · tooltip

---

## 2. Figma-side hygiene (no code impact)

Figma page names contain typos / inconsistent markers. The project uses the correct slugs,
so nothing is broken in code — these are upstream-design cleanups:

| Figma page name | Correct |
|---|---|
| `Contex Menu` | Context Menu |
| `Input OPT` | Input OTP |
| `KPD` | Kbd |
| `Seperator` | Separator |

Also: trailing spaces and a `🔵` marker appear on several names (`Field 🔵 `,
`Native Select 🔵 `, …). The `🔵` flags 8 newer components — **Button Group, Empty, Field,
Input Group, Item, Kbd, Native Select, Spinner** — all of which the project already ships.

---

## 3. SKILL.md fixes applied

The audit found three references in `SKILL.md` that did not match the actual component set.
All were corrected:

| Was | Issue | Fixed to |
|---|---|---|
| §3.4 `Form` (react-hook-form + zod) | project installs `field`, not `form` | rewrote §3.4 as a **`Field`** pattern (`FieldGroup`/`FieldLabel`/`FieldDescription`/`FieldError`, library-agnostic) |
| §8 install: `add form …` | same | `add field …` |
| §10 `Combobox → add combobox` | shadcn has no `combobox` to `add` | `add popover command` (composed) |
| §10 `Resizable → add resizable` | not in Figma, not installed, not documented | row replaced with `Field → add field` |

---

## 4. Out of scope (in Figma, not base components)

Present in the Figma file but **not** part of the component audit; not yet built as docs pages:

- **Examples** — Dashboard, Tasks, Playground, Authentication
- **Blocks** — Featured, Sidebar, Login, Signup, OTP, Calendar
- **Charts** — Area, Bar, Line, Pie, Radar, Radial, Tooltip *(project ships only the base
  `Chart` component)*
- **Icons** — Lucide, Tabler

---

## Conclusion

**Component coverage between Figma and the project is 100% (55/55)** — nothing missing,
nothing extra. The only follow-ups are the upstream Figma name typos (§2) and the
`SKILL.md` corrections, which have been applied (§3).
