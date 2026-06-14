import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const meta = {
  title: "UI/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A scrollable region with custom, cross-browser styled scrollbars.",
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 24 }, (_, i) => `v1.2.0-beta.${24 - i}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-56 w-56 rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
