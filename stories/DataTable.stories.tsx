"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { DataTable } from "@/components/custom/data-table"
import { useState } from "react"

// Sample data for stories
const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-02-20",
    department: "Design",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "Inactive",
    joinDate: "2023-03-10",
    department: "Marketing",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-04-05",
    department: "Sales",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-05-12",
    department: "Engineering",
  },
  {
    id: 6,
    name: "Diana Davis",
    email: "diana@example.com",
    role: "Editor",
    status: "Active",
    joinDate: "2023-06-18",
    department: "Content",
  },
  {
    id: 7,
    name: "Eve Miller",
    email: "eve@example.com",
    role: "User",
    status: "Inactive",
    joinDate: "2023-07-22",
    department: "HR",
  },
  {
    id: 8,
    name: "Frank Garcia",
    email: "frank@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-08-30",
    department: "Finance",
  },
]

const basicColumns = [
  { key: "name" as const, header: "Name", sortable: true, searchable: true },
  { key: "email" as const, header: "Email", sortable: true, searchable: true },
  { key: "role" as const, header: "Role", sortable: true, searchable: true },
]

const advancedColumns = [
  { key: "name" as const, header: "Name", sortable: true, searchable: true },
  { key: "email" as const, header: "Email", sortable: true, searchable: true },
  { key: "department" as const, header: "Department", sortable: true, searchable: true },
  {
    key: "status" as const,
    header: "Status",
    sortable: true,
    searchable: true,
    render: (value: string) => (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: "joinDate" as const, header: "Join Date", sortable: true },
]

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# DataTable Component

A powerful, accessible data table component with advanced features for displaying and interacting with tabular data.

## Features

- **Sorting**: Click column headers to sort data (ascending/descending/none)
- **Search**: Filter data across searchable columns
- **Selection**: Single or multiple row selection with checkboxes
- **Pagination**: Handle large datasets with configurable page sizes
- **Loading States**: Built-in loading and empty state handling
- **Responsive**: Horizontal scroll on smaller screens
- **Custom Rendering**: Custom cell renderers for complex data

## Anatomy

\`\`\`
<DataTable>
  <SearchBar />      // Optional search functionality
  <Table>
    <TableHeader>    // Sortable column headers
    <TableBody>      // Data rows with selection
  </Table>
  <Pagination />     // Optional pagination controls
  <RowCount />       // Optional row count display
</DataTable>
\`\`\`

## Accessibility

- **Keyboard Navigation**: Tab through interactive elements, Space/Enter to activate
- **Screen Reader Support**: Proper table semantics with \`<table>\`, \`<th>\`, \`<td>\`
- **ARIA Labels**: Descriptive labels for sort buttons and checkboxes
- **Focus Management**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Uses proper table structure for assistive technologies

## Column Configuration

Columns support the following properties:
- \`key\`: Data property to display
- \`header\`: Column header text
- \`sortable\`: Enable/disable sorting (default: false)
- \`searchable\`: Include in search filtering (default: true)
- \`render\`: Custom cell renderer function

## Best Practices

### Do's
- Use meaningful column headers
- Provide custom renderers for complex data (dates, status badges, actions)
- Enable search for text-heavy columns
- Use pagination for datasets > 50 rows
- Provide loading states for async data

### Don'ts
- Don't make every column sortable if it doesn't make sense
- Don't use tables for non-tabular data
- Don't forget to handle empty states
- Don't make tables too wide without horizontal scroll
- Don't use tiny text that's hard to read

## Performance

- Sorting and filtering are optimized with React.useMemo
- Pagination reduces DOM nodes for large datasets
- Virtual scrolling recommended for 1000+ rows (not included)
        `,
      },
    },
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Shows loading state",
    },
    selectable: {
      control: "boolean",
      description: "Enables row selection with checkboxes",
    },
    searchable: {
      control: "boolean",
      description: "Enables search functionality",
    },
    paginated: {
      control: "boolean",
      description: "Enables pagination",
    },
    pageSize: {
      control: { type: "number", min: 1, max: 50 },
      description: "Number of rows per page (when paginated)",
    },
    showRowCount: {
      control: "boolean",
      description: "Shows row count information",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
  },
}

export const WithSearch: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    searchable: true,
    searchPlaceholder: "Search users...",
  },
}

export const WithSelection: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.log("Selected rows:", selectedRows)
    },
  },
}

// Advanced Features
export const FullFeatured: Story = {
  args: {
    data: sampleUsers,
    columns: advancedColumns,
    searchable: true,
    selectable: true,
    paginated: true,
    pageSize: 5,
    showRowCount: true,
    searchPlaceholder: "Search by name, email, or department...",
  },
  parameters: {
    docs: {
      description: {
        story: "Complete example with all features enabled: search, selection, pagination, and custom rendering.",
      },
    },
  },
}

// States
export const LoadingState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state shown while data is being fetched.",
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    data: [],
    columns: basicColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when no data is available.",
      },
    },
  },
}

export const EmptySearchResults: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState("nonexistent")

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This story simulates empty search results. The search is pre-filled with "nonexistent".
        </p>
        <DataTable
          data={sampleUsers}
          columns={basicColumns}
          searchable
          searchPlaceholder="Try searching for something that doesn't exist..."
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when search returns no results.",
      },
    },
  },
}

// Real-world Examples
export const UserManagement: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = useState([])

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">User Management</h3>
          {selectedUsers.length > 0 && (
            <div className="text-sm text-muted-foreground">{selectedUsers.length} user(s) selected</div>
          )}
        </div>
        <DataTable
          data={sampleUsers}
          columns={advancedColumns}
          searchable
          selectable
          paginated
          pageSize={6}
          showRowCount
          searchPlaceholder="Search users..."
          onRowSelect={setSelectedUsers}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of a user management interface with selection tracking.",
      },
    },
  },
}

export const ProductCatalog: Story = {
  render: () => {
    const products = [
      { id: 1, name: "Laptop Pro", category: "Electronics", price: 1299, stock: 45, rating: 4.8 },
      { id: 2, name: "Wireless Mouse", category: "Accessories", price: 29, stock: 120, rating: 4.5 },
      { id: 3, name: "Mechanical Keyboard", category: "Accessories", price: 149, stock: 67, rating: 4.7 },
      { id: 4, name: "Monitor 4K", category: "Electronics", price: 399, stock: 23, rating: 4.6 },
      { id: 5, name: "Desk Chair", category: "Furniture", price: 299, stock: 15, rating: 4.3 },
    ]

    const productColumns = [
      { key: "name" as const, header: "Product", sortable: true, searchable: true },
      { key: "category" as const, header: "Category", sortable: true, searchable: true },
      {
        key: "price" as const,
        header: "Price",
        sortable: true,
        render: (value: number) => `$${value.toLocaleString()}`,
      },
      {
        key: "stock" as const,
        header: "Stock",
        sortable: true,
        render: (value: number) => (
          <span className={`font-medium ${value < 30 ? "text-red-600" : "text-green-600"}`}>{value}</span>
        ),
      },
      {
        key: "rating" as const,
        header: "Rating",
        sortable: true,
        render: (value: number) => (
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{value}</span>
          </div>
        ),
      },
    ]

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Catalog</h3>
        <DataTable
          data={products}
          columns={productColumns}
          searchable
          searchPlaceholder="Search products..."
          showRowCount
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of a product catalog with custom price, stock, and rating renderers.",
      },
    },
  },
}
