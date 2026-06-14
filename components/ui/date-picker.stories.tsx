import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  DatePickerDateTimeDemo,
  DatePickerDemo,
  DatePickerDobDemo,
  DatePickerInputDemo,
  DatePickerRangeDemo,
} from "@/components/demos/interactive"

const meta = {
  title: "UI/Date Picker",
  component: DatePickerDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A composed recipe (Popover + Calendar) for picking dates. Not a single component — compose it from Popover, Button, and Calendar.",
      },
    },
  },
} satisfies Meta<typeof DatePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = { render: () => <DatePickerDemo /> }
export const DateRange: Story = { render: () => <DatePickerRangeDemo /> }
export const DateOfBirth: Story = { render: () => <DatePickerDobDemo /> }
export const WithInput: Story = { render: () => <DatePickerInputDemo /> }
export const DateAndTime: Story = { render: () => <DatePickerDateTimeDemo /> }
