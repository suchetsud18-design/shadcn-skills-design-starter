import { Component, Moon, Palette, Shield } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const features = [
  {
    icon: Palette,
    title: "Design Tokens",
    description: "35 semantic tokens powering every surface, border, and text color — warm brand or clean neutral.",
  },
  {
    icon: Component,
    title: "55+ Components",
    description: "Accessible, composable primitives from shadcn/ui — themed to match your brand out of the box.",
  },
  {
    icon: Moon,
    title: "Theming",
    description: "Brand + Neutral palettes with automatic dark mode. Four combinations, zero manual adjustments.",
  },
  {
    icon: Shield,
    title: "Accessibility",
    description: "WCAG AA keyboard navigation and ARIA patterns built into every component.",
  },
]

export function FeatureHighlights() {
  return (
    <section className="space-y-8">
      <AnimateOnScroll animation="fade-up">
        <h2 className="text-2xl font-semibold tracking-tight">Why this system</h2>
      </AnimateOnScroll>
      <div className="grid gap-5 sm:grid-cols-2">
        {features.map((f, i) => (
          <AnimateOnScroll key={f.title} animation="fade-up" delay={i * 100}>
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
                <CardDescription className="leading-relaxed">{f.description}</CardDescription>
              </CardHeader>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  )
}
