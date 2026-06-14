import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Slider } from "@/components/ui/slider"

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An input for selecting a single value or a range from within a given range. Pass an array to `defaultValue` for multiple thumbs.",
      },
    },
  },
  argTypes: {
    min: { description: "Minimum value", control: "number" },
    max: { description: "Maximum value", control: "number" },
    step: { description: "Step increment", control: "number" },
    disabled: { description: "Disables the slider", control: "boolean" },
  },
  args: { min: 0, max: 100, step: 1, "aria-label": "Value" },
  render: (args) => <Slider className="w-72" {...args} />,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { defaultValue: [50] } }
export const Range: Story = { args: { defaultValue: [25, 75] } }
export const Steps: Story = { args: { defaultValue: [40], step: 10 } }
export const Disabled: Story = { args: { defaultValue: [50], disabled: true } }
