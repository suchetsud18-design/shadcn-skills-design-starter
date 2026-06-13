import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A surface container that groups related content. Compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, and `CardAction`.",
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
        <CardAction>
          <Button variant="link" size="sm">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="card-name">Name</Label>
          <Input id="card-name" placeholder="Name of your project" />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}
