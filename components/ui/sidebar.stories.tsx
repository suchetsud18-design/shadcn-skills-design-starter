import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
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
