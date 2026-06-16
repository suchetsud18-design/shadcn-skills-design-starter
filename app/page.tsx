import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { componentDocs } from "@/lib/docs"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureHighlights } from "@/components/landing/feature-highlights"
import { ComponentShowcase } from "@/components/landing/component-showcase"
import { StatsSection } from "@/components/landing/stats-section"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function Home() {
  return (
    <div className="space-y-24">
      <HeroSection />

      <Separator />

      <FeatureHighlights />

      <ComponentShowcase />

      <Separator />

      <StatsSection />

      <Separator />

      <section className="space-y-8">
        <AnimateOnScroll animation="fade-up">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">All Components</h2>
            <p className="text-sm text-muted-foreground">
              Browse all {componentDocs.length} documented components
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {componentDocs.map((doc, i) => (
            <AnimateOnScroll key={doc.slug} animation="fade-up" delay={(i % 3) * 75}>
              <Link href={`/components/${doc.slug}`} className="group block">
                <Card className="h-full transition-all hover:border-primary/50 hover:bg-accent/40 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      {doc.title}
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </div>
  )
}
