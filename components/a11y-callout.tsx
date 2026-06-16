import { Shield } from "lucide-react"

export function A11yCallout({ note }: { note: string }) {
  return (
    <aside className="my-2 flex gap-4 rounded-r-xl border-l-4 border-primary bg-primary/5 p-6">
      <Shield className="mt-0.5 size-5 shrink-0 text-primary" />
      <div className="space-y-1">
        <p className="text-sm font-medium text-primary">Accessibility</p>
        <p className="text-sm leading-relaxed text-foreground">{note}</p>
      </div>
    </aside>
  )
}
