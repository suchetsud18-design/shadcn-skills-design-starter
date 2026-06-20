import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An image element with a text fallback for representing a user. The fallback shows while the image loads or if it fails.",
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {["A", "B", "C"].map((c) => (
        <Avatar key={c}>
          <AvatarFallback>{c}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}
