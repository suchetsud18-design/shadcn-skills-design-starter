import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle for switching a single setting on or off. Always pair with a `Label` (or `aria-label`) for accessibility.",
      },
    },
  },
  argTypes: {
    size: {
      description: "Control size",
      control: "inline-radio",
      options: ["sm", "default"],
    },
    disabled: { description: "Disables the toggle", control: "boolean" },
    defaultChecked: {
      description: "Initial checked state (uncontrolled)",
      control: "boolean",
    },
  },
  args: { "aria-label": "Airplane mode" },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: "sm" } }

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" {...args} />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
}

/**
 * QA interaction test — toggles the switch and asserts its checked state flips.
 */
export const ToggleInteraction: Story = {
  name: "▶ Toggle (interaction test)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole("switch", { name: "Airplane mode" })
    await expect(sw).toHaveAttribute("aria-checked", "false")
    await userEvent.click(sw)
    await expect(sw).toHaveAttribute("aria-checked", "true")
  },
}
