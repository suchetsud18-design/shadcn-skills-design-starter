import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent, within } from "storybook/test"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "A menu of actions or options triggered by a button." } },
  },
  argTypes: {
    modal: { description: "Trap focus and block outside interaction while open", control: "boolean" },
    defaultOpen: { description: "Open on first render (uncontrolled)", control: "boolean" },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }))
    const profile = await within(document.body).findByRole("menuitem", { name: /Profile/ })
    await expect(profile).toBeInTheDocument()
  },
}

// Exercises group, checkbox, radio group, and a submenu — opened (with submenu).
export const Rich: Story = {
  render: function RichDropdownMenu() {
    const [statusBar, setStatusBar] = React.useState(true)
    const [position, setPosition] = React.useState("bottom")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              checked={statusBar}
              onCheckedChange={setStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem disabled>Activity Bar</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Save Page As…</DropdownMenuItem>
              <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }))

    const body = within(document.body)
    const subTrigger = await body.findByText("More")
    await expect(subTrigger).toBeInTheDocument()

    await userEvent.hover(subTrigger)
    await expect(await body.findByText("Save Page As…")).toBeInTheDocument()
  },
}
