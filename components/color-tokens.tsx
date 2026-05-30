"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { allColorTokens, colorTokenGroups } from "@/lib/tokens"
import { cn } from "@/lib/utils"

function useLiveTokenValues() {
  const [values, setValues] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement)
      const next: Record<string, string> = {}
      for (const t of allColorTokens) next[t] = cs.getPropertyValue(`--${t}`).trim()
      setValues(next)
    }
    read()
    // Re-read whenever the theme classes on <html> change (dark / theme-neutral).
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  return values
}

function Swatch({ token, value }: { token: string; value: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(`var(--${token})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      onClick={copy}
      className="group flex flex-col gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/50"
      title="Copy var(--token)"
    >
      <div
        className="h-16 w-full rounded-md border"
        style={{ backgroundColor: `var(--${token})` }}
      />
      <div className="space-y-0.5">
        <div className="flex items-center justify-between gap-2">
          <code className="font-mono text-xs font-medium">--{token}</code>
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
        <p className="font-mono text-[11px] leading-tight text-muted-foreground">
          {value || "—"}
        </p>
        <p className="font-mono text-[11px] leading-tight text-muted-foreground/70">
          bg-{token}
        </p>
      </div>
    </button>
  )
}

export function ColorTokens({ className }: { className?: string }) {
  const values = useLiveTokenValues()

  return (
    <div className={cn("space-y-10", className)}>
      {colorTokenGroups.map((group) => (
        <section key={group.name} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{group.name}</h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} value={values[token] ?? ""} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
