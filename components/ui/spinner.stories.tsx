import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "An animated loading indicator." } },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <Spinner /> }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner className="size-4" /> Saving…
    </Button>
  ),
}
