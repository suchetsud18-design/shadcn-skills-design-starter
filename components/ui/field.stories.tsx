import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const meta = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form-library-agnostic field scaffolding — compose Field with FieldLabel, FieldDescription, FieldError, and FieldGroup.",
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Input_: Story = {
  name: "Input",
  render: () => (
    <FieldGroup className="w-64">
      <Field>
        <FieldLabel htmlFor="f-user">Username</FieldLabel>
        <Input id="f-user" placeholder="shadcn" />
        <FieldDescription>This is your public display name.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-72">
      <FieldContent>
        <FieldLabel htmlFor="f-news">Newsletter</FieldLabel>
        <FieldDescription>Receive product updates.</FieldDescription>
      </FieldContent>
      <Switch id="f-news" defaultChecked />
    </Field>
  ),
}

export const Validation: Story = {
  render: () => (
    <FieldGroup className="w-64">
      <Field data-invalid="true">
        <FieldLabel htmlFor="f-email">Email</FieldLabel>
        <Input id="f-email" type="email" aria-invalid defaultValue="not-an-email" />
        <FieldError>Enter a valid email address.</FieldError>
      </Field>
    </FieldGroup>
  ),
}

export const ErrorList: Story = {
  render: () => (
    <FieldGroup className="w-64">
      <Field data-invalid="true">
        <FieldLabel htmlFor="f-pw">Password</FieldLabel>
        <Input id="f-pw" type="password" aria-invalid />
        {/* FieldError can derive its content from an `errors` array. */}
        <FieldError errors={[{ message: "Too short." }]} />
        <FieldError
          errors={[
            { message: "Must include a number." },
            { message: "Must include a symbol." },
            { message: "Must include a number." },
          ]}
        />
        {/* No children and no errors → renders nothing. */}
        <FieldError errors={[]} />
      </Field>
    </FieldGroup>
  ),
}

export const Fieldset: Story = {
  render: () => (
    <FieldSet className="w-72">
      <FieldLegend>Address</FieldLegend>
      <FieldDescription>Where should we ship your order?</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="f-street">Street</FieldLabel>
          <Input id="f-street" placeholder="123 Main St" />
        </Field>
        <FieldSeparator>Optional</FieldSeparator>
        <Field>
          <FieldTitle>Notes</FieldTitle>
          <Input id="f-notes" placeholder="Leave at door" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
