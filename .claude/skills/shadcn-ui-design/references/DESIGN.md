# DESIGN SYSTEM SPEC
> shadcn/ui + Tailwind CSS v4 + Next.js App Router
> Theme: Warm brand — cream + charcoal surfaces, orange (#d97757) primary | Light + Dark mode
>
> **Source of truth for:** tokens, spacing, typography, component rules
> For usage patterns (code patterns, CLI) → [`SKILL.md`](./SKILL.md)
>
> **Tokens:** §2 defines the 35 semantic brand tokens (light + dark) the app consumes;
> §3–§12 document the supporting reference palette (1,788 variables across 16 collections).

---

## 1. Core Principles

| Principle | Description |
|---|---|
| **Semantic tokens** | Use meaningful CSS variables — never hardcode colors |
| **Composition** | Compose components from smaller pieces — don't build from scratch if one exists |
| **Open code** | shadcn is source code in your project — edit it directly |
| **Dark mode first** | Every token must support the `.dark` class at all times |
| **Accessible** | contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI elements |

---

## 2. Shadcn/ui Semantic Tokens (35 variables)

> The 35 semantic tokens for this project's **brand theme** — cream + charcoal surfaces with an
> orange (`#d97757`) primary. These are the source of truth; edit values here **and** in
> `app/globals.css` / `assets/globals.css` together (kept in sync by hand).

```css
/* globals.css — Light mode */
:root {
  --radius: 0.5rem;
  --background: hsl(48 33% 97%);  /* cream #faf9f5 */
  --foreground: hsl(60 3% 8%);  /* charcoal #141413 */
  --card: hsl(48 40% 99%);  /* warm white */
  --card-foreground: hsl(60 3% 8%);  /* charcoal */
  --popover: hsl(48 40% 99%);  /* warm white */
  --popover-foreground: hsl(60 3% 8%);  /* charcoal */
  --primary: hsl(15 63% 60%);  /* orange #d97757 */
  --primary-foreground: hsl(60 3% 8%);  /* charcoal (a11y 6.2:1) */
  --secondary: hsl(50 21% 89%);  /* light gray #e8e6dc */
  --secondary-foreground: hsl(60 3% 8%);  /* charcoal */
  --muted: hsl(50 21% 89%);  /* light gray #e8e6dc */
  --muted-foreground: hsl(48 6% 40%);  /* warm gray */
  --accent: hsl(50 21% 89%);  /* light gray #e8e6dc */
  --accent-foreground: hsl(60 3% 8%);  /* charcoal */
  --destructive: hsl(0 72% 51%);  /* red/600 */
  --border: hsl(48 16% 84%);  /* warm gray/200 */
  --input: hsl(48 16% 84%);  /* warm gray/200 */
  --ring: hsl(15 63% 60%);  /* orange */
  --chart-1: hsl(15 63% 60%);  /* orange #d97757 */
  --chart-2: hsl(210 49% 61%);  /* blue #6a9bcc */
  --chart-3: hsl(86 20% 46%);  /* green #788c5d */
  --chart-4: hsl(49 7% 67%);  /* mid gray #b0aea5 */
  --chart-5: hsl(38 45% 55%);  /* gold */
  --sidebar: hsl(48 30% 96%);  /* cream raised */
  --sidebar-foreground: hsl(60 3% 8%);  /* charcoal */
  --sidebar-primary: hsl(15 63% 60%);  /* orange */
  --sidebar-primary-foreground: hsl(60 3% 8%);  /* charcoal */
  --sidebar-accent: hsl(50 21% 89%);  /* light gray */
  --sidebar-accent-foreground: hsl(60 3% 8%);  /* charcoal */
  --sidebar-border: hsl(48 16% 84%);  /* warm gray/200 */
  --sidebar-ring: hsl(15 63% 60%);  /* orange */
  --background-color: hsl(0 0% 0% / 30%);  /* black/30% */
  --semantic-background: hsl(40 6% 45%);  /* warm stone/500 */
  --semantic-border: hsl(40 6% 60%);  /* warm stone/400 */
  --semantic-foreground: hsl(0 0% 100%);  /* white */
}

/* Dark mode — derived from token file colors (tw/colors + rdx/colors) */
.dark {
  --background: hsl(60 3% 8%);  /* charcoal #141413 */
  --foreground: hsl(48 33% 97%);  /* cream #faf9f5 */
  --card: hsl(60 3% 11%);  /* charcoal raised */
  --card-foreground: hsl(48 33% 97%);  /* cream */
  --popover: hsl(60 3% 11%);  /* charcoal raised */
  --popover-foreground: hsl(48 33% 97%);  /* cream */
  --primary: hsl(15 63% 60%);  /* orange #d97757 */
  --primary-foreground: hsl(60 3% 8%);  /* charcoal */
  --secondary: hsl(54 4% 16%);  /* charcoal/200 */
  --secondary-foreground: hsl(48 33% 97%);  /* cream */
  --muted: hsl(54 4% 16%);  /* charcoal/200 */
  --muted-foreground: hsl(49 7% 67%);  /* mid gray #b0aea5 */
  --accent: hsl(54 4% 19%);  /* charcoal/300 */
  --accent-foreground: hsl(48 33% 97%);  /* cream */
  --destructive: hsl(0 63% 40%);  /* red/800 */
  --border: hsl(54 4% 19%);  /* charcoal/300 */
  --input: hsl(54 4% 19%);  /* charcoal/300 */
  --ring: hsl(15 63% 60%);  /* orange */
  --chart-1: hsl(15 63% 60%);  /* orange */
  --chart-2: hsl(210 49% 61%);  /* blue */
  --chart-3: hsl(86 20% 46%);  /* green */
  --chart-4: hsl(49 7% 67%);  /* mid gray */
  --chart-5: hsl(38 45% 55%);  /* gold */
  --sidebar: hsl(60 3% 6%);  /* charcoal deep */
  --sidebar-foreground: hsl(48 33% 97%);  /* cream */
  --sidebar-primary: hsl(15 63% 60%);  /* orange */
  --sidebar-primary-foreground: hsl(60 3% 8%);  /* charcoal */
  --sidebar-accent: hsl(54 4% 16%);  /* charcoal/200 */
  --sidebar-accent-foreground: hsl(48 33% 97%);  /* cream */
  --sidebar-border: hsl(54 4% 19%);  /* charcoal/300 */
  --sidebar-ring: hsl(15 63% 60%);  /* orange */
  --background-color: hsl(0 0% 0% / 50%);  /* black overlay */
  --semantic-background: hsl(40 6% 45%);  /* warm stone/500 */
  --semantic-border: hsl(40 6% 60%);  /* warm stone/400 */
  --semantic-foreground: hsl(0 0% 100%);  /* white */
}
```

### Shadcn/ui Token Reference

| Token | Light | Dark | Light alias | Dark alias |
|---|---|---|---|---|
| `--background` | hsl(48 33% 97%) | hsl(60 3% 8%) | cream #faf9f5 | charcoal #141413 |
| `--foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal #141413 | cream #faf9f5 |
| `--card` | hsl(48 40% 99%) | hsl(60 3% 11%) | warm white | charcoal raised |
| `--card-foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal | cream |
| `--popover` | hsl(48 40% 99%) | hsl(60 3% 11%) | warm white | charcoal raised |
| `--popover-foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal | cream |
| `--primary` | hsl(15 63% 60%) | hsl(15 63% 60%) | orange #d97757 | orange #d97757 |
| `--primary-foreground` | hsl(60 3% 8%) | hsl(60 3% 8%) | charcoal (a11y 6.2:1) | charcoal |
| `--secondary` | hsl(50 21% 89%) | hsl(54 4% 16%) | light gray #e8e6dc | charcoal/200 |
| `--secondary-foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal | cream |
| `--muted` | hsl(50 21% 89%) | hsl(54 4% 16%) | light gray #e8e6dc | charcoal/200 |
| `--muted-foreground` | hsl(48 6% 40%) | hsl(49 7% 67%) | warm gray | mid gray #b0aea5 |
| `--accent` | hsl(50 21% 89%) | hsl(54 4% 19%) | light gray #e8e6dc | charcoal/300 |
| `--accent-foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal | cream |
| `--destructive` | hsl(0 72% 51%) | hsl(0 63% 40%) | red/600 | red/800 |
| `--border` | hsl(48 16% 84%) | hsl(54 4% 19%) | warm gray/200 | charcoal/300 |
| `--input` | hsl(48 16% 84%) | hsl(54 4% 19%) | warm gray/200 | charcoal/300 |
| `--ring` | hsl(15 63% 60%) | hsl(15 63% 60%) | orange | orange |
| `--chart-1` | hsl(15 63% 60%) | hsl(15 63% 60%) | orange #d97757 | orange |
| `--chart-2` | hsl(210 49% 61%) | hsl(210 49% 61%) | blue #6a9bcc | blue |
| `--chart-3` | hsl(86 20% 46%) | hsl(86 20% 46%) | green #788c5d | green |
| `--chart-4` | hsl(49 7% 67%) | hsl(49 7% 67%) | mid gray #b0aea5 | mid gray |
| `--chart-5` | hsl(38 45% 55%) | hsl(38 45% 55%) | gold | gold |
| `--sidebar` | hsl(48 30% 96%) | hsl(60 3% 6%) | cream raised | charcoal deep |
| `--sidebar-foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal | cream |
| `--sidebar-primary` | hsl(15 63% 60%) | hsl(15 63% 60%) | orange | orange |
| `--sidebar-primary-foreground` | hsl(60 3% 8%) | hsl(60 3% 8%) | charcoal | charcoal |
| `--sidebar-accent` | hsl(50 21% 89%) | hsl(54 4% 16%) | light gray | charcoal/200 |
| `--sidebar-accent-foreground` | hsl(60 3% 8%) | hsl(48 33% 97%) | charcoal | cream |
| `--sidebar-border` | hsl(48 16% 84%) | hsl(54 4% 19%) | warm gray/200 | charcoal/300 |
| `--sidebar-ring` | hsl(15 63% 60%) | hsl(15 63% 60%) | orange | orange |
| `--background-color` | hsl(0 0% 0% / 30%) | hsl(0 0% 0% / 50%) | black/30% | black/50% |
| `--semantic-background` | hsl(40 6% 45%) | hsl(40 6% 45%) | warm stone/500 | warm stone/500 |
| `--semantic-border` | hsl(40 6% 60%) | hsl(40 6% 60%) | warm stone/400 | warm stone/400 |
| `--semantic-foreground` | hsl(0 0% 100%) | hsl(0 0% 100%) | white | white |

### Token Usage Guide

| Token | When to use |
|---|---|
| `bg-background` / `text-foreground` | Page background and general text |
| `bg-card` / `text-card-foreground` | Card, Panel, elevated surface |
| `bg-popover` / `text-popover-foreground` | Dropdown, Popover, Tooltip content |
| `bg-primary` / `text-primary-foreground` | Primary CTA, important action |
| `bg-secondary` / `text-secondary-foreground` | Secondary action, tag, chip |
| `bg-muted` / `text-muted-foreground` | placeholder, label, helper text, code block |
| `bg-accent` / `text-accent-foreground` | hover state, selected item, focus highlight |
| `bg-destructive` | delete, error, danger action |
| `bg-sidebar` / `text-sidebar-foreground` | Sidebar background and text |
| `bg-semantic-background` | overlay, stone-toned semantic badge |
| `border-border` | General borders |
| `border-input` | Form input border |
| `ring-ring` | focus ring |
| `var(--background-color)` | overlay scrim / modal backdrop |

### Tailwind v4 — @theme inline

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-background-color: var(--background-color);
  --color-semantic-background: var(--semantic-background);
  --color-semantic-border: var(--semantic-border);
  --color-semantic-foreground: var(--semantic-foreground);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

---

## 3. Typography (font collection — 45 variables)

### Font Families

```css
/* Next.js — next/font/google */
/* font/sans: Inter */
/* font/mono: Geist Mono */
```

```tsx
import { Inter } from "next/font/google"
import { Geist_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
```

### Font Sizes

| Token | Value (px) | Value (rem) | Tailwind class |
|---|---|---|---|
| `font/size/xs` | 12px | 0.75rem | `text-xs` |
| `font/size/sm` | 14px | 0.875rem | `text-sm` |
| `font/size/base` | 16px | 1.0rem | `text-base` |
| `font/size/lg` | 18px | 1.125rem | `text-lg` |
| `font/size/xl` | 20px | 1.25rem | `text-xl` |
| `font/size/2xl` | 24px | 1.5rem | `text-2xl` |
| `font/size/3xl` | 30px | 1.875rem | `text-3xl` |
| `font/size/4xl` | 36px | 2.25rem | `text-4xl` |
| `font/size/5xl` | 48px | 3.0rem | `text-5xl` |
| `font/size/6xl` | 60px | 3.75rem | `text-6xl` |
| `font/size/7xl` | 72px | 4.5rem | `text-7xl` |
| `font/size/8xl` | 96px | 6.0rem | `text-8xl` |
| `font/size/9xl` | 128px | 8.0rem | `text-9xl` |

### Font Weights

| Token | Value | Tailwind class |
|---|---|---|
| `font/weight/thin` | 100 | `font-thin` |
| `font/weight/extralight` | 200 | `font-extralight` |
| `font/weight/light` | 300 | `font-light` |
| `font/weight/normal` | 400 | `font-normal` |
| `font/weight/medium` | 500 | `font-medium` |
| `font/weight/semibold` | 600 | `font-semibold` |
| `font/weight/bold` | 700 | `font-bold` |
| `font/weight/extrabold` | 800 | `font-extrabold` |
| `font/weight/black` | 900 | `font-black` |

### Line Heights (leading)

| Token | Value (px) | Tailwind class |
|---|---|---|
| `font/leading/3` | 12px | `leading-3` |
| `font/leading/4` | 16px | `leading-4` |
| `font/leading/5` | 20px | `leading-5` |
| `font/leading/6` | 24px | `leading-6` |
| `font/leading/7` | 28px | `leading-7` |
| `font/leading/8` | 32px | `leading-8` |
| `font/leading/9` | 36px | `leading-9` |
| `font/leading/10` | 40px | `leading-10` |
| `font/leading/12` | 48px | `leading-12` |
| `font/leading/15` | 60px | `leading-15` |
| `font/leading/18` | 72px | `leading-18` |
| `font/leading/24` | 96px | `leading-24` |
| `font/leading/32` | 128px | `leading-32` |

### Letter Spacing (tracking)

| Token | Value (px) | Tailwind class |
|---|---|---|
| `font/tracking/tighter` | -0.8px | `tracking-tighter` |
| `font/tracking/tight` | -0.4px | `tracking-tight` |
| `font/tracking/normal` | 0px | `tracking-normal` |
| `font/tracking/wide` | 0.4px | `tracking-wide` |
| `font/tracking/wider` | 0.8px | `tracking-wider` |
| `font/tracking/widest` | 1.6px | `tracking-widest` |

### Font Styles

| Token | Value | Tailwind class |
|---|---|---|
| `font/style/italic` | italic | `italic` |
| `font/style/not-italic` | normal | `not-italic` |

### Type Scale Reference

| Role | Class | Size | Weight | Line Height |
|---|---|---|---|---|
| Display | `text-5xl font-bold` | 48px | 700 | 48px (leading-12) |
| H1 | `text-4xl font-bold` | 36px | 700 | 40px (leading-10) |
| H2 | `text-3xl font-semibold` | 30px | 600 | 36px (leading-9) |
| H3 | `text-2xl font-semibold` | 24px | 600 | 32px (leading-8) |
| H4 | `text-xl font-medium` | 20px | 500 | 28px (leading-7) |
| Body | `text-base` | 16px | 400 | 24px (leading-6) |
| Small | `text-sm` | 14px | 400 | 20px (leading-5) |
| Caption | `text-xs text-muted-foreground` | 12px | 400 | 16px (leading-4) |
| Code | `font-mono text-sm` | 14px | 400 | 20px (leading-5) |

---

## 4. Base Numeric Tokens (tokens collection — 87 variables)

> Base numeric values referenced by other collections (alias source)

| Token name | Value (px / unit) |
|---|---|
| `-0,8` | -0.800000011920929 |
| `-0,4` | -0.4000000059604645 |
| `0` | 0 |
| `0,4` | 0.4000000059604645 |
| `0,5` | 0.5 |
| `0,75` | 0.75 |
| `0,8` | 0.800000011920929 |
| `1` | 1 |
| `1,25` | 1.25 |
| `1,5` | 1.5 |
| `1,6` | 1.600000023841858 |
| `1,75` | 1.75 |
| `2` | 2 |
| `2,25` | 2.25 |
| `2,5` | 2.5 |
| `2,75` | 2.75 |
| `3` | 3 |
| `4` | 4 |
| `5` | 5 |
| `6` | 6 |
| `8` | 8 |
| `10` | 10 |
| `12` | 12 |
| `14` | 14 |
| `15` | 15 |
| `16` | 16 |
| `18` | 18 |
| `20` | 20 |
| `24` | 24 |
| `25` | 25 |
| `28` | 28 |
| `30` | 30 |
| `32` | 32 |
| `35` | 35 |
| `36` | 36 |
| `40` | 40 |
| `44` | 44 |
| `45` | 45 |
| `48` | 48 |
| `50` | 50 |
| `55` | 55 |
| `56` | 56 |
| `60` | 60 |
| `64` | 64 |
| `65` | 65 |
| `70` | 70 |
| `72` | 72 |
| `75` | 75 |
| `80` | 80 |
| `85` | 85 |
| `90` | 90 |
| `95` | 95 |
| `96` | 96 |
| `100` | 100 |
| `112` | 112 |
| `128` | 128 |
| `144` | 144 |
| `160` | 160 |
| `176` | 176 |
| `192` | 192 |
| `200` | 200 |
| `208` | 208 |
| `224` | 224 |
| `240` | 240 |
| `256` | 256 |
| `288` | 288 |
| `300` | 300 |
| `320` | 320 |
| `384` | 384 |
| `400` | 400 |
| `448` | 448 |
| `500` | 500 |
| `512` | 512 |
| `576` | 576 |
| `600` | 600 |
| `640` | 640 |
| `672` | 672 |
| `700` | 700 |
| `768` | 768 |
| `800` | 800 |
| `896` | 896 |
| `900` | 900 |
| `1024` | 1024 |
| `1152` | 1152 |
| `1280` | 1280 |
| `1536` | 1536 |
| `9999` | 9999 |

---

## 5. Border Radius (border-radius collection — 150 variables)


### All sides (`rounded-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-xs` | 2 | `rounded-xs` |
| `rounded-sm` | 4 | `rounded-sm` |
| `rounded-md` | 6 | `rounded-md` |
| `rounded-lg` | 8 | `rounded-lg` |
| `rounded-xl` | 12 | `rounded-xl` |
| `rounded-2xl` | 16 | `rounded-2xl` |
| `rounded-3xl` | 24 | `rounded-3xl` |
| `rounded-4xl` | 32 | `rounded-4xl` |
| `rounded-none` | 0 | `rounded-none` |
| `rounded-full` | 9999 | `rounded-full` |

### Side: `bl` (`rounded-b-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-bl-xs` | 2 | `rounded-bl-xs` |
| `rounded-bl-sm` | 4 | `rounded-bl-sm` |
| `rounded-bl-md` | 6 | `rounded-bl-md` |
| `rounded-bl-lg` | 8 | `rounded-bl-lg` |
| `rounded-bl-xl` | 12 | `rounded-bl-xl` |
| `rounded-bl-2xl` | 16 | `rounded-bl-2xl` |
| `rounded-bl-3xl` | 24 | `rounded-bl-3xl` |
| `rounded-bl-4xl` | 32 | `rounded-bl-4xl` |
| `rounded-bl-none` | 0 | `rounded-bl-none` |
| `rounded-bl-full` | 9999 | `rounded-bl-full` |

### Side: `bottom` (`rounded-b-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-b-xs` | 2 | `rounded-b-xs` |
| `rounded-b-sm` | 4 | `rounded-b-sm` |
| `rounded-b-md` | 6 | `rounded-b-md` |
| `rounded-b-lg` | 8 | `rounded-b-lg` |
| `rounded-b-xl` | 12 | `rounded-b-xl` |
| `rounded-b-2xl` | 16 | `rounded-b-2xl` |
| `rounded-b-3xl` | 24 | `rounded-b-3xl` |
| `rounded-b-4xl` | 32 | `rounded-b-4xl` |
| `rounded-b-none` | 0 | `rounded-b-none` |
| `rounded-b-full` | 9999 | `rounded-b-full` |

### Side: `br` (`rounded-b-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-br-xs` | 2 | `rounded-br-xs` |
| `rounded-br-sm` | 4 | `rounded-br-sm` |
| `rounded-br-md` | 6 | `rounded-br-md` |
| `rounded-br-lg` | 8 | `rounded-br-lg` |
| `rounded-br-xl` | 12 | `rounded-br-xl` |
| `rounded-br-2xl` | 16 | `rounded-br-2xl` |
| `rounded-br-3xl` | 24 | `rounded-br-3xl` |
| `rounded-br-4xl` | 32 | `rounded-br-4xl` |
| `rounded-br-none` | 0 | `rounded-br-none` |
| `rounded-br-full` | 9999 | `rounded-br-full` |

### Side: `end` (`rounded-e-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-e-xs` | 2 | `rounded-e-xs` |
| `rounded-e-sm` | 4 | `rounded-e-sm` |
| `rounded-e-md` | 6 | `rounded-e-md` |
| `rounded-e-lg` | 8 | `rounded-e-lg` |
| `rounded-e-xl` | 12 | `rounded-e-xl` |
| `rounded-e-2xl` | 16 | `rounded-e-2xl` |
| `rounded-e-3xl` | 24 | `rounded-e-3xl` |
| `rounded-e-4xl` | 32 | `rounded-e-4xl` |
| `rounded-e-none` | 0 | `rounded-e-none` |
| `rounded-e-full` | 9999 | `rounded-e-full` |

### Side: `end-end` (`rounded-e-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-ee-xs` | 2 | `rounded-ee-xs` |
| `rounded-ee-sm` | 4 | `rounded-ee-sm` |
| `rounded-ee-md` | 6 | `rounded-ee-md` |
| `rounded-ee-lg` | 8 | `rounded-ee-lg` |
| `rounded-ee-xl` | 12 | `rounded-ee-xl` |
| `rounded-ee-2xl` | 16 | `rounded-ee-2xl` |
| `rounded-ee-3xl` | 24 | `rounded-ee-3xl` |
| `rounded-ee-4xl` | 32 | `rounded-ee-4xl` |
| `rounded-ee-none` | 0 | `rounded-ee-none` |
| `rounded-ee-full` | 9999 | `rounded-ee-full` |

### Side: `end-start` (`rounded-e-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-es-xs` | 2 | `rounded-es-xs` |
| `rounded-es-sm` | 4 | `rounded-es-sm` |
| `rounded-es-md` | 6 | `rounded-es-md` |
| `rounded-es-lg` | 8 | `rounded-es-lg` |
| `rounded-es-xl` | 12 | `rounded-es-xl` |
| `rounded-es-2xl` | 16 | `rounded-es-2xl` |
| `rounded-es-3xl` | 24 | `rounded-es-3xl` |
| `rounded-es-4xl` | 32 | `rounded-es-4xl` |
| `rounded-es-none` | 0 | `rounded-es-none` |
| `rounded-es-full` | 9999 | `rounded-es-full` |

### Side: `l` (`rounded-l-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-l-xs` | 2 | `rounded-l-xs` |
| `rounded-l-sm` | 4 | `rounded-l-sm` |
| `rounded-l-md` | 6 | `rounded-l-md` |
| `rounded-l-lg` | 8 | `rounded-l-lg` |
| `rounded-l-xl` | 12 | `rounded-l-xl` |
| `rounded-l-2xl` | 16 | `rounded-l-2xl` |
| `rounded-l-3xl` | 24 | `rounded-l-3xl` |
| `rounded-l-4xl` | 32 | `rounded-l-4xl` |
| `rounded-l-none` | 0 | `rounded-l-none` |
| `rounded-l-full` | 9999 | `rounded-l-full` |

### Side: `r` (`rounded-r-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-r-xs` | 2 | `rounded-r-xs` |
| `rounded-r-sm` | 4 | `rounded-r-sm` |
| `rounded-r-md` | 6 | `rounded-r-md` |
| `rounded-r-lg` | 8 | `rounded-r-lg` |
| `rounded-r-xl` | 12 | `rounded-r-xl` |
| `rounded-r-2xl` | 16 | `rounded-r-2xl` |
| `rounded-r-3xl` | 24 | `rounded-r-3xl` |
| `rounded-r-4xl` | 32 | `rounded-r-4xl` |
| `rounded-r-none` | 0 | `rounded-r-none` |
| `rounded-r-full` | 9999 | `rounded-r-full` |

### Side: `start` (`rounded-s-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-s-xs` | 2 | `rounded-s-xs` |
| `rounded-s-sm` | 4 | `rounded-s-sm` |
| `rounded-s-md` | 6 | `rounded-s-md` |
| `rounded-s-lg` | 8 | `rounded-s-lg` |
| `rounded-s-xl` | 12 | `rounded-s-xl` |
| `rounded-s-2xl` | 16 | `rounded-s-2xl` |
| `rounded-s-3xl` | 24 | `rounded-s-3xl` |
| `rounded-s-4xl` | 32 | `rounded-s-4xl` |
| `rounded-s-none` | 0 | `rounded-s-none` |
| `rounded-s-full` | 9999 | `rounded-s-full` |

### Side: `start-end` (`rounded-s-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-se-xs` | 2 | `rounded-se-xs` |
| `rounded-se-sm` | 4 | `rounded-se-sm` |
| `rounded-se-md` | 6 | `rounded-se-md` |
| `rounded-se-lg` | 8 | `rounded-se-lg` |
| `rounded-se-xl` | 12 | `rounded-se-xl` |
| `rounded-se-2xl` | 16 | `rounded-se-2xl` |
| `rounded-se-3xl` | 24 | `rounded-se-3xl` |
| `rounded-se-4xl` | 32 | `rounded-se-4xl` |
| `rounded-se-none` | 0 | `rounded-se-none` |
| `rounded-se-full` | 9999 | `rounded-se-full` |

### Side: `start-start` (`rounded-s-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-ss-xs` | 2 | `rounded-ss-xs` |
| `rounded-ss-sm` | 4 | `rounded-ss-sm` |
| `rounded-ss-md` | 6 | `rounded-ss-md` |
| `rounded-ss-lg` | 8 | `rounded-ss-lg` |
| `rounded-ss-xl` | 12 | `rounded-ss-xl` |
| `rounded-ss-2xl` | 16 | `rounded-ss-2xl` |
| `rounded-ss-3xl` | 24 | `rounded-ss-3xl` |
| `rounded-ss-4xl` | 32 | `rounded-ss-4xl` |
| `rounded-ss-none` | 0 | `rounded-ss-none` |
| `rounded-ss-full` | 9999 | `rounded-ss-full` |

### Side: `tl` (`rounded-t-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-tl-xs` | 0 | `rounded-tl-xs` |
| `rounded-tl-sm` | 4 | `rounded-tl-sm` |
| `rounded-tl-md` | 6 | `rounded-tl-md` |
| `rounded-tl-lg` | 8 | `rounded-tl-lg` |
| `rounded-tl-xl` | 12 | `rounded-tl-xl` |
| `rounded-tl-2xl` | 16 | `rounded-tl-2xl` |
| `rounded-tl-3xl` | 24 | `rounded-tl-3xl` |
| `rounded-tl-4xl` | 32 | `rounded-tl-4xl` |
| `rounded-tl-none` | 0 | `rounded-tl-none` |
| `rounded-tl-full` | 9999 | `rounded-tl-full` |

### Side: `top` (`rounded-t-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-t-xs` | 2 | `rounded-t-xs` |
| `rounded-t-sm` | 4 | `rounded-t-sm` |
| `rounded-t-md` | 6 | `rounded-t-md` |
| `rounded-t-lg` | 8 | `rounded-t-lg` |
| `rounded-t-xl` | 12 | `rounded-t-xl` |
| `rounded-t-2xl` | 16 | `rounded-t-2xl` |
| `rounded-t-3xl` | 24 | `rounded-t-3xl` |
| `rounded-t-4xl` | 32 | `rounded-t-4xl` |
| `rounded-t-none` | 0 | `rounded-t-none` |
| `rounded-t-full` | 9999 | `rounded-t-full` |

### Side: `tr` (`rounded-t-*`)

| Variable | Value (px) | Tailwind class |
|---|---|---|
| `rounded-tr-xs` | 2 | `rounded-tr-xs` |
| `rounded-tr-sm` | 4 | `rounded-tr-sm` |
| `rounded-tr-md` | 6 | `rounded-tr-md` |
| `rounded-tr-lg` | 8 | `rounded-tr-lg` |
| `rounded-tr-xl` | 12 | `rounded-tr-xl` |
| `rounded-tr-2xl` | 16 | `rounded-tr-2xl` |
| `rounded-tr-3xl` | 24 | `rounded-tr-3xl` |
| `rounded-tr-4xl` | 32 | `rounded-tr-4xl` |
| `rounded-tr-none` | 0 | `rounded-tr-none` |
| `rounded-tr-full` | 9999 | `rounded-tr-full` |

---

## 6. Spacing


### Space (space collection — 68 variables)

| Variable | Value (px) |
|---|---|
| `space-x-0` | 0 |
| `space-y-0` | 0 |
| `space-x-0,5` | 2 |
| `space-y-0,5` | 2 |
| `space-x-1` | 4 |
| `space-y-1` | 4 |
| `space-x-1,5` | 6 |
| `space-y-1,5` | 6 |
| `space-x-2` | 8 |
| `space-y-2` | 8 |
| `space-x-2,5` | 10 |
| `space-y-2,5` | 10 |
| `space-x-3` | 12 |
| `space-y-3` | 12 |
| `space-x-3,5` | 14 |
| `space-y-3,5` | 14 |
| `space-x-4` | 16 |
| `space-y-4` | 16 |
| `space-x-5` | 20 |
| `space-y-5` | 20 |
| `space-x-6` | 24 |
| `space-y-6` | 24 |
| `space-x-7` | 28 |
| `space-y-7` | 28 |
| `space-x-8` | 32 |
| `space-y-8` | 32 |
| `space-x-9` | 36 |
| `space-y-9` | 36 |
| `space-x-10` | 40 |
| `space-y-10` | 40 |
| `space-x-11` | 44 |
| `space-y-11` | 44 |
| `space-x-12` | 48 |
| `space-y-12` | 48 |
| `space-x-14` | 56 |
| `space-y-14` | 56 |
| `space-x-16` | 64 |
| `space-y-16` | 64 |
| `space-x-20` | 80 |
| `space-y-20` | 80 |
| `space-x-24` | 96 |
| `space-y-24` | 96 |
| `space-x-28` | 112 |
| `space-y-28` | 112 |
| `space-x-32` | 128 |
| `space-y-32` | 128 |
| `space-x-36` | 144 |
| `space-y-36` | 144 |
| `space-x-40` | 160 |
| `space-y-40` | 160 |
| `space-x-44` | 176 |
| `space-y-44` | 176 |
| `space-x-48` | 192 |
| `space-y-48` | 192 |
| `space-x-52` | 208 |
| `space-y-52` | 208 |
| `space-x-56` | 224 |
| `space-y-56` | 224 |
| `space-x-60` | 240 |
| `space-y-60` | 240 |
| `space-x-64` | 256 |
| `space-y-64` | 256 |
| `space-x-72` | 288 |
| `space-y-72` | 288 |
| `space-x-80` | 320 |
| `space-y-80` | 320 |
| `space-x-96` | 384 |
| `space-y-96` | 384 |

### Padding (padding collection — 245 variables)

| Variable | Value (px) |
|---|---|
| `p-0` | 0 |
| `px-0` | 0 |
| `py-0` | 0 |
| `pr-0` | 0 |
| `pl-0` | 0 |
| `pt-0` | 0 |
| `pb-0` | 0 |
| `p-px` | 1 |
| `px-px` | 1 |
| `py-px` | 1 |
| `pt-px` | 1 |
| `pr-px` | 1 |
| `pl-px` | 1 |
| `pb-px` | 1 |
| `p-0,5` | 2 |
| `px-0,5` | 2 |
| `py-0,5` | 2 |
| `pr-0,5` | 2 |
| `pl-0,5` | 2 |
| `pt-0,5` | 2 |
| `pb-0,5` | 2 |
| `p-1` | 4 |
| `px-1` | 4 |
| `py-1` | 4 |
| `pr-1` | 4 |
| `pl-1` | 4 |
| `pt-1` | 4 |
| `pb-1` | 4 |
| `p-1,5` | 6 |
| `px-1,5` | 6 |
| `py-1,5` | 6 |
| `pr-1,5` | 6 |
| `pl-1,15` | 6 |
| `pt-1,5` | 6 |
| `pb-1,5` | 6 |
| `p-2` | 8 |
| `px-2` | 8 |
| `py-2` | 8 |
| `pr-2` | 8 |
| `pl-2` | 8 |
| `pt-2` | 8 |
| `pb-2` | 8 |
| `p-2,5` | 10 |
| `px-2,5` | 10 |
| `py-2,5` | 10 |
| `pr-2,5` | 10 |
| `pl-2,5` | 10 |
| `pt-2,5` | 10 |
| `pb-2,5` | 10 |
| `p-3` | 12 |
| `px-3` | 12 |
| `py-3` | 12 |
| `pr-3` | 12 |
| `pl-3` | 12 |
| `pt-3` | 12 |
| `pb-3` | 12 |
| `p-3,5` | 14 |
| `px-3,5` | 14 |
| `py-3,5` | 14 |
| `pr-3,5` | 14 |
| `pl-3,5` | 14 |
| `pt-3,5` | 14 |
| `pb-3,5` | 14 |
| `p-4` | 16 |
| `px-4` | 16 |
| `py-4` | 16 |
| `pr-4` | 16 |
| `pl-4` | 16 |
| `pt-4` | 16 |
| `pb-4` | 16 |
| `p-5` | 20 |
| `px-5` | 20 |
| `py-5` | 20 |
| `pr-5` | 20 |
| `pl-5` | 20 |
| `pt-5` | 20 |
| `pb-5` | 20 |
| `p-6` | 24 |
| `px-6` | 24 |
| `py-6` | 24 |
| `pr-6` | 24 |
| `pl-6` | 24 |
| `pt-6` | 24 |
| `pb-6` | 24 |
| `p-7` | 28 |
| `px-7` | 28 |
| `py-7` | 28 |
| `pr-7` | 28 |
| `pl-7` | 28 |
| `pt-7` | 28 |
| `pb-7` | 28 |
| `p-8` | 32 |
| `px-8` | 32 |
| `py-8` | 32 |
| `pr-8` | 32 |
| `pl-8` | 32 |
| `pt-8` | 32 |
| `pb-8` | 32 |
| `p-9` | 36 |
| `px-9` | 36 |
| `py-9` | 36 |
| `pr-9` | 36 |
| `pl-9` | 36 |
| `pt-9` | 36 |
| `pb-9` | 36 |
| `p-10` | 40 |
| `px-10` | 40 |
| `py-10` | 40 |
| `pr-10` | 40 |
| `pl-10` | 40 |
| `pt-10` | 40 |
| `pb-10` | 40 |
| `p-11` | 44 |
| `px-11` | 44 |
| `py-11` | 44 |
| `pr-11` | 44 |
| `pl-11` | 44 |
| `pt-11` | 44 |
| `pb-11` | 44 |
| `p-12` | 48 |
| `px-12` | 48 |
| `py-12` | 48 |
| `pr-12` | 48 |
| `pl-12` | 48 |
| `pt-12` | 48 |
| `pb-12` | 48 |
| `p-14` | 56 |
| `px-14` | 56 |
| `py-14` | 56 |
| `pr-14` | 56 |
| `pl-14` | 56 |
| `pt-14` | 56 |
| `pb-14` | 56 |
| `p-16` | 64 |
| `px-16` | 64 |
| `py-16` | 64 |
| `pr-16` | 64 |
| `pt-16` | 64 |
| `pl-16` | 64 |
| `pb-16` | 64 |
| `p-20` | 80 |
| `px-20` | 80 |
| `py-20` | 80 |
| `pr-20` | 80 |
| `pl-20` | 80 |
| `pt-20` | 80 |
| `pb-20` | 80 |
| `p-24` | 96 |
| `px-24` | 96 |
| `py-24` | 96 |
| `pr-24` | 96 |
| `pl-24` | 96 |
| `pt-24` | 96 |
| `pb-24` | 96 |
| `p-28` | 112 |
| `px-28` | 112 |
| `py-28` | 112 |
| `pr-28` | 112 |
| `pl-28` | 112 |
| `pt-28` | 112 |
| `pb-28` | 112 |
| `p-32` | 128 |
| `px-32` | 128 |
| `py-32` | 128 |
| `pr-32` | 128 |
| `pl-32` | 128 |
| `pt-32` | 128 |
| `pb-32` | 128 |
| `p-36` | 144 |
| `px-36` | 144 |
| `py-36` | 144 |
| `pr-36` | 144 |
| `pl-36` | 144 |
| `pt-36` | 144 |
| `pb-36` | 144 |
| `p-40` | 160 |
| `px-40` | 160 |
| `py-40` | 160 |
| `pr-40` | 160 |
| `pl-40` | 160 |
| `pt-40` | 160 |
| `pb-40` | 160 |
| `p-44` | 176 |
| `px-44` | 176 |
| `py-44` | 176 |
| `pr-44` | 176 |
| `pl-44` | 176 |
| `pt-44` | 176 |
| `pb-44` | 176 |
| `p-48` | 192 |
| `px-48` | 192 |
| `py-48` | 192 |
| `pr-48` | 192 |
| `pl-48` | 192 |
| `pt-48` | 192 |
| `pb-48` | 192 |
| `p-52` | 208 |
| `px-52` | 208 |
| `py-52` | 208 |
| `pr-52` | 208 |
| `pl-52` | 208 |
| `pt-52` | 208 |
| `pb-52` | 208 |
| `p-56` | 224 |
| `px-56` | 224 |
| `py-56` | 224 |
| `pr-56` | 224 |
| `pl-56` | 224 |
| `pt-56` | 224 |
| `pb-56` | 224 |
| `p-60` | 240 |
| `px-60` | 240 |
| `py-60` | 240 |
| `pr-60` | 240 |
| `pl-60` | 240 |
| `pt-60` | 240 |
| `pb-60` | 240 |
| `p-64` | 256 |
| `px-64` | 256 |
| `py-64` | 256 |
| `pr-64` | 256 |
| `pl-64` | 256 |
| `pt-64` | 256 |
| `pb-64` | 256 |
| `p-72` | 288 |
| `px-72` | 288 |
| `py-72` | 288 |
| `pr-72` | 288 |
| `pl-72` | 288 |
| `pt-72` | 288 |
| `pb-72` | 288 |
| `p-80` | 320 |
| `px-80` | 320 |
| `py-80` | 320 |
| `pr-80` | 320 |
| `pl-80` | 320 |
| `pt-80` | 320 |
| `pb-80` | 320 |
| `p-96` | 384 |
| `px-96` | 384 |
| `py-96` | 384 |
| `pr-96` | 384 |
| `pl-96` | 384 |
| `pt-96` | 384 |
| `pb-96` | 384 |

### Margin (margin collection — 245 variables)

| Variable | Value (px) |
|---|---|
| `m-0` | 0 |
| `mx-0` | 0 |
| `my-0` | 0 |
| `mr-0` | 0 |
| `ml-0` | 0 |
| `mt-0` | 0 |
| `mb-0` | 0 |
| `m-px` | 1 |
| `mx-px` | 1 |
| `my-px` | 1 |
| `mr-px` | 1 |
| `ml-px` | 1 |
| `mt-px` | 1 |
| `mb-px` | 1 |
| `m-0,5` | 2 |
| `mx-0,5` | 2 |
| `my-0,5` | 2 |
| `mr-0,5` | 2 |
| `ml-0,5` | 2 |
| `mt-0,5` | 2 |
| `mb-0,5` | 2 |
| `m-1` | 4 |
| `mx-1` | 4 |
| `my-1` | 4 |
| `mr-1` | 4 |
| `ml-1` | 4 |
| `mt-1` | 4 |
| `mb-1` | 4 |
| `m-1,5` | 6 |
| `mx-1,5` | 6 |
| `my-1,5` | 6 |
| `mr-1,5` | 6 |
| `ml-1,5` | 6 |
| `mt-1,5` | 6 |
| `mb-1,5` | 6 |
| `m-2` | 8 |
| `mx-2` | 8 |
| `my-2` | 8 |
| `mr-2` | 8 |
| `ml-2` | 8 |
| `mt-2` | 8 |
| `mb-2` | 8 |
| `m-2,5` | 10 |
| `mx-2,5` | 10 |
| `my-2,5` | 10 |
| `mr-2,5` | 10 |
| `ml-2,5` | 10 |
| `mt-2,5` | 10 |
| `mb-2,5` | 10 |
| `m-3` | 12 |
| `mx-3` | 12 |
| `my-3` | 12 |
| `mr-3` | 12 |
| `ml-3` | 12 |
| `mt-3` | 12 |
| `mb-3` | 12 |
| `m-3,5` | 14 |
| `mx-3,5` | 14 |
| `my-3,5` | 14 |
| `mr-3,5` | 14 |
| `ml-3,5` | 14 |
| `mt-3,5` | 14 |
| `mb-3,5` | 14 |
| `m-4` | 16 |
| `mx-4` | 16 |
| `my-4` | 16 |
| `mr-4` | 16 |
| `ml-4` | 16 |
| `mt-4` | 16 |
| `mb-4` | 16 |
| `m-5` | 20 |
| `mx-5` | 20 |
| `my-5` | 20 |
| `mr-5` | 20 |
| `ml-5` | 20 |
| `mt-5` | 20 |
| `mb-5` | 20 |
| `m-6` | 24 |
| `mx-6` | 24 |
| `my-6` | 24 |
| `mr-6` | 24 |
| `ml-6` | 24 |
| `mt-6` | 24 |
| `mb-6` | 24 |
| `m-7` | 28 |
| `mx-7` | 28 |
| `my-7` | 28 |
| `mr-7` | 28 |
| `ml-7` | 28 |
| `mt-7` | 28 |
| `mb-7` | 28 |
| `m-8` | 32 |
| `mx-8` | 32 |
| `my-8` | 32 |
| `mr-8` | 32 |
| `ml-8` | 32 |
| `mt-8` | 32 |
| `mb-8` | 32 |
| `m-9` | 36 |
| `mx-9` | 36 |
| `my-9` | 36 |
| `mr-9` | 36 |
| `ml-9` | 36 |
| `mt-9` | 36 |
| `mb-9` | 36 |
| `m-10` | 40 |
| `mx-10` | 40 |
| `my-10` | 40 |
| `mr-10` | 40 |
| `ml-10` | 40 |
| `mt-10` | 40 |
| `mb-10` | 40 |
| `m-11` | 44 |
| `mx-11` | 44 |
| `my-11` | 44 |
| `mr-11` | 44 |
| `ml-11` | 44 |
| `mt-11` | 44 |
| `mb-11` | 44 |
| `m-12` | 48 |
| `mx-12` | 48 |
| `my-12` | 48 |
| `mr-12` | 48 |
| `ml-12` | 48 |
| `mt-12` | 48 |
| `mb-12` | 48 |
| `m-14` | 56 |
| `mx-14` | 56 |
| `my-14` | 56 |
| `mr-14` | 56 |
| `ml-14` | 56 |
| `mt-14` | 56 |
| `mb-14` | 56 |
| `m-16` | 64 |
| `mx-16` | 64 |
| `my-16` | 64 |
| `mr-16` | 64 |
| `ml-16` | 64 |
| `mt-16` | 64 |
| `mb-16` | 64 |
| `m-20` | 80 |
| `mx-20` | 80 |
| `my-20` | 80 |
| `mr-20` | 80 |
| `ml-20` | 80 |
| `mt-20` | 80 |
| `mb-20` | 80 |
| `m-24` | 96 |
| `mx-24` | 96 |
| `my-24` | 96 |
| `mr-24` | 96 |
| `ml-24` | 96 |
| `mt-24` | 96 |
| `mb-24` | 96 |
| `m-28` | 112 |
| `mx-28` | 112 |
| `my-28` | 112 |
| `mr-28` | 112 |
| `ml-28` | 112 |
| `mt-28` | 112 |
| `mb-28` | 112 |
| `m-32` | 128 |
| `mx-32` | 128 |
| `my-32` | 128 |
| `mr-32` | 128 |
| `ml-32` | 128 |
| `mt-32` | 128 |
| `mb-32` | 128 |
| `m-36` | 144 |
| `mx-36` | 144 |
| `my-36` | 144 |
| `mr-36` | 144 |
| `ml-36` | 144 |
| `mt-36` | 144 |
| `mb-36` | 144 |
| `m-40` | 160 |
| `mx-40` | 160 |
| `my-40` | 160 |
| `mr-40` | 160 |
| `ml-40` | 160 |
| `mt-40` | 160 |
| `mb-40` | 160 |
| `m-44` | 176 |
| `mx-44` | 176 |
| `my-44` | 176 |
| `mr-44` | 176 |
| `ml-44` | 176 |
| `mt-44` | 176 |
| `mb-44` | 176 |
| `m-48` | 192 |
| `mx-48` | 192 |
| `my-48` | 192 |
| `mr-48` | 192 |
| `ml-48` | 192 |
| `mt-48` | 192 |
| `mb-48` | 192 |
| `m-52` | 208 |
| `mx-52` | 208 |
| `my-52` | 208 |
| `mr-52` | 208 |
| `ml-52` | 208 |
| `mt-52` | 208 |
| `mb-52` | 208 |
| `m-56` | 224 |
| `mx-56` | 224 |
| `my-56` | 224 |
| `mr-56` | 224 |
| `ml-56` | 224 |
| `mt-56` | 224 |
| `mb-56` | 224 |
| `m-60` | 240 |
| `mx-60` | 240 |
| `my-60` | 240 |
| `mr-60` | 240 |
| `ml-60` | 240 |
| `mt-60` | 240 |
| `mb-60` | 240 |
| `m-64` | 256 |
| `mx-64` | 256 |
| `my-64` | 256 |
| `mr-64` | 256 |
| `ml-64` | 256 |
| `mt-64` | 256 |
| `mb-64` | 256 |
| `m-72` | 288 |
| `mx-72` | 288 |
| `my-72` | 288 |
| `mr-72` | 288 |
| `ml-72` | 288 |
| `mt-72` | 288 |
| `mb-72` | 288 |
| `m-80` | 320 |
| `mx-80` | 320 |
| `my-80` | 320 |
| `mr-80` | 320 |
| `ml-80` | 320 |
| `mt-80` | 320 |
| `mb-80` | 320 |
| `m-96` | 384 |
| `mx-96` | 384 |
| `my-96` | 384 |
| `mr-96` | 384 |
| `ml-96` | 384 |
| `mt-96` | 384 |
| `mb-96` | 384 |

### Gap (gap collection — 102 variables)

| Variable | Value (px) |
|---|---|
| `gap-0` | 0 |
| `gap-x-0` | 0 |
| `gap-y-0` | 0 |
| `gap-0,5` | 2 |
| `gap-x-0,5` | 2 |
| `gap-y-0,5` | 2 |
| `gap-1` | 4 |
| `gap-x-1` | 4 |
| `gap-y-1` | 4 |
| `gap-1,5` | 6 |
| `gap-x-1,5` | 6 |
| `gap-y-1,5` | 6 |
| `gap-2` | 8 |
| `gap-x-2` | 8 |
| `gap-y-2` | 8 |
| `gap-2,5` | 10 |
| `gap-x-2,5` | 10 |
| `gap-y-2,5` | 10 |
| `gap-3` | 12 |
| `gap-x-3` | 12 |
| `gap-y-3` | 12 |
| `gap-3,5` | 14 |
| `gap-x-3,5` | 14 |
| `gap-y-3,5` | 14 |
| `gap-4` | 16 |
| `gap-x-4` | 16 |
| `gap-y-4` | 16 |
| `gap-5` | 20 |
| `gap-x-5` | 20 |
| `gap-y-5` | 20 |
| `gap-6` | 24 |
| `gap-x-6` | 24 |
| `gap-y-6` | 24 |
| `gap-7` | 28 |
| `gap-x-7` | 28 |
| `gap-y-7` | 28 |
| `gap-8` | 32 |
| `gap-x-8` | 32 |
| `gap-y-8` | 32 |
| `gap-9` | 36 |
| `gap-x-9` | 36 |
| `gap-y-9` | 36 |
| `gap-10` | 40 |
| `gap-x-10` | 40 |
| `gap-y-10` | 40 |
| `gap-11` | 44 |
| `gap-x-11` | 44 |
| `gap-y-11` | 44 |
| `gap-12` | 48 |
| `gap-x-12` | 48 |
| `gap-y-12` | 48 |
| `gap-14` | 56 |
| `gap-x-14` | 56 |
| `gap-y-14` | 56 |
| `gap-16` | 64 |
| `gap-x-16` | 64 |
| `gap-y-16` | 64 |
| `gap-20` | 80 |
| `gap-x-20` | 80 |
| `gap-y-20` | 80 |
| `gap-24` | 96 |
| `gap-x-24` | 96 |
| `gap-y-24` | 96 |
| `gap-28` | 112 |
| `gap-x-28` | 112 |
| `gap-y-28` | 112 |
| `gap-32` | 128 |
| `gap-x-32` | 128 |
| `gap-y-32` | 128 |
| `gap-36` | 144 |
| `gap-x-36` | 144 |
| `gap-y-36` | 144 |
| `gap-40` | 160 |
| `gap-x-40` | 160 |
| `gap-y-40` | 160 |
| `gap-44` | 176 |
| `gap-x-44` | 176 |
| `gap-y-44` | 176 |
| `gap-48` | 192 |
| `gap-x-48` | 192 |
| `gap-y-48` | 192 |
| `gap-52` | 208 |
| `gap-x-52` | 208 |
| `gap-y-52` | 208 |
| `gap-56` | 224 |
| `gap-x-56` | 224 |
| `gap-y-56` | 224 |
| `gap-60` | 240 |
| `gap-x-60` | 240 |
| `gap-y-60` | 240 |
| `gap-64` | 256 |
| `gap-x-64` | 256 |
| `gap-y-64` | 256 |
| `gap-72` | 288 |
| `gap-x-72` | 288 |
| `gap-y-72` | 288 |
| `gap-80` | 320 |
| `gap-x-80` | 320 |
| `gap-y-80` | 320 |
| `gap-96` | 384 |
| `gap-x-96` | 384 |
| `gap-y-96` | 384 |

### Component Spacing Convention

```
card / panel:   p-6  (24px)
dialog:         p-6  (24px)
form group:     space-y-4  (16px)
button:         px-4 py-2 (default) / px-3 py-1.5 (sm) / px-8 py-2 (lg)
input:          px-3 py-2
```

---

## 7. Border Width (border-width collection — 45 variables)


### Border Width (border-width collection — 45 variables)

| Variable | Value (px) |
|---|---|
| `border-0` | 0 |
| `border` | 1 |
| `border-2` | 2 |
| `border-4` | 4 |
| `border-8` | 8 |
| `border-x-0` | 0 |
| `border-x` | 1 |
| `border-x-2` | 2 |
| `border-x-4` | 4 |
| `border-x-8` | 8 |
| `border-y-0` | 0 |
| `border-y` | 1 |
| `border-y-2` | 2 |
| `border-y-4` | 4 |
| `border-y-8` | 8 |
| `border-s-0` | 0 |
| `border-s` | 1 |
| `border-s-2` | 2 |
| `border-s-4` | 4 |
| `border-s-8` | 8 |
| `border-e-0` | 0 |
| `border-e` | 1 |
| `border-e-2` | 2 |
| `border-e-4` | 4 |
| `border-e-8` | 8 |
| `border-t-0` | 0 |
| `border-t` | 1 |
| `border-t-2` | 2 |
| `border-t-4` | 4 |
| `border-t-8` | 8 |
| `border-r-0` | 0 |
| `border-r` | 1 |
| `border-r-2` | 2 |
| `border-r-4` | 4 |
| `border-r-8` | 8 |
| `border-b-0` | 0 |
| `border-b` | 1 |
| `border-b-2` | 2 |
| `border-b-4` | 4 |
| `border-b-8` | 8 |
| `border-l-0` | 0 |
| `border-l` | 1 |
| `border-l-2` | 2 |
| `border-l-4` | 4 |
| `border-l-8` | 8 |

---

## 8. Size Tokens


### Height (height collection — 24 variables)

| Variable | Value (px) |
|---|---|
| `h-0` | 0 |
| `h-px` | 1 |
| `h-0,5` | 2 |
| `h-1` | 4 |
| `h-2` | 8 |
| `h-2,5` | 10 |
| `h-3` | 12 |
| `h-3,5` | 14 |
| `h-4` | 16 |
| `h-5` | 20 |
| `h-6` | 24 |
| `h-7` | 28 |
| `h-8` | 32 |
| `h-9` | 36 |
| `h-10` | 40 |
| `h-12` | 48 |
| `h-14` | 56 |
| `h-16` | 64 |
| `h-18` | 72 |
| `h-20` | 80 |
| `h-24` | 96 |
| `h-48` | 192 |
| `h-72` | 288 |
| `h-96` | 384 |

### Max Height (max-height collection — 35 variables)

| Variable | Value (px) |
|---|---|
| `max-h-0` | 0 |
| `max-h-px` | 1 |
| `max-h-0,5` | 2 |
| `max-h-1` | 4 |
| `max-h-1,5` | 6 |
| `max-h-2` | 8 |
| `max-h-2,5` | 10 |
| `max-h-3` | 12 |
| `max-h-3,5` | 14 |
| `max-h-4` | 16 |
| `max-h-5` | 20 |
| `max-h-6` | 24 |
| `max-h-7` | 28 |
| `max-h-8` | 32 |
| `max-h-9` | 36 |
| `max-h-10` | 40 |
| `max-h-11` | 44 |
| `max-h-12` | 48 |
| `max-h-14` | 56 |
| `max-h-16` | 64 |
| `max-h-20` | 80 |
| `max-h-24` | 96 |
| `max-h-28` | 112 |
| `max-h-32` | 128 |
| `max-h-36` | 144 |
| `max-h-40` | 160 |
| `max-h-44` | 176 |
| `max-h-48` | 192 |
| `max-h-52` | 208 |
| `max-h-56` | 224 |
| `max-h-60` | 240 |
| `max-h-64` | 256 |
| `max-h-72` | 288 |
| `max-h-80` | 320 |
| `max-h-96` | 384 |

### Max Width (max-width collection — 35 variables)

| Variable | Value (px) |
|---|---|
| `max-w-0` | 0 |
| `max-w-px` | 1 |
| `max-w-0,5` | 2 |
| `max-w-1` | 4 |
| `max-w-1,5` | 6 |
| `max-w-2` | 8 |
| `max-w-2,5` | 10 |
| `max-w-3` | 12 |
| `max-w-3,5` | 14 |
| `max-w-4` | 16 |
| `max-w-5` | 20 |
| `max-w-6` | 24 |
| `max-w-7` | 28 |
| `max-w-8` | 32 |
| `max-w-9` | 36 |
| `max-w-10` | 40 |
| `max-w-11` | 44 |
| `max-w-12` | 48 |
| `max-w-14` | 56 |
| `max-w-16` | 64 |
| `max-w-20` | 80 |
| `max-w-24` | 96 |
| `max-w-28` | 112 |
| `max-w-32` | 128 |
| `max-w-36` | 144 |
| `max-w-40` | 160 |
| `max-w-44` | 176 |
| `max-w-48` | 192 |
| `max-w-52` | 208 |
| `max-w-56` | 224 |
| `max-w-60` | 240 |
| `max-w-64` | 256 |
| `max-w-72` | 288 |
| `max-w-80` | 320 |
| `max-w-96` | 384 |

---

## 9. Stroke Width (stroke-width collection — 11 variables)


### Stroke Width (stroke-width collection — 11 variables)

| Variable | Value (px) |
|---|---|
| `stroke-0,5` | 0.5 |
| `stroke-0,75` | 0.75 |
| `stroke-1` | 1 |
| `stroke-1,25` | 1.25 |
| `stroke-1,5` | 1.5 |
| `stroke-1,75` | 1.75 |
| `stroke-2` | 2 |
| `stroke-2,25` | 2.25 |
| `stroke-2,5` | 2.5 |
| `stroke-2,75` | 2.75 |
| `stroke-3` | 3 |

---

## 10. Opacity (opacity collection — 21 variables)


| Variable | Value | Tailwind class |
|---|---|---|
| `opacity-0` | 0 | `opacity-0` |
| `opacity-5` | 5 | `opacity-5` |
| `opacity-10` | 10 | `opacity-10` |
| `opacity-15` | 15 | `opacity-15` |
| `opacity-20` | 20 | `opacity-20` |
| `opacity-25` | 25 | `opacity-25` |
| `opacity-30` | 30 | `opacity-30` |
| `opacity-35` | 35 | `opacity-35` |
| `opacity-40` | 40 | `opacity-40` |
| `opacity-45` | 45 | `opacity-45` |
| `opacity-50` | 50 | `opacity-50` |
| `opacity-55` | 55 | `opacity-55` |
| `opacity-60` | 60 | `opacity-60` |
| `opacity-65` | 65 | `opacity-65` |
| `opacity-70` | 70 | `opacity-70` |
| `opacity-75` | 75 | `opacity-75` |
| `opacity-80` | 80 | `opacity-80` |
| `opacity-85` | 85 | `opacity-85` |
| `opacity-90` | 90 | `opacity-90` |
| `opacity-95` | 95 | `opacity-95` |
| `opacity-100` | 100 | `opacity-100` |

---

## 11. Tailwind Color Palette (tw/colors collection — 244 variables)


### `amber`

| Token | Hex | HSL |
|---|---|---|
| `amber/50` | #fffbeb | hsl(48 100% 96%) |
| `amber/100` | #fef3c7 | hsl(48 96% 89%) |
| `amber/200` | #fde68a | hsl(48 97% 77%) |
| `amber/300` | #fcd34d | hsl(46 97% 65%) |
| `amber/400` | #fbbf24 | hsl(43 96% 56%) |
| `amber/500` | #f59e0b | hsl(38 92% 50%) |
| `amber/600` | #d97706 | hsl(32 95% 44%) |
| `amber/700` | #b45309 | hsl(26 90% 37%) |
| `amber/800` | #92400e | hsl(23 83% 31%) |
| `amber/900` | #78350f | hsl(22 78% 26%) |
| `amber/950` | #451a03 | hsl(21 92% 14%) |

### `blue`

| Token | Hex | HSL |
|---|---|---|
| `blue/50` | #eff6ff | hsl(214 100% 97%) |
| `blue/100` | #dbeafe | hsl(214 95% 93%) |
| `blue/200` | #bfdbfe | hsl(213 97% 87%) |
| `blue/300` | #93c5fd | hsl(212 96% 78%) |
| `blue/400` | #60a5fa | hsl(213 94% 68%) |
| `blue/500` | #3b82f6 | hsl(217 91% 60%) |
| `blue/600` | #2563eb | hsl(221 83% 53%) |
| `blue/700` | #1d4ed8 | hsl(224 76% 48%) |
| `blue/800` | #1e40af | hsl(226 71% 40%) |
| `blue/900` | #1e3a8a | hsl(224 64% 33%) |
| `blue/950` | #172554 | hsl(226 57% 21%) |

### `cyan`

| Token | Hex | HSL |
|---|---|---|
| `cyan/50` | #ecfeff | hsl(183 100% 96%) |
| `cyan/100` | #cffafe | hsl(185 96% 90%) |
| `cyan/200` | #a5f3fc | hsl(186 94% 82%) |
| `cyan/300` | #67e8f9 | hsl(187 92% 69%) |
| `cyan/400` | #22d3ee | hsl(188 86% 53%) |
| `cyan/500` | #06b6d4 | hsl(189 94% 43%) |
| `cyan/600` | #0891b2 | hsl(192 91% 36%) |
| `cyan/700` | #0e7490 | hsl(193 82% 31%) |
| `cyan/800` | #155e75 | hsl(194 70% 27%) |
| `cyan/900` | #164e63 | hsl(196 64% 24%) |
| `cyan/950` | #083344 | hsl(197 79% 15%) |

### `emerald`

| Token | Hex | HSL |
|---|---|---|
| `emerald/50` | #ecfdf5 | hsl(152 81% 96%) |
| `emerald/100` | #d1fae5 | hsl(149 80% 90%) |
| `emerald/200` | #a7f3d0 | hsl(152 76% 80%) |
| `emerald/300` | #6ee7b7 | hsl(156 72% 67%) |
| `emerald/400` | #34d399 | hsl(158 64% 52%) |
| `emerald/500` | #10b981 | hsl(160 84% 39%) |
| `emerald/600` | #059669 | hsl(161 94% 30%) |
| `emerald/700` | #047857 | hsl(163 94% 24%) |
| `emerald/800` | #065f46 | hsl(163 88% 20%) |
| `emerald/900` | #064e3b | hsl(164 86% 16%) |
| `emerald/950` | #022c22 | hsl(166 91% 9%) |

### `fuchsia`

| Token | Hex | HSL |
|---|---|---|
| `fuchsia/50` | #fdf4ff | hsl(289 100% 98%) |
| `fuchsia/100` | #fae8ff | hsl(287 100% 95%) |
| `fuchsia/200` | #f5d0fe | hsl(288 96% 91%) |
| `fuchsia/300` | #f0abfc | hsl(291 93% 83%) |
| `fuchsia/400` | #e879f9 | hsl(292 91% 73%) |
| `fuchsia/500` | #d946ef | hsl(292 84% 61%) |
| `fuchsia/600` | #c026d3 | hsl(293 69% 49%) |
| `fuchsia/700` | #a21caf | hsl(295 72% 40%) |
| `fuchsia/800` | #86198f | hsl(295 70% 33%) |
| `fuchsia/900` | #701a75 | hsl(297 64% 28%) |
| `fuchsia/950` | #4a044e | hsl(297 90% 16%) |

### `gray`

| Token | Hex | HSL |
|---|---|---|
| `gray/50` | #f9fafb | hsl(210 20% 98%) |
| `gray/100` | #f3f4f6 | hsl(220 14% 96%) |
| `gray/200` | #e5e7eb | hsl(220 13% 91%) |
| `gray/300` | #d1d5db | hsl(216 12% 84%) |
| `gray/400` | #9ca3af | hsl(218 11% 65%) |
| `gray/500` | #6b7280 | hsl(220 9% 46%) |
| `gray/600` | #4b5563 | hsl(215 14% 34%) |
| `gray/700` | #374151 | hsl(217 19% 27%) |
| `gray/800` | #1f2937 | hsl(215 28% 17%) |
| `gray/900` | #111827 | hsl(221 39% 11%) |
| `gray/950` | #030712 | hsl(224 71% 4%) |

### `green`

| Token | Hex | HSL |
|---|---|---|
| `green/50` | #f0fdf4 | hsl(138 76% 97%) |
| `green/100` | #dcfce7 | hsl(141 84% 93%) |
| `green/200` | #bbf7d0 | hsl(141 79% 85%) |
| `green/300` | #86efac | hsl(142 77% 73%) |
| `green/400` | #4ade80 | hsl(142 69% 58%) |
| `green/500` | #22c55e | hsl(142 71% 45%) |
| `green/600` | #16a34a | hsl(142 76% 36%) |
| `green/700` | #15803d | hsl(142 72% 29%) |
| `green/800` | #166534 | hsl(143 64% 24%) |
| `green/900` | #14532d | hsl(144 61% 20%) |
| `green/950` | #052e16 | hsl(145 80% 10%) |

### `indigo`

| Token | Hex | HSL |
|---|---|---|
| `indigo/50` | #eef2ff | hsl(226 100% 97%) |
| `indigo/100` | #e0e7ff | hsl(226 100% 94%) |
| `indigo/200` | #c7d2fe | hsl(228 96% 89%) |
| `indigo/300` | #a5b4fc | hsl(230 94% 82%) |
| `indigo/400` | #818cf8 | hsl(234 89% 74%) |
| `indigo/500` | #6366f1 | hsl(239 84% 67%) |
| `indigo/600` | #4f46e5 | hsl(243 75% 59%) |
| `indigo/700` | #4338ca | hsl(245 58% 51%) |
| `indigo/800` | #3730a3 | hsl(244 55% 41%) |
| `indigo/900` | #312e81 | hsl(242 47% 34%) |
| `indigo/950` | #1e1b4b | hsl(244 47% 20%) |

### `lime`

| Token | Hex | HSL |
|---|---|---|
| `lime/50` | #f7fee7 | hsl(78 92% 95%) |
| `lime/100` | #ecfccb | hsl(80 89% 89%) |
| `lime/200` | #d9f99d | hsl(81 88% 80%) |
| `lime/300` | #bef264 | hsl(82 85% 67%) |
| `lime/400` | #a3e635 | hsl(83 78% 55%) |
| `lime/500` | #84cc16 | hsl(84 81% 44%) |
| `lime/600` | #65a30d | hsl(85 85% 35%) |
| `lime/700` | #4d7c0f | hsl(86 78% 27%) |
| `lime/800` | #3f6212 | hsl(86 69% 23%) |
| `lime/900` | #365314 | hsl(88 61% 20%) |
| `lime/950` | #1a2e05 | hsl(89 80% 10%) |

### `misc`

| Token | Hex | HSL |
|---|---|---|
| `white` | #ffffff | hsl(0 0% 100%) |
| `black` | #000000 | hsl(0 0% 0%) |

### `neutral`

| Token | Hex | HSL |
|---|---|---|
| `neutral/50` | #fafafa | hsl(0 0% 98%) |
| `neutral/100` | #f5f5f5 | hsl(0 0% 96%) |
| `neutral/200` | #e5e5e5 | hsl(0 0% 90%) |
| `neutral/300` | #d4d4d4 | hsl(0 0% 83%) |
| `neutral/400` | #a3a3a3 | hsl(0 0% 64%) |
| `neutral/500` | #737373 | hsl(0 0% 45%) |
| `neutral/600` | #525252 | hsl(0 0% 32%) |
| `neutral/700` | #404040 | hsl(0 0% 25%) |
| `neutral/800` | #262626 | hsl(0 0% 15%) |
| `neutral/900` | #171717 | hsl(0 0% 9%) |
| `neutral/950` | #0a0a0a | hsl(0 0% 4%) |

### `orange`

| Token | Hex | HSL |
|---|---|---|
| `orange/50` | #fff7ed | hsl(33 100% 96%) |
| `orange/100` | #ffedd5 | hsl(34 100% 92%) |
| `orange/200` | #fed7aa | hsl(32 98% 83%) |
| `orange/300` | #fdba74 | hsl(31 97% 72%) |
| `orange/400` | #fb923c | hsl(27 96% 61%) |
| `orange/500` | #f97316 | hsl(25 95% 53%) |
| `orange/600` | #ea580c | hsl(21 90% 48%) |
| `orange/700` | #c2410c | hsl(17 88% 40%) |
| `orange/800` | #9a3412 | hsl(15 79% 34%) |
| `orange/900` | #7c2d12 | hsl(15 75% 28%) |
| `orange/950` | #431407 | hsl(13 81% 15%) |

### `pink`

| Token | Hex | HSL |
|---|---|---|
| `pink/50` | #fdf2f8 | hsl(327 73% 97%) |
| `pink/100` | #fce7f3 | hsl(326 78% 95%) |
| `pink/200` | #fbcfe8 | hsl(326 85% 90%) |
| `pink/300` | #f9a8d4 | hsl(327 87% 82%) |
| `pink/400` | #f472b6 | hsl(329 86% 70%) |
| `pink/500` | #ec4899 | hsl(330 81% 60%) |
| `pink/600` | #db2777 | hsl(333 71% 51%) |
| `pink/700` | #be185d | hsl(335 78% 42%) |
| `pink/800` | #9d174d | hsl(336 74% 35%) |
| `pink/900` | #831843 | hsl(336 69% 30%) |
| `pink/950` | #500724 | hsl(336 84% 17%) |

### `purple`

| Token | Hex | HSL |
|---|---|---|
| `purple/50` | #faf5ff | hsl(270 100% 98%) |
| `purple/100` | #f3e8ff | hsl(269 100% 95%) |
| `purple/200` | #e9d5ff | hsl(269 100% 92%) |
| `purple/300` | #d8b4fe | hsl(269 97% 85%) |
| `purple/400` | #c084fc | hsl(270 95% 75%) |
| `purple/500` | #a855f7 | hsl(271 91% 65%) |
| `purple/600` | #9333ea | hsl(271 81% 56%) |
| `purple/700` | #7e22ce | hsl(272 72% 47%) |
| `purple/800` | #6b21a8 | hsl(273 67% 39%) |
| `purple/900` | #581c87 | hsl(274 66% 32%) |
| `purple/950` | #3b0764 | hsl(274 87% 21%) |

### `red`

| Token | Hex | HSL |
|---|---|---|
| `red/50` | #fef2f2 | hsl(0 86% 97%) |
| `red/100` | #fee2e2 | hsl(0 93% 94%) |
| `red/200` | #fecaca | hsl(0 96% 89%) |
| `red/300` | #fca5a5 | hsl(0 94% 82%) |
| `red/400` | #f87171 | hsl(0 91% 71%) |
| `red/500` | #ef4444 | hsl(0 84% 60%) |
| `red/600` | #dc2626 | hsl(0 72% 51%) |
| `red/700` | #b91c1c | hsl(0 74% 42%) |
| `red/800` | #991b1b | hsl(0 70% 35%) |
| `red/900` | #7f1d1d | hsl(0 63% 31%) |
| `red/950` | #450a0a | hsl(0 75% 15%) |

### `rose`

| Token | Hex | HSL |
|---|---|---|
| `rose/50` | #fff1f2 | hsl(356 100% 97%) |
| `rose/100` | #ffe4e6 | hsl(356 100% 95%) |
| `rose/200` | #fecdd3 | hsl(353 96% 90%) |
| `rose/300` | #fda4af | hsl(353 96% 82%) |
| `rose/400` | #fb7185 | hsl(351 95% 71%) |
| `rose/500` | #f43f5e | hsl(350 89% 60%) |
| `rose/600` | #e11d48 | hsl(347 77% 50%) |
| `rose/700` | #be123c | hsl(345 83% 41%) |
| `rose/800` | #9f1239 | hsl(343 80% 35%) |
| `rose/900` | #881337 | hsl(342 75% 30%) |
| `rose/950` | #4c0519 | hsl(343 88% 16%) |

### `sky`

| Token | Hex | HSL |
|---|---|---|
| `sky/50` | #f0f9ff | hsl(204 100% 97%) |
| `sky/100` | #e0f2fe | hsl(204 94% 94%) |
| `sky/200` | #bae6fd | hsl(201 94% 86%) |
| `sky/300` | #7dd3fc | hsl(199 95% 74%) |
| `sky/400` | #38bdf8 | hsl(198 93% 60%) |
| `sky/500` | #0ea5e9 | hsl(199 89% 48%) |
| `sky/600` | #0284c7 | hsl(200 98% 39%) |
| `sky/700` | #0369a1 | hsl(201 96% 32%) |
| `sky/800` | #075985 | hsl(201 90% 27%) |
| `sky/900` | #0c4a6e | hsl(202 80% 24%) |
| `sky/950` | #082f49 | hsl(204 80% 16%) |

### `slate`

| Token | Hex | HSL |
|---|---|---|
| `slate/50` | #f8fafc | hsl(210 40% 98%) |
| `slate/100` | #f1f5f9 | hsl(210 40% 96%) |
| `slate/200` | #e2e8f0 | hsl(214 32% 91%) |
| `slate/300` | #cbd5e1 | hsl(213 27% 84%) |
| `slate/400` | #94a3b8 | hsl(215 20% 65%) |
| `slate/500` | #64748b | hsl(215 16% 47%) |
| `slate/600` | #475569 | hsl(215 19% 35%) |
| `slate/700` | #334155 | hsl(215 25% 27%) |
| `slate/800` | #1e293b | hsl(217 33% 17%) |
| `slate/900` | #0f172a | hsl(222 47% 11%) |
| `slate/950` | #020617 | hsl(229 84% 5%) |

### `stone`

| Token | Hex | HSL |
|---|---|---|
| `stone/50` | #fafaf9 | hsl(60 9% 98%) |
| `stone/100` | #f5f5f4 | hsl(60 5% 96%) |
| `stone/200` | #e7e5e4 | hsl(20 6% 90%) |
| `stone/300` | #d6d3d1 | hsl(24 6% 83%) |
| `stone/400` | #a8a29e | hsl(24 5% 64%) |
| `stone/500` | #78716c | hsl(25 5% 45%) |
| `stone/600` | #57534e | hsl(33 5% 32%) |
| `stone/700` | #44403c | hsl(30 6% 25%) |
| `stone/800` | #292524 | hsl(12 6% 15%) |
| `stone/900` | #1c1917 | hsl(24 10% 10%) |
| `stone/950` | #0c0a09 | hsl(20 14% 4%) |

### `teal`

| Token | Hex | HSL |
|---|---|---|
| `teal/50` | #f0fdfa | hsl(166 76% 97%) |
| `teal/100` | #ccfbf1 | hsl(167 85% 89%) |
| `teal/200` | #99f6e4 | hsl(168 84% 78%) |
| `teal/300` | #5eead4 | hsl(171 77% 64%) |
| `teal/400` | #2dd4bf | hsl(172 66% 50%) |
| `teal/500` | #14b8a6 | hsl(173 80% 40%) |
| `teal/600` | #0d9488 | hsl(175 84% 32%) |
| `teal/700` | #0f766e | hsl(175 77% 26%) |
| `teal/800` | #115e59 | hsl(176 69% 22%) |
| `teal/900` | #134e4a | hsl(176 61% 19%) |
| `teal/950` | #042f2e | hsl(179 84% 10%) |

### `violet`

| Token | Hex | HSL |
|---|---|---|
| `violet/50` | #f5f3ff | hsl(250 100% 98%) |
| `violet/100` | #ede9fe | hsl(251 91% 95%) |
| `violet/200` | #ddd6fe | hsl(250 95% 92%) |
| `violet/300` | #c4b5fd | hsl(252 95% 85%) |
| `violet/400` | #a78bfa | hsl(255 92% 76%) |
| `violet/500` | #8b5cf6 | hsl(258 90% 66%) |
| `violet/600` | #7c3aed | hsl(262 83% 58%) |
| `violet/700` | #6d28d9 | hsl(263 70% 50%) |
| `violet/800` | #5b21b6 | hsl(263 69% 42%) |
| `violet/900` | #4c1d95 | hsl(264 67% 35%) |
| `violet/950` | #2e1065 | hsl(261 73% 23%) |

### `yellow`

| Token | Hex | HSL |
|---|---|---|
| `yellow/50` | #fefce8 | hsl(55 92% 95%) |
| `yellow/100` | #fef9c3 | hsl(55 97% 88%) |
| `yellow/200` | #fef08a | hsl(53 98% 77%) |
| `yellow/300` | #fde047 | hsl(50 98% 64%) |
| `yellow/400` | #facc15 | hsl(48 96% 53%) |
| `yellow/500` | #eab308 | hsl(45 93% 47%) |
| `yellow/600` | #ca8a04 | hsl(41 96% 40%) |
| `yellow/700` | #a16207 | hsl(35 92% 33%) |
| `yellow/800` | #854d0e | hsl(32 81% 29%) |
| `yellow/900` | #713f12 | hsl(28 73% 26%) |
| `yellow/950` | #422006 | hsl(26 83% 14%) |

### `zinc`

| Token | Hex | HSL |
|---|---|---|
| `zinc/50` | #fafafa | hsl(0 0% 98%) |
| `zinc/100` | #f4f4f5 | hsl(240 5% 96%) |
| `zinc/200` | #e4e4e7 | hsl(240 6% 90%) |
| `zinc/300` | #d4d4d8 | hsl(240 5% 84%) |
| `zinc/400` | #a1a1aa | hsl(240 5% 65%) |
| `zinc/500` | #71717a | hsl(240 4% 46%) |
| `zinc/600` | #52525b | hsl(240 5% 34%) |
| `zinc/700` | #3f3f46 | hsl(240 5% 26%) |
| `zinc/800` | #27272a | hsl(240 4% 16%) |
| `zinc/900` | #18181b | hsl(240 6% 10%) |
| `zinc/950` | #09090b | hsl(240 10% 4%) |

---

## 12. Radix Color Palette (rdx/colors collection — 396 variables)


### `amber`

| Token | Hex | HSL |
|---|---|---|
| `amber/1` | #fefdfb | hsl(40 60% 99%) |
| `amber/2` | #fefbe9 | hsl(51 91% 95%) |
| `amber/3` | #fff7c2 | hsl(52 100% 88%) |
| `amber/4` | #ffee9c | hsl(50 100% 81%) |
| `amber/5` | #fbe577 | hsl(50 94% 73%) |
| `amber/6` | #f3d673 | hsl(46 84% 70%) |
| `amber/7` | #e9c162 | hsl(42 75% 65%) |
| `amber/8` | #e2a336 | hsl(38 75% 55%) |
| `amber/9` | #ffc53d | hsl(42 100% 62%) |
| `amber/10` | #ffba18 | hsl(42 100% 55%) |
| `amber/11` | #ab6400 | hsl(35 100% 34%) |
| `amber/12` | #4f3422 | hsl(24 40% 22%) |

### `black`

| Token | Hex | HSL |
|---|---|---|
| `black/1` | #000000 | hsl(0 0% 0%) |
| `black/2` | #000000 | hsl(0 0% 0%) |
| `black/3` | #000000 | hsl(0 0% 0%) |
| `black/4` | #000000 | hsl(0 0% 0%) |
| `black/5` | #000000 | hsl(0 0% 0%) |
| `black/6` | #000000 | hsl(0 0% 0%) |
| `black/7` | #000000 | hsl(0 0% 0%) |
| `black/8` | #000000 | hsl(0 0% 0%) |
| `black/9` | #000000 | hsl(0 0% 0%) |
| `black/10` | #000000 | hsl(0 0% 0%) |
| `black/11` | #000000 | hsl(0 0% 0%) |
| `black/12` | #000000 | hsl(0 0% 0%) |

### `blue`

| Token | Hex | HSL |
|---|---|---|
| `blue/1` | #fbfdff | hsl(210 100% 99%) |
| `blue/2` | #f4faff | hsl(207 100% 98%) |
| `blue/3` | #e6f4fe | hsl(205 92% 95%) |
| `blue/4` | #d5efff | hsl(203 100% 92%) |
| `blue/5` | #c2e5ff | hsl(206 100% 88%) |
| `blue/6` | #acd8fc | hsl(207 93% 83%) |
| `blue/7` | #8ec8f6 | hsl(207 85% 76%) |
| `blue/8` | #5eb1ef | hsl(206 82% 65%) |
| `blue/9` | #0090ff | hsl(206 100% 50%) |
| `blue/10` | #0588f0 | hsl(207 96% 48%) |
| `blue/11` | #0d74ce | hsl(208 88% 43%) |
| `blue/12` | #113264 | hsl(216 71% 23%) |

### `bronze`

| Token | Hex | HSL |
|---|---|---|
| `bronze/1` | #fdfcfc | hsl(0 20% 99%) |
| `bronze/2` | #fdf7f5 | hsl(15 67% 98%) |
| `bronze/3` | #f6edea | hsl(15 40% 94%) |
| `bronze/4` | #efe4df | hsl(19 33% 91%) |
| `bronze/5` | #e7d9d3 | hsl(18 29% 87%) |
| `bronze/6` | #dfcdc5 | hsl(18 29% 82%) |
| `bronze/7` | #d3bcb3 | hsl(17 27% 76%) |
| `bronze/8` | #c2a499 | hsl(16 25% 68%) |
| `bronze/9` | #a18072 | hsl(18 20% 54%) |
| `bronze/10` | #957468 | hsl(16 18% 50%) |
| `bronze/11` | #7d5e54 | hsl(15 20% 41%) |
| `bronze/12` | #43302b | hsl(12 22% 22%) |

### `brown`

| Token | Hex | HSL |
|---|---|---|
| `brown/1` | #fefdfc | hsl(30 50% 99%) |
| `brown/2` | #fcf9f6 | hsl(30 50% 98%) |
| `brown/3` | #f6eee7 | hsl(28 45% 94%) |
| `brown/4` | #f0e4d9 | hsl(29 43% 90%) |
| `brown/5` | #ebdaca | hsl(29 45% 86%) |
| `brown/6` | #e4cdb7 | hsl(29 45% 81%) |
| `brown/7` | #dcbc9f | hsl(29 47% 74%) |
| `brown/8` | #cea37e | hsl(28 45% 65%) |
| `brown/9` | #ad7f58 | hsl(28 34% 51%) |
| `brown/10` | #a07553 | hsl(26 32% 48%) |
| `brown/11` | #815e46 | hsl(24 30% 39%) |
| `brown/12` | #3e332e | hsl(19 15% 21%) |

### `crimson`

| Token | Hex | HSL |
|---|---|---|
| `crimson/1` | #fffcfd | hsl(340 100% 99%) |
| `crimson/2` | #fef7f9 | hsl(343 78% 98%) |
| `crimson/3` | #ffe9f0 | hsl(341 100% 96%) |
| `crimson/4` | #fedce7 | hsl(341 94% 93%) |
| `crimson/5` | #facedd | hsl(340 81% 89%) |
| `crimson/6` | #f3bed1 | hsl(338 69% 85%) |
| `crimson/7` | #eaacc3 | hsl(338 60% 80%) |
| `crimson/8` | #e093b2 | hsl(336 55% 73%) |
| `crimson/9` | #e93d82 | hsl(336 80% 58%) |
| `crimson/10` | #df3478 | hsl(336 73% 54%) |
| `crimson/11` | #cb1d63 | hsl(336 75% 45%) |
| `crimson/12` | #621639 | hsl(332 63% 24%) |

### `cyan`

| Token | Hex | HSL |
|---|---|---|
| `cyan/1` | #fafdfe | hsl(195 67% 99%) |
| `cyan/2` | #f2fafb | hsl(187 53% 97%) |
| `cyan/3` | #def7f9 | hsl(184 69% 92%) |
| `cyan/4` | #caf1f6 | hsl(187 71% 88%) |
| `cyan/5` | #b5e9f0 | hsl(187 66% 83%) |
| `cyan/6` | #9ddde7 | hsl(188 61% 76%) |
| `cyan/7` | #7dcedc | hsl(189 58% 68%) |
| `cyan/8` | #3db9cf | hsl(189 60% 53%) |
| `cyan/9` | #00a2c7 | hsl(191 100% 39%) |
| `cyan/10` | #0797b9 | hsl(191 93% 38%) |
| `cyan/11` | #107d98 | hsl(192 81% 33%) |
| `cyan/12` | #0d3c48 | hsl(192 69% 17%) |

### `gold`

| Token | Hex | HSL |
|---|---|---|
| `gold/1` | #fdfdfc | hsl(60 20% 99%) |
| `gold/2` | #faf9f2 | hsl(52 44% 96%) |
| `gold/3` | #f2f0e7 | hsl(49 30% 93%) |
| `gold/4` | #eae6db | hsl(44 26% 89%) |
| `gold/5` | #e1dccf | hsl(43 23% 85%) |
| `gold/6` | #d8d0bf | hsl(41 24% 80%) |
| `gold/7` | #cbc0aa | hsl(40 24% 73%) |
| `gold/8` | #b9a88d | hsl(37 24% 64%) |
| `gold/9` | #978365 | hsl(36 20% 49%) |
| `gold/10` | #8c7a5e | hsl(37 20% 46%) |
| `gold/11` | #71624b | hsl(36 20% 37%) |
| `gold/12` | #3b352b | hsl(38 16% 20%) |

### `grass`

| Token | Hex | HSL |
|---|---|---|
| `grass/1` | #fbfefb | hsl(120 60% 99%) |
| `grass/2` | #f5fbf5 | hsl(120 43% 97%) |
| `grass/3` | #e9f6e9 | hsl(120 42% 94%) |
| `grass/4` | #daf1db | hsl(123 45% 90%) |
| `grass/5` | #c9e8ca | hsl(122 40% 85%) |
| `grass/6` | #b2ddb5 | hsl(124 39% 78%) |
| `grass/7` | #94ce9a | hsl(126 37% 69%) |
| `grass/8` | #65ba74 | hsl(131 38% 56%) |
| `grass/9` | #46a758 | hsl(131 41% 46%) |
| `grass/10` | #3e9b4f | hsl(131 43% 43%) |
| `grass/11` | #2a7e3b | hsl(132 50% 33%) |
| `grass/12` | #203c25 | hsl(131 30% 18%) |

### `gray`

| Token | Hex | HSL |
|---|---|---|
| `gray/1` | #fcfcfc | hsl(0 0% 99%) |
| `gray/2` | #f9f9f9 | hsl(0 0% 98%) |
| `gray/3` | #f0f0f0 | hsl(0 0% 94%) |
| `gray/4` | #e8e8e8 | hsl(0 0% 91%) |
| `gray/5` | #e0e0e0 | hsl(0 0% 88%) |
| `gray/6` | #d9d9d9 | hsl(0 0% 85%) |
| `gray/7` | #cecece | hsl(0 0% 81%) |
| `gray/8` | #bbbbbb | hsl(0 0% 73%) |
| `gray/9` | #8d8d8d | hsl(0 0% 55%) |
| `gray/10` | #838383 | hsl(0 0% 51%) |
| `gray/11` | #646464 | hsl(0 0% 39%) |
| `gray/12` | #202020 | hsl(0 0% 13%) |

### `green`

| Token | Hex | HSL |
|---|---|---|
| `green/1` | #fbfefc | hsl(140 60% 99%) |
| `green/2` | #f4fbf6 | hsl(137 47% 97%) |
| `green/3` | #e6f6eb | hsl(139 47% 93%) |
| `green/4` | #d6f1df | hsl(140 49% 89%) |
| `green/5` | #c4e8d1 | hsl(142 44% 84%) |
| `green/6` | #adddc0 | hsl(144 41% 77%) |
| `green/7` | #8eceaa | hsl(146 40% 68%) |
| `green/8` | #5bb98b | hsl(151 40% 54%) |
| `green/9` | #30a46c | hsl(151 55% 42%) |
| `green/10` | #2b9a66 | hsl(152 56% 39%) |
| `green/11` | #218358 | hsl(154 60% 32%) |
| `green/12` | #193b2d | hsl(155 40% 16%) |

### `indigo`

| Token | Hex | HSL |
|---|---|---|
| `indigo/1` | #fdfdfe | hsl(240 33% 99%) |
| `indigo/2` | #f7f9ff | hsl(225 100% 98%) |
| `indigo/3` | #edf2fe | hsl(222 89% 96%) |
| `indigo/4` | #e1e9ff | hsl(224 100% 94%) |
| `indigo/5` | #d2deff | hsl(224 100% 91%) |
| `indigo/6` | #c1d0ff | hsl(225 100% 88%) |
| `indigo/7` | #abbdf9 | hsl(226 87% 82%) |
| `indigo/8` | #8da4ef | hsl(226 75% 75%) |
| `indigo/9` | #3e63dd | hsl(226 70% 55%) |
| `indigo/10` | #3358d4 | hsl(226 65% 52%) |
| `indigo/11` | #3a5bc7 | hsl(226 56% 50%) |
| `indigo/12` | #1f2d5c | hsl(226 50% 24%) |

### `iris`

| Token | Hex | HSL |
|---|---|---|
| `iris/1` | #fdfdff | hsl(240 100% 100%) |
| `iris/2` | #f8f8ff | hsl(240 100% 99%) |
| `iris/3` | #f0f1fe | hsl(236 88% 97%) |
| `iris/4` | #e6e7ff | hsl(238 100% 95%) |
| `iris/5` | #dadcff | hsl(237 100% 93%) |
| `iris/6` | #cbcdff | hsl(238 100% 90%) |
| `iris/7` | #b8baf8 | hsl(238 82% 85%) |
| `iris/8` | #9b9ef0 | hsl(238 74% 77%) |
| `iris/9` | #5b5bd6 | hsl(240 60% 60%) |
| `iris/10` | #5151cd | hsl(240 55% 56%) |
| `iris/11` | #5753c6 | hsl(242 50% 55%) |
| `iris/12` | #272962 | hsl(238 43% 27%) |

### `jade`

| Token | Hex | HSL |
|---|---|---|
| `jade/1` | #fbfefd | hsl(160 60% 99%) |
| `jade/2` | #f4fbf7 | hsl(146 47% 97%) |
| `jade/3` | #e6f7ed | hsl(145 52% 94%) |
| `jade/4` | #d6f1e3 | hsl(149 49% 89%) |
| `jade/5` | #c3e9d7 | hsl(152 46% 84%) |
| `jade/6` | #acdec8 | hsl(154 43% 77%) |
| `jade/7` | #8bceb6 | hsl(159 41% 68%) |
| `jade/8` | #56ba9f | hsl(164 42% 53%) |
| `jade/9` | #29a383 | hsl(164 60% 40%) |
| `jade/10` | #26997b | hsl(164 60% 37%) |
| `jade/11` | #208368 | hsl(164 61% 32%) |
| `jade/12` | #1d3b31 | hsl(160 34% 17%) |

### `lime`

| Token | Hex | HSL |
|---|---|---|
| `lime/1` | #fcfdfa | hsl(80 43% 99%) |
| `lime/2` | #f8faf3 | hsl(77 41% 97%) |
| `lime/3` | #eef6d6 | hsl(75 64% 90%) |
| `lime/4` | #e2f0bd | hsl(76 63% 84%) |
| `lime/5` | #d3e7a6 | hsl(78 58% 78%) |
| `lime/6` | #c2da91 | hsl(80 50% 71%) |
| `lime/7` | #abc978 | hsl(82 43% 63%) |
| `lime/8` | #8db654 | hsl(85 40% 52%) |
| `lime/9` | #bdee63 | hsl(81 80% 66%) |
| `lime/10` | #b0e64c | hsl(81 75% 60%) |
| `lime/11` | #5c7c2f | hsl(85 45% 34%) |
| `lime/12` | #37401c | hsl(75 39% 18%) |

### `mauve`

| Token | Hex | HSL |
|---|---|---|
| `mauve/1` | #fdfcfd | hsl(300 20% 99%) |
| `mauve/2` | #faf9fb | hsl(270 20% 98%) |
| `mauve/3` | #f2eff3 | hsl(285 14% 95%) |
| `mauve/4` | #eae7ec | hsl(276 12% 92%) |
| `mauve/5` | #e3dfe6 | hsl(274 12% 89%) |
| `mauve/6` | #dbd8e0 | hsl(262 11% 86%) |
| `mauve/7` | #d0cdd7 | hsl(258 11% 82%) |
| `mauve/8` | #bcbac7 | hsl(249 10% 75%) |
| `mauve/9` | #8e8c99 | hsl(249 6% 57%) |
| `mauve/10` | #84828e | hsl(250 5% 53%) |
| `mauve/11` | #65636d | hsl(252 5% 41%) |
| `mauve/12` | #211f26 | hsl(257 10% 14%) |

### `mint`

| Token | Hex | HSL |
|---|---|---|
| `mint/1` | #f9fefd | hsl(168 71% 99%) |
| `mint/2` | #f2fbf9 | hsl(167 53% 97%) |
| `mint/3` | #ddf9f2 | hsl(165 70% 92%) |
| `mint/4` | #c8f4e9 | hsl(165 67% 87%) |
| `mint/5` | #b3ecde | hsl(165 60% 81%) |
| `mint/6` | #9ce0d0 | hsl(166 52% 75%) |
| `mint/7` | #7ecfbd | hsl(167 46% 65%) |
| `mint/8` | #4cbba5 | hsl(168 45% 52%) |
| `mint/9` | #86ead4 | hsl(167 70% 72%) |
| `mint/10` | #7de0cb | hsl(167 61% 68%) |
| `mint/11` | #027864 | hsl(170 97% 24%) |
| `mint/12` | #16433c | hsl(171 51% 17%) |

### `olive`

| Token | Hex | HSL |
|---|---|---|
| `olive/1` | #fcfdfc | hsl(120 20% 99%) |
| `olive/2` | #f8faf8 | hsl(120 17% 98%) |
| `olive/3` | #eff1ef | hsl(120 7% 94%) |
| `olive/4` | #e7e9e7 | hsl(120 4% 91%) |
| `olive/5` | #dfe2df | hsl(120 5% 88%) |
| `olive/6` | #d7dad7 | hsl(120 4% 85%) |
| `olive/7` | #cccfcc | hsl(120 3% 81%) |
| `olive/8` | #b9bcb8 | hsl(105 3% 73%) |
| `olive/9` | #898e87 | hsl(103 3% 54%) |
| `olive/10` | #7f847d | hsl(103 3% 50%) |
| `olive/11` | #60655f | hsl(110 3% 38%) |
| `olive/12` | #1d211c | hsl(108 8% 12%) |

### `orange`

| Token | Hex | HSL |
|---|---|---|
| `orange/1` | #fefcfb | hsl(20 60% 99%) |
| `orange/2` | #fff7ed | hsl(33 100% 96%) |
| `orange/3` | #ffefd6 | hsl(37 100% 92%) |
| `orange/4` | #ffdfb5 | hsl(34 100% 85%) |
| `orange/5` | #ffd19a | hsl(33 100% 80%) |
| `orange/6` | #ffc182 | hsl(30 100% 75%) |
| `orange/7` | #f5ae73 | hsl(27 87% 71%) |
| `orange/8` | #ec9455 | hsl(25 80% 63%) |
| `orange/9` | #f76b15 | hsl(23 93% 53%) |
| `orange/10` | #ef5f00 | hsl(24 100% 47%) |
| `orange/11` | #cc4e00 | hsl(23 100% 40%) |
| `orange/12` | #582d1d | hsl(16 50% 23%) |

### `pink`

| Token | Hex | HSL |
|---|---|---|
| `pink/1` | #fffcfe | hsl(320 100% 99%) |
| `pink/2` | #fef7fb | hsl(326 78% 98%) |
| `pink/3` | #fee9f5 | hsl(326 91% 95%) |
| `pink/4` | #fbdcef | hsl(323 79% 92%) |
| `pink/5` | #f6cee7 | hsl(322 69% 89%) |
| `pink/6` | #efbfdd | hsl(322 60% 84%) |
| `pink/7` | #e7acd0 | hsl(323 55% 79%) |
| `pink/8` | #dd93c2 | hsl(322 52% 72%) |
| `pink/9` | #d6409f | hsl(322 65% 55%) |
| `pink/10` | #cf3897 | hsl(322 61% 52%) |
| `pink/11` | #c2298a | hsl(322 65% 46%) |
| `pink/12` | #651249 | hsl(320 70% 23%) |

### `plum`

| Token | Hex | HSL |
|---|---|---|
| `plum/1` | #fefcff | hsl(280 100% 99%) |
| `plum/2` | #fdf7fd | hsl(300 60% 98%) |
| `plum/3` | #fbebfb | hsl(300 67% 95%) |
| `plum/4` | #f7def8 | hsl(298 65% 92%) |
| `plum/5` | #f2d1f3 | hsl(298 59% 89%) |
| `plum/6` | #e9c2ec | hsl(296 52% 84%) |
| `plum/7` | #deade3 | hsl(294 49% 78%) |
| `plum/8` | #cf91d8 | hsl(292 48% 71%) |
| `plum/9` | #ab4aba | hsl(292 45% 51%) |
| `plum/10` | #a144af | hsl(292 44% 48%) |
| `plum/11` | #953ea3 | hsl(292 45% 44%) |
| `plum/12` | #53195d | hsl(291 58% 23%) |

### `purple`

| Token | Hex | HSL |
|---|---|---|
| `purple/1` | #fefcfe | hsl(300 50% 99%) |
| `purple/2` | #fbf7fe | hsl(274 78% 98%) |
| `purple/3` | #f7edfe | hsl(275 89% 96%) |
| `purple/4` | #f2e2fc | hsl(277 81% 94%) |
| `purple/5` | #ead5f9 | hsl(275 75% 91%) |
| `purple/6` | #e0c4f4 | hsl(275 69% 86%) |
| `purple/7` | #d1afec | hsl(273 62% 81%) |
| `purple/8` | #be93e4 | hsl(272 60% 74%) |
| `purple/9` | #8e4ec6 | hsl(272 51% 54%) |
| `purple/10` | #8347b9 | hsl(272 45% 50%) |
| `purple/11` | #8145b5 | hsl(272 45% 49%) |
| `purple/12` | #402060 | hsl(270 50% 25%) |

### `red`

| Token | Hex | HSL |
|---|---|---|
| `red/1` | #fffcfc | hsl(0 100% 99%) |
| `red/2` | #fff7f7 | hsl(0 100% 98%) |
| `red/3` | #feebec | hsl(357 90% 96%) |
| `red/4` | #ffdbdc | hsl(358 100% 93%) |
| `red/5` | #ffcdce | hsl(359 100% 90%) |
| `red/6` | #fdbdbe | hsl(359 94% 87%) |
| `red/7` | #f4a9aa | hsl(359 77% 81%) |
| `red/8` | #eb8e90 | hsl(359 70% 74%) |
| `red/9` | #e5484d | hsl(358 75% 59%) |
| `red/10` | #dc3e42 | hsl(358 69% 55%) |
| `red/11` | #ce2c31 | hsl(358 65% 49%) |
| `red/12` | #641723 | hsl(351 63% 24%) |

### `ruby`

| Token | Hex | HSL |
|---|---|---|
| `ruby/1` | #fffcfd | hsl(340 100% 99%) |
| `ruby/2` | #fff7f8 | hsl(352 100% 98%) |
| `ruby/3` | #feeaed | hsl(351 91% 96%) |
| `ruby/4` | #ffdce1 | hsl(351 100% 93%) |
| `ruby/5` | #ffced6 | hsl(350 100% 90%) |
| `ruby/6` | #f8bfc8 | hsl(351 80% 86%) |
| `ruby/7` | #efacb8 | hsl(349 68% 81%) |
| `ruby/8` | #e592a3 | hsl(348 61% 74%) |
| `ruby/9` | #e54666 | hsl(348 75% 59%) |
| `ruby/10` | #dc3b5d | hsl(347 70% 55%) |
| `ruby/11` | #ca244d | hsl(345 70% 47%) |
| `ruby/12` | #64172b | hsl(344 63% 24%) |

### `sage`

| Token | Hex | HSL |
|---|---|---|
| `sage/1` | #fbfdfc | hsl(150 33% 99%) |
| `sage/2` | #f7f9f8 | hsl(150 14% 97%) |
| `sage/3` | #eeeeff | hsl(240 100% 97%) |
| `sage/4` | #e6e9e8 | hsl(160 6% 91%) |
| `sage/5` | #dfe2e0 | hsl(140 5% 88%) |
| `sage/6` | #d7dad9 | hsl(160 4% 85%) |
| `sage/7` | #cbcfcd | hsl(150 4% 80%) |
| `sage/8` | #b8bcba | hsl(150 3% 73%) |
| `sage/9` | #868e8b | hsl(158 3% 54%) |
| `sage/10` | #7c8481 | hsl(158 3% 50%) |
| `sage/11` | #5f6563 | hsl(160 3% 38%) |
| `sage/12` | #1a211e | hsl(154 12% 12%) |

### `sand`

| Token | Hex | HSL |
|---|---|---|
| `sand/1` | #fdfdfc | hsl(60 20% 99%) |
| `sand/2` | #f9f9f8 | hsl(60 8% 97%) |
| `sand/3` | #f1f0ef | hsl(30 7% 94%) |
| `sand/4` | #e9e8e6 | hsl(40 6% 91%) |
| `sand/5` | #e2e1de | hsl(45 6% 88%) |
| `sand/6` | #dad9d6 | hsl(45 5% 85%) |
| `sand/7` | #cfceca | hsl(48 5% 80%) |
| `sand/8` | #bcbbb5 | hsl(51 5% 72%) |
| `sand/9` | #8d8d86 | hsl(60 3% 54%) |
| `sand/10` | #82827c | hsl(60 2% 50%) |
| `sand/11` | #63635e | hsl(60 3% 38%) |
| `sand/12` | #21201c | hsl(48 8% 12%) |

### `sky`

| Token | Hex | HSL |
|---|---|---|
| `sky/1` | #f9feff | hsl(190 100% 99%) |
| `sky/2` | #f1fafd | hsl(195 75% 97%) |
| `sky/3` | #e1f6fd | hsl(195 88% 94%) |
| `sky/4` | #d1f0fa | hsl(195 80% 90%) |
| `sky/5` | #bee7f5 | hsl(195 73% 85%) |
| `sky/6` | #a9daed | hsl(197 65% 80%) |
| `sky/7` | #8dcae3 | hsl(197 61% 72%) |
| `sky/8` | #60b3d7 | hsl(198 60% 61%) |
| `sky/9` | #7ce2fe | hsl(193 98% 74%) |
| `sky/10` | #74daf8 | hsl(194 90% 71%) |
| `sky/11` | #00749e | hsl(196 100% 31%) |
| `sky/12` | #1d3e56 | hsl(205 50% 23%) |

### `slate`

| Token | Hex | HSL |
|---|---|---|
| `slate/1` | #fcfcfd | hsl(240 20% 99%) |
| `slate/2` | #f9f9fb | hsl(240 20% 98%) |
| `slate/3` | #f0f0f3 | hsl(240 11% 95%) |
| `slate/4` | #e8e8ec | hsl(240 10% 92%) |
| `slate/5` | #e0e1e6 | hsl(230 11% 89%) |
| `slate/6` | #d9d9e0 | hsl(240 10% 86%) |
| `slate/7` | #cdced6 | hsl(233 10% 82%) |
| `slate/8` | #b9bbc6 | hsl(231 10% 75%) |
| `slate/9` | #8b8d98 | hsl(231 6% 57%) |
| `slate/10` | #80838d | hsl(226 5% 53%) |
| `slate/11` | #60646c | hsl(220 6% 40%) |
| `slate/12` | #1c2024 | hsl(210 13% 13%) |

### `teal`

| Token | Hex | HSL |
|---|---|---|
| `teal/1` | #fafefd | hsl(165 67% 99%) |
| `teal/2` | #f3fbf9 | hsl(165 50% 97%) |
| `teal/3` | #e0f8f3 | hsl(167 63% 93%) |
| `teal/4` | #ccf3ea | hsl(166 62% 88%) |
| `teal/5` | #b8eae0 | hsl(168 54% 82%) |
| `teal/6` | #a1ded2 | hsl(168 48% 75%) |
| `teal/7` | #83cdc1 | hsl(170 43% 66%) |
| `teal/8` | #53b9ab | hsl(172 42% 53%) |
| `teal/9` | #12a594 | hsl(173 80% 36%) |
| `teal/10` | #0d9b8a | hsl(173 85% 33%) |
| `teal/11` | #008573 | hsl(172 100% 26%) |
| `teal/12` | #0d3d38 | hsl(174 65% 15%) |

### `tomato`

| Token | Hex | HSL |
|---|---|---|
| `tomato/1` | #fffcfc | hsl(0 100% 99%) |
| `tomato/2` | #fff8f7 | hsl(8 100% 98%) |
| `tomato/3` | #feebe7 | hsl(10 92% 95%) |
| `tomato/4` | #ffdcd3 | hsl(12 100% 91%) |
| `tomato/5` | #ffcdc2 | hsl(11 100% 88%) |
| `tomato/6` | #fdbdaf | hsl(11 95% 84%) |
| `tomato/7` | #f5a898 | hsl(10 82% 78%) |
| `tomato/8` | #ec8e7b | hsl(10 75% 70%) |
| `tomato/9` | #e54d2e | hsl(10 78% 54%) |
| `tomato/10` | #dd4425 | hsl(10 73% 51%) |
| `tomato/11` | #d13415 | hsl(10 82% 45%) |
| `tomato/12` | #5c271f | hsl(8 50% 24%) |

### `violet`

| Token | Hex | HSL |
|---|---|---|
| `violet/1` | #fdfcfe | hsl(270 50% 99%) |
| `violet/2` | #faf8ff | hsl(257 100% 99%) |
| `violet/3` | #f4f0fe | hsl(257 88% 97%) |
| `violet/4` | #ebe4ff | hsl(256 100% 95%) |
| `violet/5` | #e1d9ff | hsl(253 100% 93%) |
| `violet/6` | #d4cafe | hsl(252 96% 89%) |
| `violet/7` | #c2b5f5 | hsl(252 76% 84%) |
| `violet/8` | #aa99ec | hsl(252 69% 76%) |
| `violet/9` | #6e56cf | hsl(252 56% 57%) |
| `violet/10` | #654dc4 | hsl(252 50% 54%) |
| `violet/11` | #6550b9 | hsl(252 43% 52%) |
| `violet/12` | #2f265f | hsl(249 43% 26%) |

### `white`

| Token | Hex | HSL |
|---|---|---|
| `white/1` | #ffffff | hsl(0 0% 100%) |
| `white/2` | #ffffff | hsl(0 0% 100%) |
| `white/3` | #ffffff | hsl(0 0% 100%) |
| `white/4` | #ffffff | hsl(0 0% 100%) |
| `white/5` | #ffffff | hsl(0 0% 100%) |
| `white/6` | #ffffff | hsl(0 0% 100%) |
| `white/7` | #ffffff | hsl(0 0% 100%) |
| `white/8` | #ffffff | hsl(0 0% 100%) |
| `white/9` | #ffffff | hsl(0 0% 100%) |
| `white/10` | #ffffff | hsl(0 0% 100%) |
| `white/11` | #ffffff | hsl(0 0% 100%) |
| `white/12` | #ffffff | hsl(0 0% 100%) |

### `yellow`

| Token | Hex | HSL |
|---|---|---|
| `yellow/1` | #fdfdf9 | hsl(60 50% 98%) |
| `yellow/2` | #fefce9 | hsl(54 91% 95%) |
| `yellow/3` | #fffab8 | hsl(56 100% 86%) |
| `yellow/4` | #fff394 | hsl(53 100% 79%) |
| `yellow/5` | #ffe770 | hsl(50 100% 72%) |
| `yellow/6` | #f3d768 | hsl(48 85% 68%) |
| `yellow/7` | #e4c767 | hsl(46 70% 65%) |
| `yellow/8` | #d5ae39 | hsl(45 65% 53%) |
| `yellow/9` | #ffe629 | hsl(53 100% 58%) |
| `yellow/10` | #ffdc00 | hsl(52 100% 50%) |
| `yellow/11` | #9e6c00 | hsl(41 100% 31%) |
| `yellow/12` | #473b1f | hsl(42 39% 20%) |

---

## 13. Layout & Grid


### Container

```tsx
<main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

### Breakpoints (Tailwind v4 defaults)

| Name | Width | Use case |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop small |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Wide desktop |

### Grid Patterns

```tsx
// 12-column grid
<div className="grid grid-cols-12 gap-6">

// Responsive 3-column card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Sidebar + Content
<div className="flex min-h-screen">
  <aside className="w-64 shrink-0">...</aside>
  <main className="flex-1 min-w-0">...</main>
</div>
```

---

## 14. Shadow & Elevation


```
shadow-sm   — subtle lift (input, inactive card)
shadow      — default elevation (card, dropdown)
shadow-md   — modal, popover
shadow-lg   — dialog, sidebar flyout
shadow-xl   — high-priority overlay
```

---

## 15. Component Usage Rules


### Button

| Variant | When to use | Don't use when |
|---|---|---|
| `default` | Primary CTA on the page | More than 1 per view |
| `secondary` | Secondary action | For destructive action |
| `outline` | Tertiary action, toolbar | Inside a card with a colored background |
| `ghost` | Nav item, icon button | As primary CTA |
| `destructive` | Delete, confirm deletion | Any action that is not a deletion |
| `link` | Link that looks like text | Clear affordance is needed |

**Rule:** Per 1 section → only 1 `default` button

### Form Components

```
Input     — single-line text
Textarea  — multi-line text (always use resize-none)
Select    — list with a known number of options
Combobox  — searchable list / dynamic
Checkbox  — multi-select
RadioGroup — single select from all visible options
Switch    — toggle ON/OFF immediately (no submit required)
Slider    — numeric range
```

**Rule:** Every input must have a `<Label>` and `<FormMessage>` (error state)

### Feedback

```
Toast / Sonner — transient notification ≤ 5 seconds
Alert         — inline persistent message (info/warning/error/success)
Dialog        — requires user action before proceeding
AlertDialog   — destructive confirmation only
Tooltip       — short hint ≤ 10 words, do not put important information here
```

### Layout

```
Card    — grouping related content, do not nest Card inside Card
Sheet   — panel from edge, secondary content, filter panel
Drawer  — mobile-first overlay (bottom/side)
Tabs    — switch content within a single section (≤ 7 tabs)
Accordion — FAQ, collapse optional content
Sidebar — primary app navigation
```

---

## 16. Dark Mode Setup


### Next.js App Router

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme Toggle Button

```tsx
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

---

## 17. Animation Guidelines


```css
/* Use tw-animate-css (Tailwind v4 replacement for tailwindcss-animate) */
/* pnpm add tw-animate-css */
/* globals.css: @import "tw-animate-css"; */
```

| Context | Animation |
|---|---|
| Modal/Dialog open | `animate-in fade-in-0 zoom-in-95` |
| Modal/Dialog close | `animate-out fade-out-0 zoom-out-95` |
| Sheet from right | `slide-in-from-right` |
| Tooltip | `animate-in fade-in-0 zoom-in-95` |
| Toast | `slide-in-from-bottom-full` |
| Skeleton | `animate-pulse` |
| Spinner | `animate-spin` |

**Rule:** Do not use animations that take > 300ms for UI feedback

---

## 18. File Structure Convention


```
src/
├── app/
│   ├── layout.tsx          # ThemeProvider, fonts
│   ├── globals.css         # CSS variables, @theme inline
│   └── page.tsx
├── components/
│   ├── ui/                 # shadcn components (auto-generated)
│   ├── theme-provider.tsx  # next-themes wrapper
│   └── [feature]/          # custom composed components
└── lib/
    └── utils.ts            # cn() helper
```

**Rule:** Do not edit files in `components/ui/` directly — wrap in a new component in `components/[feature]/`
