import { GetCustomersQuery } from "@/__gql__/graphql";
import { ColumnDef } from "@tanstack/react-table";

type Customer = {
  id: number;
  name: string;
  createdAt: string;
  customerOrder: {
    orderAmount: string;
    paymentStatus: string;
  }[];
  customerUser: {
    email: string;
    phoneNumber: string;
    role: string;
  };
};

export const Columns: ColumnDef<NonNullable<GetCustomersQuery["customers"]>[number]>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "customerUser.email",
    header: "Email",
    cell: ({ row }) => <div>{row.original?.customerUser?.email ?? "-"}</div>,
  },
  {
    accessorKey: "customerUser.phoneNumber",
    header: "Phone",
    cell: ({ row }) => <div>{row.original?.customerUser?.phoneNumber ?? "-"}</div>,
  },
  {
    header: "Order Value",
    cell: ({ row }) => {
      const fullPaidOrders = row.original.customerOrder.filter(
        (order) => order.paymentStatus === "FULL"
      );
      const totalPaid = fullPaidOrders.reduce(
        (sum, order) => sum + Number(order.orderAmount),
        0
      );
      return <div>{totalPaid.toLocaleString()}</div>;
    },
  },
];
