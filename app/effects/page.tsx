import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata = { title: "Effects — Docs Design" }

// Tailwind v4 shadow scale (the new-york preset uses shadow-xs by default).
const shadows = [
  { cls: "shadow-2xs", label: "shadow-2xs", use: "hairline lift" },
  { cls: "shadow-xs", label: "shadow-xs", use: "input, button" },
  { cls: "shadow-sm", label: "shadow-sm", use: "card, inactive" },
  { cls: "shadow-md", label: "shadow-md", use: "dropdown, popover" },
  { cls: "shadow-lg", label: "shadow-lg", use: "dialog, flyout" },
  { cls: "shadow-xl", label: "shadow-xl", use: "high overlay" },
  { cls: "shadow-2xl", label: "shadow-2xl", use: "max elevation" },
]

// DESIGN.md §5 — radius scale. The project's --radius base is 0.5rem (8px = rounded-lg).
const radii = [
  { cls: "rounded-none", value: "0" },
  { cls: "rounded-xs", value: "2px" },
  { cls: "rounded-sm", value: "4px" },
  { cls: "rounded-md", value: "6px" },
  { cls: "rounded-lg", value: "8px" },
  { cls: "rounded-xl", value: "12px" },
  { cls: "rounded-2xl", value: "16px" },
  { cls: "rounded-3xl", value: "24px" },
  { cls: "rounded-full", value: "9999px" },
]

// DESIGN.md §7 — border width.
const borders = [
  { cls: "border-0", value: "0" },
  { cls: "border", value: "1px" },
  { cls: "border-2", value: "2px" },
  { cls: "border-4", value: "4px" },
  { cls: "border-8", value: "8px" },
]

// DESIGN.md §10 — opacity scale (representative steps). Classes are listed as
// literals so Tailwind's scanner generates them.
const opacities = [
  { cls: "opacity-0", value: "0%" },
  { cls: "opacity-5", value: "5%" },
  { cls: "opacity-10", value: "10%" },
  { cls: "opacity-25", value: "25%" },
  { cls: "opacity-50", value: "50%" },
  { cls: "opacity-75", value: "75%" },
  { cls: "opacity-90", value: "90%" },
  { cls: "opacity-100", value: "100%" },
]

export default function EffectsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Design Tokens</p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Effects</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Elevation, corner radius, border width, and opacity — the finishing tokens that give
          surfaces depth and shape.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="secondary">Tailwind v4</Badge>
          <Badge variant="outline">Shadow / Radius / Border / Opacity</Badge>
        </div>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Box Shadows</h2>
          <p className="text-sm text-muted-foreground">Elevation from a hairline lift to a max overlay.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shadows.map((s) => (
            <div key={s.cls} className="flex flex-col items-center gap-3 rounded-lg bg-muted/40 p-6">
              <div className={cn("size-16 rounded-lg border bg-card", s.cls)} />
              <div className="text-center">
                <code className="font-mono text-xs font-medium">{s.label}</code>
                <p className="text-[11px] text-muted-foreground">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Border Radius</h2>
          <p className="text-sm text-muted-foreground">
            Base <code className="font-mono">--radius</code> is 0.5rem; the scale derives from it.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {radii.map((r) => (
            <div key={r.cls} className="flex flex-col items-center gap-3">
              <div className={cn("size-16 border-2 border-primary bg-primary/10", r.cls)} />
              <div className="text-center">
                <code className="font-mono text-xs font-medium">{r.cls}</code>
                <p className="text-[11px] text-muted-foreground">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Border Width</h2>
          <p className="text-sm text-muted-foreground">Token border weights.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {borders.map((b) => (
            <div key={b.cls} className="flex flex-col items-center gap-3">
              <div className={cn("size-16 rounded-md border-border bg-card", b.cls)} />
              <div className="text-center">
                <code className="font-mono text-xs font-medium">{b.cls}</code>
                <p className="text-[11px] text-muted-foreground">{b.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Opacity</h2>
          <p className="text-sm text-muted-foreground">Applied to a solid primary fill.</p>
        </div>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {opacities.map((o) => (
            <div key={o.cls} className="flex flex-col items-center gap-2">
              <div className="rounded-md border bg-foreground p-1">
                <div className={cn("size-12 rounded-sm bg-primary", o.cls)} />
              </div>
              <code className="font-mono text-[11px] font-medium">{o.value}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
