import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const meta = {
  title: "UI/Navigation Menu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A collection of links and dropdown menus for site navigation.",
      },
    },
  },
  argTypes: {
    orientation: { description: "Layout direction", control: "inline-radio", options: ["horizontal", "vertical"] },
    delayDuration: { description: "Delay (ms) before opening a menu on hover", control: "number" },
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-2">
              <li>
                <NavigationMenuLink href="#" className="block rounded-md p-2 text-sm hover:bg-accent">
                  Introduction
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block rounded-md p-2 text-sm hover:bg-accent">
                  Installation
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="px-3 py-2 text-sm">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
