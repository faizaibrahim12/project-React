"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { InputField } from "@/components/custom/input-field"
import { useState } from "react"

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# InputField Component

A flexible, accessible input component built with React, TypeScript, and TailwindCSS. 
Supports multiple variants, sizes, validation states, and interactive features.

## Features

- **Multiple Variants**: Filled, outlined, and ghost styles
- **Three Sizes**: Small (sm), medium (md), and large (lg)
- **Validation States**: Error states with custom messages
- **Interactive Features**: Clear button, password toggle, loading state
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- **Theme Support**: Automatic light/dark mode support via CSS variables

## Anatomy

\`\`\`
<InputField>
  <label>     // Optional label
  <input>     // Main input element
  <icons>     // Clear button, password toggle, loading spinner
  <helper>    // Helper text or error message
</InputField>
\`\`\`

## Accessibility

- Uses semantic HTML with proper \`<label>\` and \`<input>\` elements
- Supports ARIA attributes: \`aria-invalid\`, \`aria-describedby\`
- Keyboard navigation: Tab to focus, Enter to submit, Escape to clear
- Screen reader support with descriptive labels and error messages
- Focus management with visible focus indicators

## Best Practices

### Do's
- Always provide a meaningful label for accessibility
- Use helper text to guide users
- Choose appropriate input types (email, password, etc.)
- Provide clear error messages
- Use consistent sizing across your application

### Don'ts
- Don't use placeholder text as the only label
- Don't make error messages too technical
- Don't disable inputs without clear indication why
- Don't use tiny sizes for critical inputs
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
      description: "Visual style variant of the input",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
      description: "HTML input type",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field",
    },
    invalid: {
      control: "boolean",
      description: "Shows error state styling",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables input",
    },
    clearable: {
      control: "boolean",
      description: "Shows clear button when input has value",
    },
    showPasswordToggle: {
      control: "boolean",
      description: "Shows password visibility toggle (only for password type)",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    label: "Default Input",
    placeholder: "Enter text...",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    helperText: "We'll never share your email with anyone else.",
    type: "email",
  },
}

export const ErrorState: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    errorMessage: "Password must be at least 8 characters long",
    invalid: true,
    type: "password",
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Filled Variant" placeholder="Filled input" variant="filled" />
      <InputField label="Outlined Variant" placeholder="Outlined input" variant="outlined" />
      <InputField label="Ghost Variant" placeholder="Ghost input" variant="ghost" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different visual styles for various design contexts.",
      },
    },
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Small" placeholder="Small input" size="sm" />
      <InputField label="Medium" placeholder="Medium input" size="md" />
      <InputField label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three different sizes to fit various UI contexts.",
      },
    },
  },
}

// Interactive Features
export const InteractiveFeatures: Story = {
  render: () => {
    const [clearableValue, setClearableValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    return (
      <div className="space-y-4 w-80">
        <InputField
          label="Clearable Input"
          placeholder="Type to see clear button"
          value={clearableValue}
          onChange={(e) => setClearableValue(e.target.value)}
          clearable
          onClear={() => setClearableValue("")}
        />
        <InputField
          label="Password with Toggle"
          placeholder="Enter password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          showPasswordToggle
        />
        <InputField label="Loading State" placeholder="Processing..." loading />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Advanced interactive features including clear button, password toggle, and loading state.",
      },
    },
  },
}

// States
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Normal State" placeholder="Normal input" />
      <InputField label="Disabled State" placeholder="Disabled input" disabled />
      <InputField label="Error State" placeholder="Invalid input" invalid errorMessage="This field is required" />
      <InputField label="Loading State" placeholder="Loading..." loading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different states the input can be in during user interaction.",
      },
    },
  },
}

// Real-world Examples
export const LoginForm: Story = {
  render: () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
      <div className="space-y-4 w-80 p-6 border rounded-lg">
        <h3 className="text-lg font-semibold">Login Form</h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          clearable
          onClear={() => setEmail("")}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of a login form using InputField components.",
      },
    },
  },
}

export const ContactForm: Story = {
  render: () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    return (
      <div className="space-y-4 w-80 p-6 border rounded-lg">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          clearable
          onClear={() => setName("")}
        />
        <InputField
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="We'll use this to send you updates"
          clearable
          onClear={() => setEmail("")}
        />
        <InputField
          label="Phone Number"
          placeholder="Enter your phone number"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          clearable
          onClear={() => setPhone("")}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of a contact form with various input types and helper text.",
      },
    },
  },
}
