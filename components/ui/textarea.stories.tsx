import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-line text field for longer form input. Set `aria-invalid` to surface validation errors.",
      },
    },
  },
  argTypes: {
    placeholder: { description: "Placeholder text", control: "text" },
    disabled: { description: "Disables the field", control: "boolean" },
    rows: { description: "Visible rows", control: "number" },
  },
  args: { placeholder: "Type your message here.", "aria-label": "Message" },
  render: (args) => <Textarea {...args} className="w-72" />,
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { "aria-invalid": true } }

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" {...args} aria-label={undefined} />
    </div>
  ),
}

/**
 * QA interaction test — types into the field and asserts the value updates.
 */
export const TypeInteraction: Story = {
  name: "▶ Type (interaction test)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const field = canvas.getByLabelText<HTMLTextAreaElement>("Message")
    await userEvent.type(field, "Hello from QA")
    await expect(field).toHaveValue("Hello from QA")
  },
}
