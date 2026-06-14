import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatio } from "@/components/ui/aspect-ratio"

const meta = {
  title: "UI/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Constrains its content to a desired ratio via the `ratio` prop.",
      },
    },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Widescreen: Story = {
  name: "16 / 9",
  render: () => (
    <div className="w-72">
      <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-md bg-muted text-sm text-foreground">
        16 / 9
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  name: "1 / 1",
  render: () => (
    <div className="w-40">
      <AspectRatio ratio={1} className="flex items-center justify-center rounded-md bg-muted text-sm text-foreground">
        1 / 1
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  name: "3 / 4",
  render: () => (
    <div className="w-40">
      <AspectRatio ratio={3 / 4} className="flex items-center justify-center rounded-md bg-muted text-sm text-foreground">
        3 / 4
      </AspectRatio>
    </div>
  ),
}
