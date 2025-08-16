"use client"

import type React from "react"

import { useEffect, useRef, useCallback } from "react"
import type { AccessibilityTestResult } from "./types"

/**
 * Hook for managing focus trap within a component
 */
export function useFocusTrap(isActive = true) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener("keydown", handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener("keydown", handleTabKey)
    }
  }, [isActive])

  return containerRef
}

/**
 * Hook for managing keyboard navigation
 */
export function useKeyboardNavigation(
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void,
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          onEnter?.()
          break
        case "Escape":
          onEscape?.()
          break
        case "ArrowUp":
          e.preventDefault()
          onArrowUp?.()
          break
        case "ArrowDown":
          e.preventDefault()
          onArrowDown?.()
          break
        case "ArrowLeft":
          onArrowLeft?.()
          break
        case "ArrowRight":
          onArrowRight?.()
          break
      }
    },
    [onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight],
  )

  return { onKeyDown: handleKeyDown }
}

/**
 * Hook for managing ARIA live regions
 */
export function useAriaLiveRegion() {
  const liveRegionRef = useRef<HTMLDivElement>(null)

  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    if (!liveRegionRef.current) return

    liveRegionRef.current.setAttribute("aria-live", priority)
    liveRegionRef.current.textContent = message

    // Clear after announcement
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = ""
      }
    }, 1000)
  }, [])

  const LiveRegion = useCallback(
    () => <div ref={liveRegionRef} aria-live="polite" aria-atomic="true" className="sr-only" />,
    [],
  )

  return { announce, LiveRegion }
}

/**
 * Hook for managing focus restoration
 */
export function useFocusRestore() {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
  }, [])

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [])

  return { saveFocus, restoreFocus }
}

/**
 * Utility to generate unique IDs for accessibility
 */
export function generateId(prefix = "component"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Utility to check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "a[href]",
    '[tabindex]:not([tabindex="-1"])',
  ]

  return focusableSelectors.some((selector) => element.matches(selector))
}

/**
 * Utility to get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "a[href]",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ")

  return Array.from(container.querySelectorAll(focusableSelectors))
}

/**
 * Accessibility testing utility
 */
export function testAccessibility(element: HTMLElement): AccessibilityTestResult {
  const result: AccessibilityTestResult = {
    hasLabel: false,
    hasAriaAttributes: false,
    isKeyboardAccessible: false,
    hasProperContrast: false,
    hasSemanticMarkup: false,
    score: 0,
    suggestions: [],
  }

  // Check for labels
  const hasLabel =
    element.hasAttribute("aria-label") ||
    element.hasAttribute("aria-labelledby") ||
    element.querySelector("label") !== null
  result.hasLabel = hasLabel
  if (!hasLabel) {
    result.suggestions.push("Add aria-label or associate with a label element")
  }

  // Check for ARIA attributes
  const ariaAttributes = ["aria-describedby", "aria-invalid", "aria-required", "role"]
  const hasAriaAttributes = ariaAttributes.some((attr) => element.hasAttribute(attr))
  result.hasAriaAttributes = hasAriaAttributes

  // Check keyboard accessibility
  const isKeyboardAccessible = isFocusable(element) || element.tabIndex >= 0
  result.isKeyboardAccessible = isKeyboardAccessible
  if (!isKeyboardAccessible) {
    result.suggestions.push("Ensure element is keyboard accessible with proper tabindex")
  }

  // Check semantic markup
  const semanticTags = ["button", "input", "select", "textarea", "a", "table", "th", "td"]
  const hasSemanticMarkup = semanticTags.includes(element.tagName.toLowerCase()) || element.hasAttribute("role")
  result.hasSemanticMarkup = hasSemanticMarkup
  if (!hasSemanticMarkup) {
    result.suggestions.push("Use semantic HTML elements or appropriate ARIA roles")
  }

  // Calculate score
  const checks = [result.hasLabel, result.hasAriaAttributes, result.isKeyboardAccessible, result.hasSemanticMarkup]
  result.score = (checks.filter(Boolean).length / checks.length) * 100

  return result
}

/**
 * Screen reader utility functions
 */
export const screenReader = {
  /**
   * Announce a message to screen readers
   */
  announce: (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", priority)
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  /**
   * Create a visually hidden element for screen readers
   */
  createVisuallyHidden: (text: string): HTMLSpanElement => {
    const element = document.createElement("span")
    element.className = "sr-only"
    element.textContent = text
    return element
  },
}

/**
 * Color contrast utility
 */
export function getContrastRatio(foreground: string, background: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want a more robust color parsing library
  const getLuminance = (color: string): number => {
    // This is a simplified version - use a proper color library in production
    const rgb = color.match(/\d+/g)
    if (!rgb) return 0

    const [r, g, b] = rgb.map((x) => {
      const val = Number.parseInt(x) / 255
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast ratio meets WCAG guidelines
 */
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA",
  size: "normal" | "large" = "normal",
): boolean {
  const ratio = getContrastRatio(foreground, background)

  if (level === "AAA") {
    return size === "large" ? ratio >= 4.5 : ratio >= 7
  } else {
    return size === "large" ? ratio >= 3 : ratio >= 4.5
  }
}
