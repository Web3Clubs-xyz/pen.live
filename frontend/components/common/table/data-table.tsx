"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Table as TableTanstack,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";


import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: JSX.Element;
  table: TableTanstack<TData>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
  table,
}: DataTableProps<TData, TValue>) {
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );
  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   onColumnFiltersChange: setColumnFilters,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   state: {
  //     columnFilters,
  //   },
  // });
  const { pageIndex } = table.getState().pagination;
  const router = useRouter();

  const paginationButtons = [];
  if (table.getPageCount()) {
    for (let i = 0; i < table!.getPageCount(); i++) {
      paginationButtons.push(
        <Button
          className={`ml-1 ${i === pageIndex ? "bg-gradient-light-blue text-white" : ""}`}
          variant="outline"
          size="sm"
          key={i}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Button>
      );
    }
  }

  return (
    <div>
      <div className="rounded-md bg-white border my-3">
        {children}
        {/* <div className="flex justify-between items-center p-3">
          <div className="flex items-center border border-[#ccc] rounded-full px-2">
            <MagnifyingGlass size={24} color="#1e1e1e" weight="bold" />
            <input
              value={(table.getColumn(query)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(query)?.setFilterValue(event.target.value)
              }
              placeholder="Search Land Name"
              type="text"
              className="outline-none p-2"
            />
          </div>
          <div className="flex text-[#718096]">
            <FadersHorizontal
              size={24}
              color="#718096"
              className="mx-1"
              weight="fill"
            />
            <h4>Filters</h4>
          </div>
          <div className="flex text-[#718096]">
            <Calendar
              size={24}
              color="#718096"
              className="mx-1"
              weight="fill"
            />
            <h4>April 11 - April 24</h4>
          </div>
          <div className="flex text-[#718096]">
            <FileArrowDown
              size={24}
              color="#718096"
              className="mx-1"
              weight="fill"
            />
            <h4>Download</h4>
          </div>
        </div> */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mx-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table!.getPageCount()} pages with{" "}
            {table.getFilteredRowModel().rows.length} pens.
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <div>{paginationButtons.map((element) => element)}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationTableState = {
  pagination: PaginationState;
};

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>;
};
