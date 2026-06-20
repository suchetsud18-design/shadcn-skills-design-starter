import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent, within } from "storybook/test"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const meta = {
  title: "UI/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "A menu triggered by right-clicking (or long-press)." } },
  },
  argTypes: {
    modal: { description: "Trap focus and block outside interaction while open", control: "boolean" },
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// Exercises every part — label, group, checkbox, radio group, and a submenu —
// and opens the menu (plus the submenu) so the portalled content actually mounts.
export const Rich: Story = {
  render: function RichContextMenu() {
    const [bookmarked, setBookmarked] = React.useState(true)
    const [showFullURLs, setShowFullURLs] = React.useState(false)
    const [person, setPerson] = React.useState("pedro")
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Page</ContextMenuLabel>
          <ContextMenuGroup>
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={bookmarked}
            onCheckedChange={setBookmarked}
          >
            Bookmarked
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showFullURLs}
            onCheckedChange={setShowFullURLs}
          >
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>Save Page As…</ContextMenuItem>
              <ContextMenuItem>Create Shortcut…</ContextMenuItem>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText("Right-click here")
    await userEvent.pointer({ keys: "[MouseRight]", target: trigger })

    const body = within(document.body)
    const subTrigger = await body.findByText("More Tools")
    await expect(subTrigger).toBeInTheDocument()

    // Open the submenu so its content mounts too.
    await userEvent.hover(subTrigger)
    await expect(await body.findByText("Save Page As…")).toBeInTheDocument()
  },
}
