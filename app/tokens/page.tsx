import { ColorTokens } from "@/components/color-tokens"
import { TailwindPalette } from "@/components/tailwind-palette"
import { RadixPalette } from "@/components/radix-palette"
import { allColorTokens } from "@/lib/tokens"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Color Tokens — Docs Design" }

export default function TokensPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Design Tokens</p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Colors</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The {allColorTokens.length} semantic color tokens that drive the UI. Values are read
          live from CSS variables — toggle the theme (top-right) and the swatches update. Click
          any swatch to copy its <code className="font-mono text-base">var(--token)</code>.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="secondary">Brand / Neutral</Badge>
          <Badge variant="secondary">Light / Dark</Badge>
          <Badge variant="outline">HSL</Badge>
        </div>
      </header>

      <ColorTokens />

      <Separator />

      <TailwindPalette />

      <Separator />

      <RadixPalette />
    </div>
  )
}
