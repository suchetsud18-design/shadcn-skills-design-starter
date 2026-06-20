import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor } from "storybook/test"

import {
  AreaChartDemo,
  ChartDemo,
  LineChartDemo,
  PieChartDemo,
} from "@/components/demos/interactive"

const meta = {
  title: "UI/Chart",
  component: ChartDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Composable charts built on Recharts, themed through a ChartConfig and the design tokens.",
      },
    },
  },
} satisfies Meta<typeof ChartDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Bar: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <ChartDemo />
    </div>
  ),
  // Recharts' accessibilityLayer makes the chart keyboard-navigable; moving the
  // active point renders the tooltip content.
  play: async ({ canvasElement }) => {
    const surface = canvasElement.querySelector<SVGElement>(".recharts-surface")
    if (!surface) return
    ;(surface as unknown as HTMLElement).focus()
    await userEvent.keyboard("{ArrowRight}{ArrowRight}")
    await waitFor(() =>
      expect(
        canvasElement.querySelector(".recharts-tooltip-wrapper")
      ).toBeInTheDocument()
    )
  },
}
export const Line: Story = { render: () => <div className="w-full max-w-xl"><LineChartDemo /></div> }
export const Area: Story = { render: () => <div className="w-full max-w-xl"><AreaChartDemo /></div> }
export const Pie: Story = { render: () => <PieChartDemo /> }
