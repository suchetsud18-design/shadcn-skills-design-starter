import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within, waitFor } from "storybook/test"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const meta = {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { description: { component: "A carousel with motion and swipe, built on Embla." } },
  },
  argTypes: {
    orientation: { description: "Scroll axis", control: "inline-radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-[16rem]">
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  // Exercise the next/prev buttons and arrow-key navigation.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const next = canvas.getByRole("button", { name: /next/i })
    const prev = canvas.getByRole("button", { name: /previous/i })

    await waitFor(() => expect(next).toBeEnabled())
    await userEvent.click(next)
    await waitFor(() => expect(prev).toBeEnabled())
    await userEvent.click(prev)

    const region = canvasElement.querySelector<HTMLElement>(
      '[aria-roledescription="carousel"]'
    )!
    region.focus()
    await userEvent.keyboard("{ArrowRight}{ArrowLeft}")
  },
}

export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-[16rem]">
      <CarouselContent className="h-[16rem]">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i} className="basis-1/2">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-4">
                <span className="text-2xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
