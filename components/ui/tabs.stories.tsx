import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Layered sections of content shown one panel at a time.",
      },
    },
  },
  argTypes: {
    defaultValue: { description: "Tab selected on first render", control: "text" },
    orientation: { description: "Layout direction", control: "inline-radio", options: ["horizontal", "vertical"] },
    activationMode: { description: "Activate on focus or on click", control: "inline-radio", options: ["automatic", "manual"] },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-muted-foreground">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="text-sm text-muted-foreground">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Make changes to your account here.")).toBeVisible()
    await userEvent.click(canvas.getByRole("tab", { name: "Password" }))
    await expect(canvas.getByText("Change your password here.")).toBeVisible()
  },
}
