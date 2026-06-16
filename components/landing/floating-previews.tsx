"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

const items = [
  {
    node: <Button size="sm">Save changes</Button>,
    className: "top-8 right-0 rotate-3",
    delay: "delay-0",
  },
  {
    node: <Badge variant="secondary">New</Badge>,
    className: "top-1/3 -right-6 -rotate-2",
    delay: "delay-200",
  },
  {
    node: (
      <div className="flex items-center gap-2 text-sm">
        <Switch defaultChecked />
        <span className="text-muted-foreground">Dark mode</span>
      </div>
    ),
    className: "bottom-1/4 -right-4 rotate-1",
    delay: "delay-300",
  },
  {
    node: <Progress value={65} className="w-28" />,
    className: "bottom-8 right-8 -rotate-1",
    delay: "delay-500",
  },
]

export function FloatingPreviews() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute animate-in fade-in-0 zoom-in-95 duration-700 fill-mode-forwards ${item.delay} ${item.className}`}
          style={{ animationDelay: `${i * 200 + 400}ms` }}
        >
          <div
            className="animate-float rounded-xl border bg-card p-4 shadow-md"
            style={{ animationDelay: `${i * 1.5}s` }}
          >
            {item.node}
          </div>
        </div>
      ))}
    </div>
  )
}
