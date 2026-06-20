import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A composable application sidebar built from SidebarProvider, Sidebar, and the SidebarMenu primitives. (Shown here with collapsible=\"none\" so it embeds inline.)",
      },
    },
  },
  argTypes: {
    side: { description: "Edge the sidebar is anchored to", control: "inline-radio", options: ["left", "right"] },
    variant: { description: "Visual treatment", control: "inline-radio", options: ["sidebar", "floating", "inset"] },
    collapsible: { description: "Collapse behaviour", control: "inline-radio", options: ["offcanvas", "icon", "none"] },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SidebarProvider className="min-h-96 rounded-md border">
      <Sidebar collapsible="none" className="border-r">
        <SidebarHeader className="px-3 py-2 text-sm font-semibold">Acme Inc</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Projects</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <SidebarTrigger />
        <p className="mt-2 text-sm text-muted-foreground">Main content area.</p>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Collapsible "icon" sidebar — the play toggles it to exercise the open/closed state.
export const Collapsible: Story = {
  render: () => (
    <SidebarProvider className="min-h-96 rounded-md border">
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="px-3 py-2 text-sm font-semibold">Acme</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Projects">Projects</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="p-4">
        <SidebarTrigger />
        <p className="mt-2 text-sm text-muted-foreground">Main content area.</p>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Both SidebarTrigger and SidebarRail expose "Toggle Sidebar"; use the first.
    const [trigger] = canvas.getAllByRole("button", { name: /toggle sidebar/i })
    await userEvent.click(trigger)
    await userEvent.click(trigger)
    await expect(trigger).toBeInTheDocument()
  },
}

// Exercises the remaining menu parts — input, sub-menus, actions, badges, skeletons.
export const Rich: Story = {
  render: () => (
    <SidebarProvider className="min-h-96 rounded-md border">
      <Sidebar collapsible="none" className="border-r">
        <SidebarHeader className="p-2">
          <SidebarInput placeholder="Search…" />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupAction title="Add project">+</SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                  <SidebarMenuAction title="More">⋯</SidebarMenuAction>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive>Overview</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Reports</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-2 text-xs text-muted-foreground">v1.0.0</SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="text-sm text-muted-foreground">Main content area.</p>
      </SidebarInset>
    </SidebarProvider>
  ),
}
