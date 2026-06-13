import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Input } from "@/components/ui/input"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A styled text field for forms. Supports all native input types; set `aria-invalid` to surface validation errors.",
      },
    },
  },
  argTypes: {
    type: {
      description: "Native input type",
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
    placeholder: { description: "Placeholder text", control: "text" },
    disabled: { description: "Disables the field", control: "boolean" },
  },
  args: {
    type: "text",
    placeholder: "Email",
    "aria-label": "Email",
  },
  render: (args) => <Input {...args} className="w-64" />,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Email: Story = { args: { type: "email", placeholder: "you@example.com" } }
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

/**
 * QA interaction test — types into the field and asserts the value updates.
 */
export const TypeInteraction: Story = {
  name: "▶ Type (interaction test)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText<HTMLInputElement>("Email")
    await userEvent.type(input, "hello@team.dev")
    await expect(input).toHaveValue("hello@team.dev")
  },
}
