import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { FloatingPreviews } from "./floating-previews"

export function HeroSection() {
  return (
    <section className="relative min-h-[420px] overflow-visible py-8 lg:py-16">
      <AnimateOnScroll animation="fade-up">
        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge variant="secondary" className="text-xs tracking-wide">
            shadcn/ui + Tailwind v4
          </Badge>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
            Design System
            <span className="block text-primary">Documentation</span>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Every component, token, and pattern — themed, accessible, and ready for production.
            Browse 55+ components across 4 theme combinations.
          </p>
          <div className="flex gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/components/button">
                Browse Components <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/tokens">View Tokens</Link>
            </Button>
          </div>
        </div>
      </AnimateOnScroll>
      <FloatingPreviews />
    </section>
  )
}
