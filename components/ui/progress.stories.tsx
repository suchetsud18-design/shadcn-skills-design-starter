import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Progress } from "@/components/ui/progress"

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Displays an indicator showing completion progress of a task.",
      },
    },
  },
  argTypes: {
    value: { description: "Progress value (0–100)", control: { type: "range", min: 0, max: 100 } },
  },
  args: { value: 60 },
  render: (args) => <Progress {...args} className="w-64" />,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { value: 0 } }
export const Half: Story = { args: { value: 50 } }
export const Complete: Story = { args: { value: 100 } }
