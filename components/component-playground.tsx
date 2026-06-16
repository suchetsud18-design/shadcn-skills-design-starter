"use client"

import { useReducer } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PlaygroundConfig, PlaygroundControl } from "@/lib/playground-config"

type State = Record<string, unknown>
type Action = { type: "SET_PROP"; key: string; value: unknown } | { type: "RESET"; defaults: State }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PROP":
      return { ...state, [action.key]: action.value }
    case "RESET":
      return action.defaults
  }
}

function getDefaults(config: PlaygroundConfig): State {
  const defaults: State = {}
  for (const c of config.controls) {
    defaults[c.key] = c.defaultValue
  }
  return defaults
}

function generateCode(config: PlaygroundConfig, state: State): string {
  const defaults = getDefaults(config)
  const propEntries = config.controls
    .filter((c) => state[c.key] !== defaults[c.key])
    .map((c) => {
      const v = state[c.key]
      if (c.key === "children") return null
      if (typeof v === "boolean") return v ? c.key : `${c.key}={false}`
      if (typeof v === "number") return `${c.key}={${v}}`
      return `${c.key}="${v}"`
    })
    .filter(Boolean)

  const children = state.children as string | undefined
  const propsStr = propEntries.length > 0 ? ` ${propEntries.join(" ")}` : ""

  if (children) {
    return `<${config.componentName}${propsStr}>${children}</${config.componentName}>`
  }
  return `<${config.componentName}${propsStr} />`
}

function ControlInput({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl
  value: unknown
  onChange: (v: unknown) => void
}) {
  switch (control.type) {
    case "select":
      return (
        <Select value={String(value)} onValueChange={onChange}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {control.options?.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case "boolean":
      return (
        <Switch checked={Boolean(value)} onCheckedChange={onChange} />
      )
    case "number":
      return (
        <div className="flex items-center gap-3">
          <Slider
            value={[Number(value)]}
            onValueChange={([v]) => onChange(v)}
            min={control.min ?? 0}
            max={control.max ?? 100}
            step={control.step ?? 1}
            className="flex-1"
          />
          <span className="w-8 text-right font-mono text-xs text-muted-foreground">
            {String(value)}
          </span>
        </div>
      )
    case "text":
      return (
        <Input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 text-xs"
        />
      )
  }
}

export function ComponentPlayground({
  config,
  children,
}: {
  config: PlaygroundConfig
  children: (props: State) => React.ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, config, (c) => getDefaults(c))

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="flex min-h-[240px] items-center justify-center rounded-xl border bg-card p-10 shadow-sm">
        {children(state)}
      </div>

      <div className="space-y-4 rounded-xl border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Controls
        </p>
        <div className="space-y-4">
          {config.controls.map((control) => (
            <div key={control.key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">{control.label}</Label>
                {control.type === "boolean" && (
                  <ControlInput
                    control={control}
                    value={state[control.key]}
                    onChange={(v) => dispatch({ type: "SET_PROP", key: control.key, value: v })}
                  />
                )}
              </div>
              {control.type !== "boolean" && (
                <ControlInput
                  control={control}
                  value={state[control.key]}
                  onChange={(v) => dispatch({ type: "SET_PROP", key: control.key, value: v })}
                />
              )}
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Code
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted/50 p-3">
            <code className="font-mono text-[11px] leading-relaxed">{generateCode(config, state)}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
