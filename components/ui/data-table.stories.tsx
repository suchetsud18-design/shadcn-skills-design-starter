import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const meta = {
  title: "UI/Data Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A composed recipe (Table + TanStack Table) for sortable, filterable, selectable data grids. Shown here as a static preview of the rendered markup.",
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { id: "INV001", status: "Paid", email: "ken99@example.com", amount: "$316.00" },
  { id: "INV002", status: "Pending", email: "abe45@example.com", amount: "$242.00" },
  { id: "INV003", status: "Unpaid", email: "monserrat44@example.com", amount: "$837.00" },
]

export const Default: Story = {
  render: () => (
    <Table className="max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell>
              <Checkbox aria-label={`Select ${r.id}`} />
            </TableCell>
            <TableCell>
              <Badge variant={r.status === "Paid" ? "secondary" : "outline"}>{r.status}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{r.email}</TableCell>
            <TableCell className="text-right font-medium">{r.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
