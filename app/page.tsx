"use client"

import { InputField } from "@/components/custom/input-field"
import { DataTable } from "@/components/custom/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2023-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive", joinDate: "2023-03-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", joinDate: "2023-04-05" },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-05-12",
  },
  { id: 6, name: "Diana Davis", email: "diana@example.com", role: "Editor", status: "Active", joinDate: "2023-06-18" },
  { id: 7, name: "Eve Miller", email: "eve@example.com", role: "User", status: "Inactive", joinDate: "2023-07-22" },
  { id: 8, name: "Frank Garcia", email: "frank@example.com", role: "User", status: "Active", joinDate: "2023-08-30" },
  { id: 9, name: "Grace Lee", email: "grace@example.com", role: "Editor", status: "Active", joinDate: "2023-09-14" },
  { id: 10, name: "Henry Taylor", email: "henry@example.com", role: "Admin", status: "Active", joinDate: "2023-10-08" },
  { id: 11, name: "Ivy Chen", email: "ivy@example.com", role: "User", status: "Active", joinDate: "2023-11-25" },
  {
    id: 12,
    name: "Jack Anderson",
    email: "jack@example.com",
    role: "Editor",
    status: "Inactive",
    joinDate: "2023-12-03",
  },
]

const columns = [
  { key: "name" as const, header: "Name", sortable: true, searchable: true },
  { key: "email" as const, header: "Email", sortable: true, searchable: true },
  { key: "role" as const, header: "Role", sortable: true, searchable: true },
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

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">React Component Library</h1>
          <p className="text-xl text-muted-foreground">
            Modern, accessible components built with React, TypeScript, and TailwindCSS
          </p>
        </div>

        {/* InputField Component Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>InputField Component</CardTitle>
            <CardDescription>Flexible input component with validation states, variants, and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Variants</h3>
                <InputField label="Filled Input" placeholder="Enter text..." variant="filled" />
                <InputField label="Outlined Input" placeholder="Enter text..." variant="outlined" />
                <InputField label="Ghost Input" placeholder="Enter text..." variant="ghost" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Sizes</h3>
                <InputField label="Small" placeholder="Small input" size="sm" />
                <InputField label="Medium" placeholder="Medium input" size="md" />
                <InputField label="Large" placeholder="Large input" size="lg" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">States</h3>
                <InputField
                  label="With Helper Text"
                  placeholder="Enter email"
                  helperText="We'll never share your email"
                />
                <InputField
                  label="Error State"
                  placeholder="Enter password"
                  errorMessage="Password is required"
                  invalid
                />
                <InputField label="Disabled" placeholder="Disabled input" disabled />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Advanced Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Interactive Features</h4>
                  <InputField
                    label="Clearable Input"
                    placeholder="Type to see clear button"
                    clearable
                    onClear={() => console.log("Input cleared")}
                  />
                  <InputField
                    label="Password with Toggle"
                    placeholder="Enter password"
                    type="password"
                    showPasswordToggle
                  />
                  <InputField label="Loading State" placeholder="Processing..." loading />
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Combined Features</h4>
                  <InputField
                    label="Password + Clear"
                    placeholder="Enter password"
                    type="password"
                    showPasswordToggle
                    clearable
                  />
                  <InputField
                    label="Email with Clear"
                    placeholder="Enter email"
                    type="email"
                    clearable
                    helperText="Click X to clear"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">All Sizes with Features</h4>
                  <InputField label="Small + Clear" placeholder="Small input" size="sm" clearable />
                  <InputField
                    label="Medium + Password"
                    placeholder="Medium password"
                    size="md"
                    type="password"
                    showPasswordToggle
                  />
                  <InputField label="Large + Loading" placeholder="Large loading" size="lg" loading />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DataTable Component Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>DataTable Component</CardTitle>
            <CardDescription>Advanced data table with search, sorting, pagination, and selection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Basic Table with Search</h3>
                <DataTable
                  data={sampleData.slice(0, 5)}
                  columns={columns}
                  searchable
                  searchPlaceholder="Search users..."
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4">Paginated Table with Selection</h3>
                <DataTable
                  data={sampleData}
                  columns={columns}
                  selectable
                  searchable
                  paginated
                  pageSize={5}
                  onRowSelect={(selectedRows) => {
                    console.log("Selected rows:", selectedRows)
                  }}
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4">Loading State</h3>
                <DataTable data={[]} columns={columns} loading />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
