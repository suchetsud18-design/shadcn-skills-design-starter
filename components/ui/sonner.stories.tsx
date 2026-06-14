import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SonnerDemo, SonnerVariantsDemo } from "@/components/demos/interactive"

const meta = {
  title: "UI/Sonner",
  component: SonnerDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Opinionated toast notifications via Sonner. The Toaster is mounted globally (see preview); call toast() to show one.",
      },
    },
  },
} satisfies Meta<typeof SonnerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <SonnerDemo /> }
export const Variants: Story = { render: () => <SonnerVariantsDemo /> }
