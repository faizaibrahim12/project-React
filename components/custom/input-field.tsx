"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { InputFieldProps } from "@/lib/types"
import { X, Eye, EyeOff, Loader2 } from "lucide-react"

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = "outlined",
      size = "md",
      type = "text",
      className,
      clearable = false,
      onClear,
      showPasswordToggle = false,
      ...props
    },
    ref,
  ) => {
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
    const [showPassword, setShowPassword] = useState(false)

    const actualType = type === "password" && showPassword ? "text" : type
    const isPassword = type === "password" && showPasswordToggle
    const hasValue = value && value.length > 0
    const showClearButton = clearable && hasValue && !disabled && !loading

    const baseStyles =
      "w-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

    const variantStyles = {
      filled: "bg-muted border-0 focus:bg-background",
      outlined: "bg-background border border-input hover:border-ring/50",
      ghost: "bg-transparent border-0 hover:bg-muted/50 focus:bg-muted/50",
    }

    const sizeStyles = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    }

    const paddingStyles = {
      sm: showClearButton || isPassword || loading ? "pr-8" : "",
      md: showClearButton || isPassword || loading ? "pr-10" : "",
      lg: showClearButton || isPassword || loading ? "pr-12" : "",
    }

    const inputClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      paddingStyles[size],
      "rounded-md",
      invalid && "border-destructive focus:ring-destructive",
      className,
    )

    const handleClear = () => {
      onClear?.()
      if (onChange) {
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              invalid && "text-destructive",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={inputClasses}
            aria-invalid={invalid}
            aria-describedby={helperText || errorMessage ? `${inputId}-description` : undefined}
            {...props}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {loading && (
              <Loader2
                className={cn(
                  "animate-spin text-muted-foreground",
                  size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
                )}
              />
            )}

            {showClearButton && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "text-muted-foreground hover:text-foreground transition-colors",
                  size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
                )}
                aria-label="Clear input"
              >
                <X className="h-full w-full" />
              </button>
            )}

            {isPassword && !loading && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={cn(
                  "text-muted-foreground hover:text-foreground transition-colors",
                  size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
                )}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-full w-full" /> : <Eye className="h-full w-full" />}
              </button>
            )}
          </div>
        </div>

        {(helperText || errorMessage) && (
          <p
            id={`${inputId}-description`}
            className={cn("text-sm", invalid ? "text-destructive" : "text-muted-foreground")}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  },
)

InputField.displayName = "InputField"
