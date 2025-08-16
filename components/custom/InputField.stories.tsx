import type { Meta, StoryObj } from "@storybook/react"
import { InputField } from "./input-field"

const meta: Meta<typeof InputField> = {
  title: "Custom/InputField",
  component: InputField,
}

export default meta

export const Default: StoryObj<typeof InputField> = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "Helper text",
    variant: "outlined",
    size: "md",
  },
}