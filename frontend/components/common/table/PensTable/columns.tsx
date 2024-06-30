import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { PenType } from "@/types/api-types";
import Link from "next/link";

export const PenColumns: ColumnDef<PenType>[] = [
  {
    id: "select",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pen Name" />
    ),
    cell: ({ row, column, cell }) => (
      <Link href="" className="hover:underline">{cell.row.original.name}</Link>
    ),
  },
  {
    accessorKey: "tvl",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="TVL per Pen"
      />
    ),
  },
  {
    accessorKey: "farmerRevenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Farmers Revenue" />
    ),
  },
  {
    accessorKey: "gardenRevenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guardians Revenue" />
    ),
  },
  {
    accessorKey: "platformRevenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform Revenue" />
    ),
  },
];