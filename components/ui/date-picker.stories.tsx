import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

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

// Open the popover so the calendar mounts.
function openCalendar(triggerName: RegExp | string) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: triggerName }))
    const grids = await within(document.body).findAllByRole("grid")
    await expect(grids.length).toBeGreaterThan(0)
  }
}

export const Basic: Story = {
  render: () => <DatePickerDemo />,
  play: openCalendar("Pick a date"),
}
export const DateRange: Story = {
  render: () => <DatePickerRangeDemo />,
  play: openCalendar("Pick a date range"),
}
export const DateOfBirth: Story = {
  render: () => <DatePickerDobDemo />,
  play: openCalendar("Date of birth"),
}
export const WithInput: Story = {
  render: () => <DatePickerInputDemo />,
  play: openCalendar("Select date"),
}
export const DateAndTime: Story = {
  render: () => <DatePickerDateTimeDemo />,
  play: openCalendar("Date"),
}
