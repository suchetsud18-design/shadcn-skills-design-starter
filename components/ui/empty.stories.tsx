import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Inbox } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An empty state for when there's no data — compose with EmptyMedia, EmptyTitle, EmptyDescription, and EmptyContent.",
      },
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="w-80 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Refresh</Button>
      </EmptyContent>
    </Empty>
  ),
}
