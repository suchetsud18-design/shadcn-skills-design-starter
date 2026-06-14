import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Calendar } from "@/components/ui/calendar"

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date picker built on react-day-picker. Use `mode` for single, range, or multiple selection.",
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Calendar mode="single" className="rounded-md border" />,
}

export const Range: Story = {
  render: () => <Calendar mode="range" numberOfMonths={2} className="rounded-md border" />,
}

export const Multiple: Story = {
  render: () => <Calendar mode="multiple" className="rounded-md border" />,
}
