"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { DataTableProps, Column, SortDirection } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/custom/input-field"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  searchable = false,
  searchPlaceholder = "Search...",
  paginated = false,
  pageSize = 10,
  showRowCount = true,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const selectAllRef = useRef<HTMLButtonElement>(null)

  // Search filter
  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data
    return data.filter(row =>
      columns.some(column => {
        if (column.searchable === false) return false
        const value = row[column.key]
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    )
  }, [data, searchQuery, columns, searchable])

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortColumn, sortDirection])

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return sortedData.slice(start, end)
  }, [sortedData, paginated, currentPage, pageSize])

  const displayData = paginated ? paginatedData : sortedData

  // Row selection
  const handleRowSelect = (id: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) newSelected.add(id)
    else newSelected.delete(id)
    setSelectedRows(newSelected)
    onRowSelect?.(data.filter(row => newSelected.has(row.id)))
  }

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    const newSelected = new Set<string | number>()
    if (checked) displayData.forEach(row => newSelected.add(row.id))
    setSelectedRows(newSelected)
    onRowSelect?.(data.filter(row => newSelected.has(row.id)))
  }

  const isRowSelected = (id: string | number) => selectedRows.has(id)
  const isAllSelected = displayData.length > 0 && displayData.every(row => isRowSelected(row.id))
  const isIndeterminate = displayData.some(row => isRowSelected(row.id)) && !isAllSelected

  // Set indeterminate via ref
  useEffect(() => {
    if (selectAllRef.current) {
      const input = selectAllRef.current.querySelector("input")
      if (input) input.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return
    if (sortColumn === column.key) {
      setSortDirection(prev => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"))
      if (sortDirection === "desc") setSortColumn(null)
    } else {
      setSortColumn(column.key)
      setSortDirection("asc")
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  if (loading)
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )

  return (
    <div className={cn("space-y-4", className)}>
      {(searchable || showRowCount) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="flex-1 max-w-sm">
              <InputField
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearch}
                clearable
                onClear={() => setSearchQuery("")}
                className="w-full"
              />
            </div>
          )}

          {showRowCount && (
            <div className="text-sm text-muted-foreground">
              {searchQuery ? (
                <>
                  {sortedData.length} of {data.length} rows
                  {paginated && ` (page ${currentPage} of ${totalPages})`}
                </>
              ) : (
                <>
                  {data.length} rows
                  {paginated && ` (page ${currentPage} of ${totalPages})`}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {displayData.length === 0 ? (
        <div className="flex items-center justify-center h-32 border border-border rounded-md">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">{searchQuery ? "No results found" : "No data available"}</p>
            {searchQuery && <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>}
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {selectable && (
                    <th className="w-12 p-4">
                      <Checkbox
                        ref={selectAllRef}
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all rows"
                      />
                    </th>
                  )}
                  {columns.map(column => (
                    <th
                      key={String(column.key)}
                      className={cn(
                        "text-left p-4 font-medium text-muted-foreground",
                        column.sortable && "cursor-pointer hover:text-foreground transition-colors"
                      )}
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center gap-2">
                        {column.header}
                        {column.sortable && (
                          <div className="flex flex-col">
                            <ChevronUp
                              className={cn(
                                "h-3 w-3 transition-colors",
                                sortColumn === column.key && sortDirection === "asc"
                                  ? "text-foreground"
                                  : "text-muted-foreground/50"
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                "h-3 w-3 -mt-1 transition-colors",
                                sortColumn === column.key && sortDirection === "desc"
                                  ? "text-foreground"
                                  : "text-muted-foreground/50"
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-t border-border hover:bg-muted/50 transition-colors",
                      isRowSelected(row.id) && "bg-muted/30"
                    )}
                  >
                    {selectable && (
                      <td className="p-4">
                        <Checkbox
                          checked={isRowSelected(row.id)}
                          onCheckedChange={checked => handleRowSelect(row.id, !!checked)}
                          aria-label={`Select row ${index + 1}`}
                        />
                      </td>
                    )}
                    {columns.map(column => (
                      <td key={String(column.key)} className="p-4">
                        {column.render ? column.render(row[column.key], row, index) : String(row[column.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
