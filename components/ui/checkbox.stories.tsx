import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A control that toggles a single value on or off. Always pair with a `Label` (or `aria-label`) for accessibility.",
      },
    },
  },
  argTypes: {
    checked: { description: "Controlled checked state", control: "boolean" },
    defaultChecked: {
      description: "Initial checked state (uncontrolled)",
      control: "boolean",
    },
    disabled: { description: "Disables the checkbox", control: "boolean" },
  },
  args: { "aria-label": "Accept terms" },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { "aria-invalid": true } }

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} aria-label={undefined} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

/**
 * QA interaction test — clicks the checkbox and asserts it becomes checked.
 */
export const ToggleInteraction: Story = {
  name: "▶ Toggle (interaction test)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const cb = canvas.getByRole("checkbox", { name: "Accept terms" })
    await expect(cb).not.toBeChecked()
    await userEvent.click(cb)
    await expect(cb).toBeChecked()
  },
}
