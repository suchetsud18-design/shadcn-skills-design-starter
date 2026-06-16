import { componentDocs } from "@/lib/docs"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const stats = [
  { value: componentDocs.length.toString(), label: "Components" },
  { value: "35", label: "Tokens" },
  { value: "4", label: "Themes" },
  { value: "AA", label: "Accessible" },
]

export function StatsSection() {
  return (
    <section>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s, i) => (
          <AnimateOnScroll key={s.label} animation="fade-up" delay={i * 75}>
            <div className="space-y-1 text-center">
              <p className="text-4xl font-bold tracking-tight text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  )
}
