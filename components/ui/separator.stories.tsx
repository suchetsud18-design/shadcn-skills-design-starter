import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "@/components/ui/separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Visually or semantically separates content. Use `orientation` for horizontal or vertical dividers.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <p className="text-sm font-medium">Radix Primitives</p>
      <Separator />
      <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
    </div>
  ),
}
