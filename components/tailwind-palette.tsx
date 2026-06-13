import { tailwindPalette } from "@/lib/tailwind-palette"
import { cn } from "@/lib/utils"

// Static reference palette (DESIGN.md §11). Theme-independent, so this is a
// Server Component — the swatch fill is the documented hex value itself, mirroring
// how the semantic ColorTokens swatches render their token value.
export function TailwindPalette({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Tailwind Palette</h2>
        <p className="text-sm text-muted-foreground">
          The full {tailwindPalette.reduce((n, f) => n + f.swatches.length, 0)}-swatch reference
          ramp (50–950) available as <code className="font-mono">bg-*</code> /{" "}
          <code className="font-mono">text-*</code> utilities. Fixed values — they do not change
          with the theme.
        </p>
      </div>

      <div className="space-y-5">
        {tailwindPalette.map((family) => (
          <div key={family.name} className="space-y-1.5">
            <h3 className="text-sm font-medium capitalize">{family.name}</h3>
            <div className="flex gap-1">
              {family.swatches.map((s) => {
                const cls = family.name === "misc" ? `bg-${s.step}` : `bg-${family.name}-${s.step}`
                return (
                  <div
                    key={s.step}
                    className="min-w-0 flex-1"
                    title={`${cls} · ${s.hex}`}
                  >
                    <div
                      className="h-12 rounded-sm border"
                      style={{ backgroundColor: s.hex }}
                    />
                    <div className="mt-1 truncate text-center text-[10px] leading-tight text-muted-foreground">
                      {s.step}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
