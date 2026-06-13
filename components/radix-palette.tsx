import { radixPalette } from "@/lib/radix-palette"
import { cn } from "@/lib/utils"

// Radix reference palette (DESIGN.md §12). These are not wired as Tailwind
// utilities — they document the Figma source palette, so each swatch shows only
// its scale step + hex. Server Component (static, theme-independent).
export function RadixPalette({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Radix Palette</h2>
        <p className="text-sm text-muted-foreground">
          The {radixPalette.reduce((n, f) => n + f.swatches.length, 0)}-swatch Radix reference
          ramp (steps 1–12) from the Figma source. Documentation only — these are fixed values,
          not project utilities.
        </p>
      </div>

      <div className="space-y-5">
        {radixPalette.map((family) => (
          <div key={family.name} className="space-y-1.5">
            <h3 className="text-sm font-medium capitalize">{family.name}</h3>
            <div className="flex gap-1">
              {family.swatches.map((s) => (
                <div
                  key={s.step}
                  className="min-w-0 flex-1"
                  title={`${family.name}/${s.step} · ${s.hex}`}
                >
                  <div className="h-12 rounded-sm border" style={{ backgroundColor: s.hex }} />
                  <div className="mt-1 truncate text-center text-[10px] leading-tight text-muted-foreground">
                    {s.step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
