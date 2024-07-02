import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { LivestockType } from "@/types/api-types";
import Link from "next/link";

export const LivestockColumns: ColumnDef<LivestockType>[] = [
  {
    id: "select",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Livestock" />
    ),
    cell: ({ row, column, cell }) => (
      <Link href={`/livestock/${cell.row.original.slug}`} className="hover:underline">{cell.row.original.name}</Link>
    ),
  },
  {
    accessorKey: "currentPrice",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Current Price"
      />
    ),
  },
  {
    accessorKey: "lastSellPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Sell Price" />
    ),
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
  },
  {
    accessorKey: "timeListed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TimeListed" />
    ),
  },
];