import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Search } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

const meta = {
  title: "UI/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compose an input with leading/trailing icons, text, buttons, or a spinner via InputGroupAddon.",
      },
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Clicking a non-button addon focuses the input.
    const addon = canvasElement.querySelector<HTMLElement>(
      '[data-slot="input-group-addon"]'
    )!
    await userEvent.click(addon)
    await expect(canvas.getByPlaceholderText("Search…")).toHaveFocus()
  },
}

export const Text: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon>
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const Button: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupInput placeholder="Search…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Clicking a button inside the addon must NOT steal focus to the input.
    await userEvent.click(canvas.getByRole("button", { name: "Search" }))
    await expect(canvas.getByPlaceholderText("Search…")).not.toHaveFocus()
  },
}

export const Spinner_: Story = {
  name: "Spinner",
  render: () => (
    <InputGroup className="w-64">
      <InputGroupInput placeholder="Loading…" disabled />
      <InputGroupAddon align="inline-end">
        <Spinner className="size-4" />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const Textarea: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupTextarea placeholder="Add a comment…" />
      <InputGroupAddon align="block-end">
        <InputGroupButton>Send</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
