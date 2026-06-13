import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible label for a form control. Associate it with a control via `htmlFor` so clicking the label focuses (or toggles) the input.",
      },
    },
  },
  argTypes: { children: { description: "Label text", control: "text" } },
  args: { children: "Email" },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="newsletter" />
      <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
    </div>
  ),
}
