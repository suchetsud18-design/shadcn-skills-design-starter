"use client"

import { ComponentPlayground } from "@/components/component-playground"
import { playgroundConfigs, type PlaygroundConfig } from "@/lib/playground-config"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Bold } from "lucide-react"

type State = Record<string, unknown>

const renderers: Record<string, (props: State) => React.ReactNode> = {
  button: (p) => (
    <Button
      variant={p.variant as "default"}
      size={p.size as "default"}
      disabled={Boolean(p.disabled)}
    >
      {String(p.children ?? "Button")}
    </Button>
  ),
  badge: (p) => (
    <Badge variant={p.variant as "default"}>
      {String(p.children ?? "Badge")}
    </Badge>
  ),
  switch: (p) => (
    <Switch checked={Boolean(p.checked)} disabled={Boolean(p.disabled)} />
  ),
  slider: (p) => (
    <Slider
      defaultValue={[Number(p.defaultValue ?? 50)]}
      max={Number(p.max ?? 100)}
      step={Number(p.step ?? 1)}
      disabled={Boolean(p.disabled)}
      className="w-64"
    />
  ),
  progress: (p) => (
    <Progress value={Number(p.value ?? 60)} className="w-64" />
  ),
  input: (p) => (
    <Input
      type={String(p.type ?? "text")}
      placeholder={String(p.placeholder ?? "")}
      disabled={Boolean(p.disabled)}
      className="w-64"
    />
  ),
  checkbox: (p) => (
    <div className="flex items-center gap-2">
      <Checkbox checked={Boolean(p.checked)} disabled={Boolean(p.disabled)} id="playground-cb" />
      <label htmlFor="playground-cb" className="text-sm">Check me</label>
    </div>
  ),
  toggle: (p) => (
    <Toggle
      variant={p.variant as "default"}
      size={p.size as "default"}
      disabled={Boolean(p.disabled)}
    >
      <Bold className="size-4" />
    </Toggle>
  ),
  textarea: (p) => (
    <Textarea
      placeholder={String(p.placeholder ?? "")}
      disabled={Boolean(p.disabled)}
      className="w-64"
    />
  ),
  separator: (p) => (
    <div className={p.orientation === "vertical" ? "h-20" : "w-64"}>
      <Separator orientation={p.orientation as "horizontal"} />
    </div>
  ),
}

export function SlugPlayground({ slug }: { slug: string }) {
  const config = playgroundConfigs[slug]
  const renderer = renderers[slug]
  if (!config || !renderer) return null

  return (
    <ComponentPlayground config={config}>
      {renderer}
    </ComponentPlayground>
  )
}
