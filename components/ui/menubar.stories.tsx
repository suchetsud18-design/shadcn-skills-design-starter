import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent, within } from "storybook/test"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

const meta = {
  title: "UI/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A desktop-style menu bar with multiple top-level menus.",
      },
    },
  },
  argTypes: {
    loop: { description: "Wrap keyboard focus at the menu edges", control: "boolean" },
  },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

// Exercises group, label, checkbox, radio group, and a submenu — and opens the
// menu (plus the submenu) so the portalled content actually mounts.
export const Rich: Story = {
  render: function RichMenubar() {
    const [showBookmarks, setShowBookmarks] = React.useState(true)
    const [profile, setProfile] = React.useState("benoit")
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarGroup>
              <MenubarCheckboxItem
                checked={showBookmarks}
                onCheckedChange={setShowBookmarks}
              >
                Show Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarItem disabled>Reload</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email Link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarLabel>Profiles</MenubarLabel>
            <MenubarRadioGroup value={profile} onValueChange={setProfile}>
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("menuitem", { name: "View" }))

    const body = within(document.body)
    const subTrigger = await body.findByText("Share")
    await expect(subTrigger).toBeInTheDocument()

    await userEvent.hover(subTrigger)
    await expect(await body.findByText("Email Link")).toBeInTheDocument()
  },
}
