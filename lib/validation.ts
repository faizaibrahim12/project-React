"use client"

import type { ValidationRule, ValidationResult } from "./types"

/**
 * Validate input value against rules
 */
export function validateInput(value: string, rules: ValidationRule): ValidationResult {
  const errors: string[] = []

  // Required validation
  if (rules.required && (!value || value.trim().length === 0)) {
    errors.push("This field is required")
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) {
    return { isValid: true, errors: [] }
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters long`)
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Must be no more than ${rules.maxLength} characters long`)
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push("Please enter a valid format")
  }

  // Custom validation
  if (rules.custom) {
    const customResult = rules.custom(value)
    if (typeof customResult === "string") {
      errors.push(customResult)
    } else if (!customResult) {
      errors.push("Invalid value")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-$$$$]+$/,
  url: /^https?:\/\/.+/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
  alphabetic: /^[a-zA-Z]+$/,
}

/**
 * Pre-built validation rules
 */
export const validationRules = {
  required: { required: true },
  email: {
    required: true,
    pattern: validationPatterns.email,
    custom: (value: string) => validationPatterns.email.test(value) || "Please enter a valid email address",
  },
  password: {
    required: true,
    minLength: 8,
    pattern: validationPatterns.password,
    custom: (value: string) =>
      validationPatterns.password.test(value) ||
      "Password must contain at least 8 characters with uppercase, lowercase, and number",
  },
  phone: {
    pattern: validationPatterns.phone,
    custom: (value: string) => validationPatterns.phone.test(value) || "Please enter a valid phone number",
  },
  url: {
    pattern: validationPatterns.url,
    custom: (value: string) => validationPatterns.url.test(value) || "Please enter a valid URL",
  },
}
