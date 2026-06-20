import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"
import { ChevronsUpDown } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "An interactive component that expands and collapses content." } },
  },
  argTypes: {
    defaultOpen: { description: "Expanded on first render (uncontrolled)", control: "boolean" },
    disabled: { description: "Prevent toggling", control: "boolean" },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-4 rounded-md border px-4 py-2">
        <span className="text-sm font-medium">@peduarte starred 3 repos</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle" })
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByText("@radix-ui/primitives")).toBeVisible()
  },
}
