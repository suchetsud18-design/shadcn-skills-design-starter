import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { componentDocs, intro } from "@/lib/docs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge variant="secondary">shadcn/ui · Tailwind v4</Badge>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {intro.title}
        </h1>
        <p className="max-w-2xl text-xl text-muted-foreground">{intro.description}</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Getting Started</h2>
        <p className="leading-7 text-muted-foreground">
          Pick a component from the sidebar, or browse the {componentDocs.length} documented
          components below. Toggle between the <strong>Brand</strong> and{" "}
          <strong>Neutral</strong> themes — and light / dark — from the top-right controls. See the{" "}
          <Link href="/tokens" className="font-medium text-foreground underline underline-offset-4">
            Colors
          </Link>{" "}
          page for the design tokens behind it all.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {componentDocs.map((doc) => (
          <Link key={doc.slug} href={`/components/${doc.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {doc.title}
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </CardTitle>
                <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
