"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const featured = [
  {
    slug: "button",
    title: "Button",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="outline">Outline</Button>
      </div>
    ),
  },
  {
    slug: "badge",
    title: "Badge",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
    ),
  },
  {
    slug: "switch",
    title: "Switch",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Switch defaultChecked />
          <span className="text-sm">Enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch />
          <span className="text-sm text-muted-foreground">Disabled</span>
        </div>
      </div>
    ),
  },
  {
    slug: "progress",
    title: "Progress",
    preview: (
      <div className="w-full space-y-3">
        <Progress value={75} className="w-full" />
        <Progress value={40} className="w-full" />
      </div>
    ),
  },
  {
    slug: "slider",
    title: "Slider",
    preview: (
      <div className="w-full space-y-4">
        <Slider defaultValue={[60]} max={100} step={1} />
        <Slider defaultValue={[25, 75]} max={100} step={1} />
      </div>
    ),
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox id="c1" defaultChecked />
          <label htmlFor="c1" className="text-sm">Accept terms</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c2" />
          <label htmlFor="c2" className="text-sm">Newsletter</label>
        </div>
      </div>
    ),
  },
]

export function ComponentShowcase() {
  return (
    <section className="space-y-8">
      <AnimateOnScroll animation="fade-up">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Component Showcase</h2>
            <p className="text-sm text-muted-foreground">A selection of what&apos;s inside</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/components/button">
              View all <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>
      </AnimateOnScroll>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {featured.map((item) => (
            <CarouselItem key={item.slug} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <Link href={`/components/${item.slug}`} className="group block">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm">
                      {item.title}
                      <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex min-h-[120px] items-center justify-center rounded-b-lg bg-muted/30 p-6">
                    {item.preview}
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden sm:flex" />
        <CarouselNext className="-right-4 hidden sm:flex" />
      </Carousel>
    </section>
  )
}
