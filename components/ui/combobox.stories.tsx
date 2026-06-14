import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  ComboboxClearDemo,
  ComboboxDemo,
  ComboboxDisabledDemo,
  ComboboxInvalidDemo,
  ComboboxMultipleDemo,
} from "@/components/demos/interactive"

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

export const Basic: Story = { render: () => <ComboboxDemo /> }
export const Multiple: Story = { render: () => <ComboboxMultipleDemo /> }
export const ClearButton: Story = { render: () => <ComboboxClearDemo /> }
export const Disabled: Story = { render: () => <ComboboxDisabledDemo /> }
export const Invalid: Story = { render: () => <ComboboxInvalidDemo /> }
