---
name: shadcn-ui-design
description: Build UI components and layouts with shadcn/ui + Tailwind CSS v4 on Next.js App Router. Use when creating, styling, or reviewing React/Next.js interfaces — adding shadcn components, applying design tokens, spacing, typography, or keeping work consistent with the project design system. Tokens and component standards live in references/DESIGN.md.
---

# SKILL: Build UI with shadcn/ui + Tailwind CSS v4
> Guide for Claude to build UI components and layouts
> Stack: Next.js App Router + shadcn/ui + Tailwind CSS v4
>
> **Source of truth:** [`DESIGN.md`](./references/DESIGN.md) — tokens, spacing, typography, component rules all live there
> SKILL.md = how to do it | DESIGN.md = standards to follow

---

## 0. Before You Start

Before building any UI, answer these 3 questions:

1. **Does the component already exist in shadcn?** → If yes, use it — don't build from scratch
2. **Does it need interactivity?** → If no, use a Server Component; if yes, add `"use client"`
3. **Are colors and spacing using the correct tokens?** → Never hardcode colors outside the design system

---

## 1. Project Setup

### Install shadcn/ui (Next.js + Tailwind v4)
```bash
# 1. Create Next.js project
pnpm create next-app@latest my-app --typescript --tailwind --app

# 2. Init shadcn
pnpm dlx shadcn@latest init

# 3. Choose style: new-york (recommended), base color: Neutral
# 4. Choose CSS variables: yes

# 5. Add the components you need
pnpm dlx shadcn@latest add button card input label
```

### components.json (config)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Required packages
```bash
pnpm add next-themes          # dark mode
pnpm add tw-animate-css        # animation (Tailwind v4)
pnpm add lucide-react          # icons
pnpm add class-variance-authority clsx tailwind-merge  # utilities
```

### Font Setup (per DESIGN.md §3 — font/family/sans: Inter, font/family/mono: Geist Mono)
```tsx
// app/layout.tsx
import { Inter } from "next/font/google"
import { Geist_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
```

---

## 2. CLI Quick Reference

```bash
# Add single component
pnpm dlx shadcn@latest add [component]

# Add multiple at once
pnpm dlx shadcn@latest add button card input dialog

# Add all components
pnpm dlx shadcn@latest add --all

# Preview component before installing
pnpm dlx shadcn@latest view button

# Check project config
pnpm dlx shadcn@latest info

# Search components
pnpm dlx shadcn@latest search table
```

---

## 3. Essential Patterns

### 3.1 cn() utility — always use for class merging
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// Usage
<div className={cn("base-classes", conditional && "extra-class", className)}>
```

### 3.2 Button — every variant
```tsx
import { Button } from "@/components/ui/button"

// Primary CTA
<Button>Save</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Outline
<Button variant="outline">View more</Button>

// Ghost (nav, icon)
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Saving...
</Button>

// As Link (use asChild)
import Link from "next/link"
<Button asChild>
  <Link href="/dashboard">Go to dashboard</Link>
</Button>
```

### 3.3 Card — primary layout
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Short description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

### 3.4 Form — standard pattern
```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email("Invalid email format"),
})

