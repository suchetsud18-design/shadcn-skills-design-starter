import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

const meta = {
  title: "UI/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A styled wrapper over the native <select> — best for long lists and mobile.",
      },
    },
  },
  argTypes: { disabled: { control: "boolean" } },
  args: { "aria-label": "Fruit" },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args} className="w-44" defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
    </NativeSelect>
  ),
}

export const Groups: Story = {
  args: { "aria-label": "Role" },
  render: (args) => (
    <NativeSelect {...args} className="w-52" defaultValue="frontend">
      <NativeSelectOptGroup label="Engineering">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Business">
        <NativeSelectOption value="sales">Sales</NativeSelectOption>
        <NativeSelectOption value="support">Support</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Disabled: Story = { args: { disabled: true }, render: Default.render }
