import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent, within } from "storybook/test"

import {
  ComboboxClearDemo,
  ComboboxDemo,
  ComboboxDisabledDemo,
  ComboboxInvalidDemo,
  ComboboxMultipleDemo,
} from "@/components/demos/interactive"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox"

const meta = {
  title: "UI/Combobox",
  component: ComboboxDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An autocomplete input + list for picking from a set of options, built on the Base UI Combobox primitive.",
      },
    },
  },
} satisfies Meta<typeof ComboboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <ComboboxDemo />,
  // Open the popup so the list, items, and empty state mount.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByPlaceholderText("Select a framework"))
    await expect(await within(document.body).findByText("Next.js")).toBeInTheDocument()
  },
}
export const Multiple: Story = {
  render: () => <ComboboxMultipleDemo />,
  // Open the popup and pick an option so a chip is rendered.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByPlaceholderText("Add framework"))
    const body = within(document.body)
    await userEvent.click(await body.findByText("Next.js"))
    await expect(await canvas.findByText("Next.js")).toBeInTheDocument()
  },
}

export const ClearButton: Story = {
  render: () => <ComboboxClearDemo />,
  // Open and pick an option so the clear button appears.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByPlaceholderText("Select a framework"))
    await userEvent.click(await within(document.body).findByText("Remix"))
    await expect(
      await canvas.findByRole("button", { name: "Clear selection" })
    ).toBeInTheDocument()
  },
}
export const Disabled: Story = { render: () => <ComboboxDisabledDemo /> }
export const Invalid: Story = { render: () => <ComboboxInvalidDemo /> }

const groupedFrameworks = [
  { value: "React", items: ["Next.js", "Remix"] },
  { value: "Vue", items: ["Nuxt.js"] },
]

// Grouped options — exercises ComboboxGroup, ComboboxLabel, ComboboxCollection,
// and ComboboxSeparator.
export const Grouped: Story = {
  render: () => (
    <Combobox items={groupedFrameworks}>
      <ComboboxInput placeholder="Select a framework" className="w-[220px]" />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(group: { value: string; items: string[] }, index: number) => (
            <React.Fragment key={group.value}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            </React.Fragment>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByPlaceholderText("Select a framework"))
    await expect(await within(document.body).findByText("React")).toBeInTheDocument()
  },
}