export function ExampleForm() {
  const form = useForm({ resolver: zodResolver(schema) })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormDescription>Email used for signing in</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### 3.5 Dialog — confirmation / form modal
```tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>Description of what will happen</DialogDescription>
    </DialogHeader>
    {/* content */}
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 3.6 Toast (Sonner) — notification
```bash
pnpm dlx shadcn@latest add sonner
```

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"
<Toaster />

// Use anywhere
import { toast } from "sonner"

toast("Saved successfully")
toast.success("Operation completed")
toast.error("An error occurred")
toast.warning("Please review the information")
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Saved successfully",
  error: "An error occurred",
})
```

### 3.7 Data Table — table
```bash
pnpm dlx shadcn@latest add table
pnpm add @tanstack/react-table
```

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell className="font-medium">{row.name}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell className="text-right">{row.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### 3.8 Badge — status label
```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="outline">Draft</Badge>
<Badge variant="destructive">Rejected</Badge>
```

### 3.9 Skeleton — loading state
```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Card skeleton
<div className="space-y-3">
  <Skeleton className="h-[200px] w-full rounded-lg" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

### 3.10 Sheet — side panel
```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Panel</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    {/* content */}
  </SheetContent>
</Sheet>
```

---

## 4. Layout Patterns

### 4.1 App Shell (Sidebar + Content)
```tsx
// app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
```

### 4.2 Page Header Pattern
```tsx
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-semibold tracking-tight">Page Title</h1>
    <p className="text-sm text-muted-foreground">Description of this page</p>
  </div>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Add new
  </Button>
</div>
```

### 4.3 Card Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle className="text-base">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* ... */}
      </CardContent>
    </Card>
  ))}
</div>
```

### 4.4 Stats Cards
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((stat) => (
    <Card key={stat.label}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.label}
        </CardTitle>
        <stat.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">{stat.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### 4.5 Empty State
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="rounded-full bg-muted p-4 mb-4">
    <InboxIcon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-1">No data yet</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Get started by adding your first item
  </p>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Add item
  </Button>
</div>
```

---

## 5. Color Usage Cheatsheet
> All tokens reference DESIGN.md §2 (Shadcn/ui Semantic Tokens — 35 variables)

```tsx
// Backgrounds
className="bg-background"                  // app background
className="bg-card"                        // card, panel, elevated surface
className="bg-popover"                     // dropdown, popover, tooltip container
className="bg-muted"                       // subtle section, code block, disabled area
className="bg-primary"                     // CTA fill
className="bg-secondary"                   // chip, tag fill, secondary action
className="bg-accent"                      // hover highlight, selected item
className="bg-destructive"                 // danger fill
className="bg-sidebar"                     // sidebar background
className="bg-sidebar-accent"              // sidebar hover / selected item
className="bg-semantic-background"         // stone-toned overlay badge

// Text
className="text-foreground"               // primary text
className="text-muted-foreground"         // label, helper, caption, placeholder
className="text-primary-foreground"       // text on bg-primary
className="text-secondary-foreground"     // text on bg-secondary
className="text-accent-foreground"        // text on bg-accent
className="text-sidebar-foreground"       // text in sidebar
className="text-destructive"              // inline error text
className="text-semantic-foreground"      // text on semantic-background

// Borders
className="border-border"                 // general borders
className="border-input"                  // input border
className="border-sidebar-border"         // sidebar separator
className="border-semantic-border"        // stone-toned semantic border
className="ring-ring"                     // focus ring
className="ring-sidebar-ring"             // focus ring in sidebar

// Overlay / Scrim
style={{ backgroundColor: "var(--background-color)" }}  // modal backdrop (30% black)

// Don't use
className="text-neutral-500"              // ❌ raw palette — use text-muted-foreground instead
className="bg-neutral-100"               // ❌ raw palette — use bg-muted or bg-secondary instead
className="border-neutral-200"           // ❌ raw palette — use border-border instead
className="text-red-600"                 // ❌ raw palette — use text-destructive instead
```

---

## 6. Accessibility Rules

- Every `<Button>` with only an icon must have `aria-label`
- Every `<Input>` must have a `<Label>` linked with `htmlFor`
- Every `<img>` must have an `alt` attribute
- Dialog must always have `DialogTitle` (can be hidden with `VisuallyHidden`)
- Use `role="status"` for loading/skeleton states
- Focus order must follow a logical DOM order

```tsx
// Icon-only button
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="h-4 w-4" />
</Button>

// Dialog title (hidden)
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
<DialogTitle asChild>
  <VisuallyHidden>Dialog title for screen readers</VisuallyHidden>
</DialogTitle>
```

---

## 7. Do's and Don'ts

### DO ✓
- Always use semantic tokens (`bg-muted`, `text-foreground`)
- Use `asChild` when rendering another element to look like that component
- Use `cn()` every time you conditionally combine classNames
- Use `next/font` for custom fonts
- Test dark mode on every component before committing
- Use `<Skeleton>` during loading instead of blank space

### DON'T ✗
- ❌ Hardcode raw palette colors (`text-neutral-500`, `bg-neutral-100`) — use semantic tokens instead
- ❌ Edit files in `components/ui/` directly — wrap in a new component
- ❌ Use inline styles for color/spacing
- ❌ Forget `"use client"` in components that use hooks/event handlers
- ❌ Use `<a>` instead of `<Link>` for internal navigation
- ❌ Nest interactive elements (button inside button)
- ❌ Use the old `toast` component — use `sonner` instead
- ❌ Use `Sarabun` or any font not in the token file — use only `Inter` (sans) and `Geist Mono` (mono)

---

## 8. Component Install List (by feature)

```bash
# Navigation
pnpm dlx shadcn@latest add navigation-menu breadcrumb sidebar

# Forms
pnpm dlx shadcn@latest add form input textarea select checkbox radio-group switch slider label

# Data display
pnpm dlx shadcn@latest add table badge avatar skeleton progress chart

# Overlays
pnpm dlx shadcn@latest add dialog alert-dialog sheet drawer popover tooltip hover-card

# Feedback
pnpm dlx shadcn@latest add sonner alert

# Layout
pnpm dlx shadcn@latest add card separator tabs accordion collapsible scroll-area

# Interactive
pnpm dlx shadcn@latest add button dropdown-menu context-menu menubar toggle
```

---

## 9. TypeScript Props Pattern

```tsx
import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

// Extend shadcn component
interface CustomCardProps extends ComponentPropsWithoutRef<typeof Card> {
  highlighted?: boolean
}

export function CustomCard({ highlighted, className, children, ...props }: CustomCardProps) {
  return (
    <Card
      className={cn(highlighted && "border-primary ring-1 ring-primary", className)}
      {...props}
    >
      {children}
    </Card>
  )
}
```

---

## 10. Quick Component Reference

| Need | Component | Install |
|---|---|---|
| Button | `Button` | `add button` |
| Input text | `Input` | `add input` |
| Dropdown list | `Select` | `add select` |
| Search + filter | `Combobox` | `add combobox` |
| Date picker | `Calendar` + `Popover` | `add calendar popover` |
| Table | `Table` | `add table` |
| Modal | `Dialog` | `add dialog` |
| Side panel | `Sheet` | `add sheet` |
| Notification | `Sonner` | `add sonner` |
| Status tag | `Badge` | `add badge` |
| Loading | `Skeleton` | `add skeleton` |
| Loading (spinner) | `Spinner` | `add spinner` |
| User photo | `Avatar` | `add avatar` |
| Top navigation | `NavigationMenu` | `add navigation-menu` |
| Side navigation | `Sidebar` | `add sidebar` |
| Tabs | `Tabs` | `add tabs` |
| Collapsible section | `Accordion` | `add accordion` |
| Confirm delete | `AlertDialog` | `add alert-dialog` |
| Inline message | `Alert` | `add alert` |
| Hover hint | `Tooltip` | `add tooltip` |
| Context menu | `ContextMenu` | `add context-menu` |
| Data chart | `Chart` | `add chart` |
| OTP input | `InputOTP` | `add input-otp` |
| Progress bar | `Progress` | `add progress` |
| Resizable pane | `Resizable` | `add resizable` |

---

## 11. Next.js: Server vs Client Components

### Default rule

**Always start as a Server Component. Add `"use client"` only when the component needs one of these:**

| Trigger | Example |
|---|---|
| Browser APIs | `window`, `document`, `localStorage`, `navigator` |
| Event handlers | `onClick`, `onChange`, `onSubmit`, `onKeyDown` |
| React hooks | `useState`, `useEffect`, `useRef`, `useContext`, `useReducer` |
| Client libraries | `useTheme`, `useRouter` (client), `motion` (framer), charts |
| Real-time / subscriptions | WebSocket, EventSource |

### Capability comparison

| Capability | Server Component | Client Component |
|---|---|---|
| `async/await` at component level | ✅ | ❌ |
| `fetch()` with direct DB/API access | ✅ | ❌ |
| Access `cookies()`, `headers()` | ✅ | ❌ |
| `useState` / `useEffect` | ❌ | ✅ |
| Event handlers (`onClick` etc.) | ❌ | ✅ |
| Browser APIs | ❌ | ✅ |
| Reduced JS bundle sent to client | ✅ | ❌ |
| Can import Server Components as children | ✅ | ✅ (via `children` prop only) |

### Boundary pattern — push `"use client"` as deep as possible

```
app/
└── page.tsx                  ← Server Component (fetch data here)
    └── <ProductList />       ← Server Component (renders list)
        └── <AddToCart />     ← "use client" (needs onClick + useState)
```

Keep the interactive island small. Don't bubble `"use client"` up to the page.

### Pattern 1 — Server Component with data fetch

```tsx
// app/products/page.tsx  — NO "use client"
import { ProductCard } from "@/components/product-card"

export default async function ProductsPage() {
  const products = await fetch("https://api.example.com/products").then(r => r.json())

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
```

### Pattern 2 — Client Component (interactive island)

```tsx
// components/add-to-cart.tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AddToCart({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false)

  return (
    <Button
      variant={added ? "secondary" : "default"}
      onClick={() => setAdded(true)}
    >
      {added ? "Added" : "Add to cart"}
    </Button>
  )
}
```

### Pattern 3 — Server Component wraps Client island

```tsx
// app/dashboard/page.tsx  — Server Component
import { StatsChart } from "@/components/stats-chart"  // "use client" inside
import { getStats } from "@/lib/data"

export default async function DashboardPage() {
  const stats = await getStats()   // server-side fetch

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <StatsChart data={stats} />  {/* passes serializable data as props */}
    </div>
  )
}
```

### Pattern 4 — Passing server-fetched data as props to Client Component

```tsx
// components/stats-chart.tsx
"use client"
import { Bar, BarChart } from "recharts"

// Receives plain serializable data — no async, no fetch
export function StatsChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <Bar dataKey="value" fill="var(--chart-1)" />
    </BarChart>
  )
}
```

### Common mistakes

```tsx
// ❌ Unnecessary "use client" on a layout — kills Server Component benefits for the entire subtree
"use client"
export default function Layout({ children }) { ... }

// ✅ Layout should almost never have "use client"
export default function Layout({ children }) { ... }
```

```tsx
// ❌ useEffect to fetch data — this should be a Server Component
"use client"
export default function Page() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch("/api/data").then(r => r.json()).then(setData)
  }, [])
  ...
}

// ✅ Async Server Component — simpler, no loading flicker, no client JS
export default async function Page() {
  const data = await fetch("/api/data").then(r => r.json())
  return <DataView data={data} />
}
```

```tsx
// ❌ Importing a Server Component into a Client Component directly
"use client"
import { ServerOnlyWidget } from "./server-widget"  // breaks — ServerOnlyWidget loses server context

// ✅ Pass Server Component as children instead
"use client"
export function ClientShell({ children }) {
  return <div onClick={...}>{children}</div>
}

// In the Server Component parent:
<ClientShell>
  <ServerOnlyWidget />  {/* stays a Server Component */}
</ClientShell>
```
