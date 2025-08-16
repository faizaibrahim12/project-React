import type React from "react"

export type ComponentSize = "sm" | "md" | "lg"
export type ComponentVariant = "filled" | "outlined" | "ghost"
export type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search"
export type SortDirection = "asc" | "desc" | null

export interface AccessibilityProps {
  /** ARIA label for screen readers */
  "aria-label"?: string
  /** ARIA labelledby reference */
  "aria-labelledby"?: string
  /** ARIA describedby reference */
  "aria-describedby"?: string
  /** ARIA invalid state */
  "aria-invalid"?: boolean
  /** ARIA required state */
  "aria-required"?: boolean
  /** Role for semantic meaning */
  role?: string
  /** Tab index for keyboard navigation */
  tabIndex?: number
}

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    AccessibilityProps {
  /** Current value of the input */
  value?: string
  /** Change handler with typed event */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Accessible label text (required for accessibility) */
  label?: string
  /** Placeholder text (should not replace label) */
  placeholder?: string
  /** Helper text to guide the user */
  helperText?: string
  /** Error message when validation fails */
  errorMessage?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is in an invalid state */
  invalid?: boolean
  /** Whether the input is in a loading state */
  loading?: boolean
  /** Visual variant of the input */
  variant?: ComponentVariant
  /** Size of the input */
  size?: ComponentSize
  /** HTML input type */
  type?: InputType
  /** Additional CSS classes */
  className?: string
  /** Whether to show a clear button when input has value */
  clearable?: boolean
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Whether to show password visibility toggle (password type only) */
  showPasswordToggle?: boolean
  /** Whether the field is required */
  required?: boolean
  /** Maximum length of input */
  maxLength?: number
  /** Minimum length of input */
  minLength?: number
  /** Pattern for input validation */
  pattern?: string
  /** Auto-complete behavior */
  autoComplete?: string
  /** Whether to auto-focus on mount */
  autoFocus?: boolean
  /** Callback when input gains focus */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** Callback when input loses focus */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** Callback when key is pressed */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface Column<T extends Record<string, any>> {
  /** Key of the data property to display */
  key: keyof T
  /** Header text for the column */
  header: string
  /** Whether the column can be sorted */
  sortable?: boolean
  /** Whether the column is included in search */
  searchable?: boolean
  /** Custom renderer for cell content */
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode
  /** Width of the column (CSS value) */
  width?: string
  /** Minimum width of the column */
  minWidth?: string
  /** Whether the column is sticky */
  sticky?: boolean
  /** Alignment of cell content */
  align?: "left" | "center" | "right"
  /** ARIA label for the column header */
  headerAriaLabel?: string
}

export interface DataTableProps<T extends Record<string, any>> extends AccessibilityProps {
  /** Array of data objects to display */
  data: T[]
  /** Column configuration array */
  columns: Column<T>[]
  /** Whether the table is in a loading state */
  loading?: boolean
  /** Whether rows can be selected */
  selectable?: boolean
  /** Callback when row selection changes */
  onRowSelect?: (selectedRows: T[]) => void
  /** Additional CSS classes */
  className?: string
  /** Whether search functionality is enabled */
  searchable?: boolean
  /** Placeholder text for search input */
  searchPlaceholder?: string
  /** Whether pagination is enabled */
  paginated?: boolean
  /** Number of rows per page */
  pageSize?: number
  /** Whether to show row count information */
  showRowCount?: boolean
  /** Caption for the table (accessibility) */
  caption?: string
  /** Summary of the table content (accessibility) */
  summary?: string
  /** Whether the table is sortable */
  sortable?: boolean
  /** Default sort column */
  defaultSortColumn?: keyof T
  /** Default sort direction */
  defaultSortDirection?: SortDirection
  /** Callback when sort changes */
  onSortChange?: (column: keyof T, direction: SortDirection) => void
  /** Callback when search changes */
  onSearchChange?: (query: string) => void
  /** Callback when page changes */
  onPageChange?: (page: number) => void
  /** Custom empty state component */
  emptyState?: React.ReactNode
  /** Custom loading component */
  loadingComponent?: React.ReactNode
  /** Whether to show selection count */
  showSelectionCount?: boolean
  /** Maximum number of selectable rows */
  maxSelections?: number
}

export type InputFieldRef = React.RefObject<HTMLInputElement>
export type DataTableRef<T> = React.RefObject<HTMLTableElement>

export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void
export type InputFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => void
export type InputKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => void
export type RowSelectHandler<T> = (selectedRows: T[]) => void
export type SortChangeHandler<T> = (column: keyof T, direction: SortDirection) => void

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean | string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface ComponentTheme {
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
    background: string
    foreground: string
    muted: string
    border: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export interface AccessibilityTestResult {
  hasLabel: boolean
  hasAriaAttributes: boolean
  isKeyboardAccessible: boolean
  hasProperContrast: boolean
  hasSemanticMarkup: boolean
  score: number
  suggestions: string[]
}
