import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "Displays rich content in a portal, anchored to a trigger." } },
  },
  argTypes: {
    modal: { description: "Trap focus and block outside interaction while open", control: "boolean" },
    defaultOpen: { description: "Open on first render (uncontrolled)", control: "boolean" },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <PopoverHeader className="space-y-1">
            <PopoverTitle className="text-sm font-medium">Dimensions</PopoverTitle>
            <PopoverDescription className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Open popover" }))
    await expect(await within(document.body).findByText("Dimensions")).toBeInTheDocument()
  },
}
