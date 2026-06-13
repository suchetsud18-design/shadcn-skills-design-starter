import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const options = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
  { value: "default", label: "Default" },
]

function DensityGroup(args: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup defaultValue="comfortable" {...args}>
      {options.map((o) => (
        <div key={o.value} className="flex items-center gap-2">
          <RadioGroupItem value={o.value} id={`density-${o.value}`} />
          <Label htmlFor={`density-${o.value}`}>{o.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}

const meta = {
  title: "UI/Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of checkable buttons where no more than one can be selected at a time.",
      },
    },
  },
  argTypes: {
    disabled: { description: "Disables the whole group", control: "boolean" },
  },
  render: (args) => <DensityGroup {...args} />,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }

/**
 * QA interaction test — selects a different option and asserts it is checked.
 */
export const SelectInteraction: Story = {
  name: "▶ Select (interaction test)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const compact = canvas.getByRole("radio", { name: "Compact" })
    await expect(compact).not.toBeChecked()
    await userEvent.click(compact)
    await expect(compact).toBeChecked()
  },
}
