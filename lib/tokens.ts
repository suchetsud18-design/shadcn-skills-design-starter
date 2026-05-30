// The project's 35 semantic color tokens, grouped for the Colors documentation.
// Values are read live from CSS variables so the swatches reflect the active
// theme (Brand / Neutral · light / dark).

export type ColorTokenGroup = {
  name: string
  description: string
  tokens: string[]
}

export const colorTokenGroups: ColorTokenGroup[] = [
  {
    name: "Surface",
    description: "Page, card, and popover backgrounds with their paired foreground text.",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
    ],
  },
  {
    name: "Brand & Accent",
    description: "Primary action, secondary, muted, and accent surfaces.",
    tokens: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
    ],
  },
  {
    name: "Functional",
    description: "Destructive actions, borders, inputs, and focus rings.",
    tokens: ["destructive", "border", "input", "ring"],
  },
  {
    name: "Charts",
    description: "Categorical colors for data visualization.",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    name: "Sidebar",
    description: "Dedicated tokens for the application sidebar.",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
  {
    name: "Semantic",
    description: "Overlay scrim and stone-toned semantic surfaces.",
    tokens: ["background-color", "semantic-background", "semantic-border", "semantic-foreground"],
  },
]

export const allColorTokens: string[] = colorTokenGroups.flatMap((g) => g.tokens)
