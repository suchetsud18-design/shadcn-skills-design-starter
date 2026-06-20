import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible row for lists — compose with ItemMedia, ItemContent, ItemTitle, ItemDescription, and ItemActions.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline", "muted"] },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Item {...args} className="w-80">
      <ItemMedia>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>shadcn</ItemTitle>
        <ItemDescription>Last seen 5 months ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Follow
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const Outline: Story = { args: { variant: "outline" }, render: Default.render }
export const Muted: Story = { args: { variant: "muted" }, render: Default.render }

export const Grouped: Story = {
  render: () => (
    <ItemGroup className="w-80">
      <Item>
        <ItemHeader>People</ItemHeader>
        <ItemContent>
          <ItemTitle>Alice</ItemTitle>
          <ItemDescription>Owner</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </ItemActions>
        <ItemFooter>Joined 2024</ItemFooter>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia>
          <Avatar>
            <AvatarFallback>BO</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Bob</ItemTitle>
          <ItemDescription>Editor</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
