import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A Dialog that slides in from an edge of the screen. Set the edge with `side`.",
      },
    },
  },
  argTypes: {
    modal: { description: "Trap focus and block outside interaction while open", control: "boolean" },
    defaultOpen: { description: "Open on first render (uncontrolled)", control: "boolean" },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

function SideSheet({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="capitalize">
          {side}
        </Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle className="capitalize">{side} sheet</SheetTitle>
          <SheetDescription>Enters from the {side} edge.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export const Default: Story = { render: () => <SideSheet side="right" /> }

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <SideSheet side="top" />
      <SideSheet side="right" />
      <SideSheet side="bottom" />
      <SideSheet side="left" />
    </div>
  ),
}
