import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"
import { Bold } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "A two-state button that can be on or off." } },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    disabled: { control: "boolean" },
    pressed: { control: "boolean" },
  },
  args: { "aria-label": "Toggle bold", children: <Bold className="size-4" /> },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Outline: Story = { args: { variant: "outline" } }
export const Pressed: Story = { args: { defaultPressed: true } }
export const Disabled: Story = { args: { disabled: true } }

export const ToggleInteraction: Story = {
  name: "▶ Toggle (interaction test)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle bold" })
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}
