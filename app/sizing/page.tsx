import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Sizing & Layout — Docs Design" }

// DESIGN.md §8 — Height.
const heights = [
  ["h-0", 0], ["h-px", 1], ["h-0.5", 2], ["h-1", 4], ["h-2", 8], ["h-2.5", 10],
  ["h-3", 12], ["h-3.5", 14], ["h-4", 16], ["h-5", 20], ["h-6", 24], ["h-7", 28],
  ["h-8", 32], ["h-9", 36], ["h-10", 40], ["h-12", 48], ["h-14", 56], ["h-16", 64],
  ["h-18", 72], ["h-20", 80], ["h-24", 96], ["h-48", 192], ["h-72", 288], ["h-96", 384],
] as const

// DESIGN.md §8 — Max Width (same scale applies to Max Height).
const maxWidths = [
  ["max-w-0", 0], ["max-w-px", 1], ["max-w-0.5", 2], ["max-w-1", 4], ["max-w-2", 8],
  ["max-w-3", 12], ["max-w-4", 16], ["max-w-6", 24], ["max-w-8", 32], ["max-w-10", 40],
  ["max-w-12", 48], ["max-w-16", 64], ["max-w-20", 80], ["max-w-24", 96], ["max-w-32", 128],
  ["max-w-40", 160], ["max-w-48", 192], ["max-w-56", 224], ["max-w-64", 256], ["max-w-72", 288],
  ["max-w-80", 320], ["max-w-96", 384],
] as const

// DESIGN.md §9 — Stroke Width.
const strokes = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3]

// DESIGN.md §13 — Breakpoints (Tailwind v4 defaults).
const breakpoints = [
  ["sm", "640px", "Mobile landscape"],
  ["md", "768px", "Tablet"],
  ["lg", "1024px", "Desktop small"],
  ["xl", "1280px", "Desktop"],
  ["2xl", "1536px", "Wide desktop"],
] as const

// DESIGN.md §4 — Base numeric alias source (representative subset of 87).
const baseNumeric = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96]

function ChipGrid({ items }: { items: readonly (readonly [string, number])[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(([cls, px]) => (
        <div
          key={cls}
          className="flex items-center justify-between gap-2 rounded-md border bg-card px-3 py-2"
        >
          <code className="font-mono text-xs">{cls}</code>
          <span className="font-mono text-[11px] text-muted-foreground">{px}px</span>
        </div>
      ))}
    </div>
  )
}

export default function SizingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Design Tokens</p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Sizing &amp; Layout</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The remaining scales — height, max-width/height, stroke width, breakpoints, and the
          base numeric source that feeds them.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="secondary">Size</Badge>
          <Badge variant="secondary">Stroke</Badge>
          <Badge variant="outline">Breakpoints</Badge>
        </div>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Height</h2>
          <p className="text-sm text-muted-foreground">
            <code className="font-mono">h-*</code> · the same scale powers <code className="font-mono">w-*</code>.
          </p>
        </div>
        <ChipGrid items={heights} />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Max Width &amp; Max Height</h2>
          <p className="text-sm text-muted-foreground">
            <code className="font-mono">max-w-*</code> / <code className="font-mono">max-h-*</code> share one scale.
          </p>
        </div>
        <ChipGrid items={maxWidths} />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Stroke Width</h2>
          <p className="text-sm text-muted-foreground">Icon and divider line weights (px).</p>
        </div>
        <div className="space-y-3 rounded-lg border bg-card p-5">
          {strokes.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <code className="w-16 shrink-0 font-mono text-xs text-muted-foreground">{s}px</code>
              <div className="flex-1 border-t border-foreground" style={{ borderTopWidth: `${s}px` }} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Breakpoints</h2>
          <p className="text-sm text-muted-foreground">Tailwind v4 defaults.</p>
        </div>
        <div className="divide-y rounded-lg border bg-card">
          {breakpoints.map(([name, width, use]) => (
            <div key={name} className="flex items-center justify-between gap-4 px-4 py-3">
              <code className="font-mono text-sm font-medium">{name}</code>
              <span className="font-mono text-xs text-muted-foreground">{width}</span>
              <span className="flex-1 text-right text-sm text-muted-foreground">{use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Base Numeric</h2>
          <p className="text-sm text-muted-foreground">
            The alias source (87 values) other collections reference. Representative steps:
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {baseNumeric.map((n) => (
            <code key={n} className="rounded-md border bg-muted px-2.5 py-1 font-mono text-xs">
              {n}
            </code>
          ))}
        </div>
      </section>
    </div>
  )
}
