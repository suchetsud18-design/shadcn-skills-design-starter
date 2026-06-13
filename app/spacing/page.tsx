import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Spacing — Docs Design" }

// 4px base scale (Tailwind v4 default --spacing: 0.25rem). Representative steps
// from DESIGN.md §6. `px` is the rendered value used for the live preview bar.
const spaceScale = [
  { step: "0", px: 0 },
  { step: "0.5", px: 2 },
  { step: "1", px: 4 },
  { step: "1.5", px: 6 },
  { step: "2", px: 8 },
  { step: "2.5", px: 10 },
  { step: "3", px: 12 },
  { step: "4", px: 16 },
  { step: "5", px: 20 },
  { step: "6", px: 24 },
  { step: "8", px: 32 },
  { step: "10", px: 40 },
  { step: "12", px: 48 },
  { step: "16", px: 64 },
  { step: "20", px: 80 },
  { step: "24", px: 96 },
  { step: "32", px: 128 },
]

// Component spacing convention — DESIGN.md §6.
const paddingPresets = [
  { name: "Card / Panel", cls: "p-6", value: "24px" },
  { name: "Dialog", cls: "p-6", value: "24px" },
  { name: "Form group", cls: "space-y-4", value: "16px" },
  { name: "Button (default)", cls: "px-4 py-2", value: "16 / 8px" },
  { name: "Button (sm)", cls: "px-3 py-1.5", value: "12 / 6px" },
  { name: "Button (lg)", cls: "px-8 py-2", value: "32 / 8px" },
  { name: "Input", cls: "px-3 py-2", value: "12 / 8px" },
]

export default function SpacingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Design Tokens</p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Spacing</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A single 4px base scale drives every padding, margin, and gap. Multiply the step by
          4 to get pixels (e.g. <code className="font-mono text-base">p-6</code> = 24px).
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="secondary">4px base</Badge>
          <Badge variant="outline">rem</Badge>
        </div>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Space Scale</h2>
          <p className="text-sm text-muted-foreground">
            Used by <code className="font-mono">p-*</code>, <code className="font-mono">m-*</code>
            , <code className="font-mono">gap-*</code>, and <code className="font-mono">space-*</code>.
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border bg-card p-4">
          <div className="space-y-2.5">
            {spaceScale.map((s) => (
              <div key={s.step} className="flex items-center gap-4">
                <code className="w-10 shrink-0 font-mono text-sm font-medium">{s.step}</code>
                <div
                  className="h-4 shrink-0 rounded-sm bg-primary"
                  style={{ width: `${s.px}px` }}
                />
                <span className="font-mono text-xs text-muted-foreground">
                  {s.px}px · {(s.px / 16).toFixed(3).replace(/\.?0+$/, "")}rem
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Component Padding Presets</h2>
          <p className="text-sm text-muted-foreground">
            The spacing conventions every composed component follows.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paddingPresets.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between gap-3 rounded-lg border bg-card p-4"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{p.value}</p>
              </div>
              <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                {p.cls}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
