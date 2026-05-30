"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"

const PALETTE_KEY = "docs-palette"

export function ThemeControls() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [neutral, setNeutral] = React.useState(false)

  // Apply the saved palette on mount and avoid hydration mismatch.
  React.useEffect(() => {
    const saved = localStorage.getItem(PALETTE_KEY) === "neutral"
    document.documentElement.classList.toggle("theme-neutral", saved)
    setNeutral(saved)
    setMounted(true)
  }, [])

  function togglePalette() {
    const next = !neutral
    document.documentElement.classList.toggle("theme-neutral", next)
    localStorage.setItem(PALETTE_KEY, next ? "neutral" : "brand")
    setNeutral(next)
  }

  function toggleMode() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={togglePalette}
        className="gap-2"
        aria-label="Toggle color palette"
      >
        <Palette className="size-4" />
        {mounted ? (neutral ? "Neutral" : "Brand") : "Theme"}
      </Button>
      <Button variant="outline" size="icon" onClick={toggleMode} aria-label="Toggle dark mode">
        <Sun className="size-4 dark:hidden" />
        <Moon className="hidden size-4 dark:block" />
      </Button>
    </div>
  )
}
