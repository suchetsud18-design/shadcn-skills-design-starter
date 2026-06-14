import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Skeleton } from "@/components/ui/skeleton"

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A placeholder to show while content is loading.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
}

export const Card: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  ),
}
