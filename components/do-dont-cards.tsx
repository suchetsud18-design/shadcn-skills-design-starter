import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DoOrDont } from "@/lib/dos-and-donts"

export function DoDontCards({ items }: { items: DoOrDont[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <Card
          key={i}
          className={cn(
            "border-l-4",
            item.type === "do" ? "border-l-chart-3" : "border-l-destructive"
          )}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              {item.type === "do" ? (
                <CheckCircle2 className="size-4 text-chart-3" />
              ) : (
                <XCircle className="size-4 text-destructive" />
              )}
              {item.type === "do" ? "Do" : "Don't"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
