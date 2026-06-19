import * as React from "react"
import type { Decorator, Preview } from "@storybook/nextjs-vite"

import { TooltipProvider } from "../components/ui/tooltip"
import { Toaster } from "../components/ui/sonner"

import { DocsTemplate } from "./DocsTemplate"

// Brand tokens (35 semantic vars, light + dark, Brand + Neutral). Importing here
// runs the project's Tailwind v4 pipeline so utilities + tokens work in every story.
import "../app/globals.css"

/**
 * Applies the project's theme classes to a wrapper around each story so Dev & QA
 * can preview all four combos from the toolbar:
 *   (none) · dark · theme-neutral · theme-neutral dark
 * `.dark` must sit on an ancestor (globals.css uses `dark` => `:is(.dark *)`),
 * so the themed surface (`bg-background`) is rendered on an inner element.
 */
const withTheme: Decorator = (Story, context) => {
  const { palette, mode } = context.globals
  const themeClass = [
    palette === "neutral" ? "theme-neutral" : "",
    mode === "dark" ? "dark" : "",
  ]
    .filter(Boolean)
    .join(" ")

  // In the Docs page each story is embedded in a Canvas block — size it to its
  // content. In the standalone Canvas (single story) fill the viewport.
  const isDocs = context.viewMode === "docs"

  return (
    <div className={themeClass}>
      <div
        className="bg-background text-foreground"
        style={{
          minHeight: isDocs ? undefined : "100vh",
          padding: isDocs ? "1.5rem" : "2rem",
        }}
      >
        {/* Mirrors app/layout.tsx: global TooltipProvider + Toaster. */}
        <TooltipProvider>
          <Story />
        </TooltipProvider>
        <Toaster />
      </div>
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    palette: {
      description: "Brand vs Neutral palette",
      toolbar: {
        title: "Palette",
        icon: "paintbrush",
        items: [
          { value: "brand", title: "Brand" },
          { value: "neutral", title: "Neutral" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Light vs Dark",
      toolbar: {
        title: "Mode",
        icon: "contrast",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { palette: "brand", mode: "light" },
  parameters: {
    // The themed wrapper already paints the surface; disable the default checkered bg.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The a11y addon REPORTS violations in the Storybook panel but does not fail
    // the test run ('todo', not 'error'). Rationale: components/ui/* are vendored
    // from shadcn unmodified (project no-fork policy), and a few primitives carry
    // known upstream axe findings — link-variant color, opacity-dimmed inactive
    // text, the graphical slider thumb (WCAG 1.4.11, not 1.4.3), disabled states,
    // and listbox/separator ARIA — all rated "serious", none "critical". The
    // project's OWN tokens + compositions pass WCAG AA (see README → Accessibility).
    // Flip to 'error' once those primitives are forked to fix the findings.
    a11y: { test: "todo" },
    docs: {
      // Custom autodocs layout (Preview → Props → Examples) for every component.
      page: DocsTemplate,
      // Right-hand table of contents for quick navigation.
      toc: true,
    },
  },
}

export default preview
