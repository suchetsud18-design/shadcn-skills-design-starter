import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const meta = {
  title: "UI/Input OTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible one-time-password input with copy-paste support.",
      },
    },
  },
  args: { maxLength: 6, children: null },
  argTypes: {
    maxLength: { description: "Number of slots / characters", control: "number" },
    disabled: { description: "Disable the input", control: "boolean" },
  },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const DigitsOnly: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={"^\\d+$"} aria-label="One-time password (digits only)">
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}
