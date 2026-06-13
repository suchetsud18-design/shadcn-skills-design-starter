import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Triggers an action or event. Use `variant` to signal intent and `size` to set density; pass `asChild` to render a link styled as a button.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style / intent",
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      description: "Height & padding density",
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon"],
    },
    disabled: { description: "Disables interaction", control: "boolean" },
    children: { description: "Button content / label", control: "text" },
  },
  args: { children: "Button", onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: "secondary" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Link: Story = { args: { variant: "link" } }
export const Disabled: Story = { args: { disabled: true } }

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continue <ArrowRight />
      </>
    ),
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

/**
 * QA interaction test — runs in the Interactions panel when the story opens.
 * Clicks the button and asserts the click handler fired.
 */
export const ClickInteraction: Story = {
  name: "▶ Click (interaction test)",
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Button" })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
