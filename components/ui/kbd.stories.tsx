import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

const meta = {
  title: "UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Represents a keyboard key. Combine several with `KbdGroup` for shortcuts.",
      },
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <Kbd>Esc</Kbd> }

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
