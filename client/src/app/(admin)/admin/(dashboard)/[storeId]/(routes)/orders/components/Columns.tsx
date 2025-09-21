"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import {
  BanknoteIcon,
  CheckCheck,
  CircleOff,
  EllipsisVerticalIcon,
  PackageCheck,
  PlusCircleIcon,
  ShoppingBasket,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/DataTable";
import {
  AddTransactionDocument,
  DeliveryAddressType,
  GetOrdersDocument,
  GetOrdersQuery,
  OrderInputUpdate,
  OrderPaymentStatusType,
  OrderStatus,
  OrderType,
  UpdateOrderDocument,
} from "@/__gql__/graphql";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getOrderStatusColors,
  getOrderPaymentStatusColors,
} from "@/lib/order-status";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useRouter } from "nextjs-toploader/app";

export const orderItemsCols: ColumnDef<
  NonNullable<GetOrdersQuery["orders"]>[0]["orderItems"][0]
>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div className="line-clamp-1">{row.original?.orderProduct.name}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="line-clamp-1">{row.original?.price}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="line-clamp-1">{row.original?.quantity}</div>
      ),
    },
    {
      accessorKey: "subtotal",
      header: "Subtotal",
      cell: ({ row }) => (
        <div className="line-clamp-1">
          {(row.original?.quantity ?? 0) * (row.original?.price ?? 0)}
        </div>
      ),
    },
  ];

export const transactionCols: ColumnDef<
  NonNullable<NonNullable<GetOrdersQuery["orders"]>[0]["transactions"]>[0]
>[] = [
    {
      accessorKey: "type",
      header: "Mode",
    },
    {
      accessorKey: "transactionCode",
      header: "Transaction Code",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
  ];

export const Columns: ColumnDef<NonNullable<GetOrdersQuery["orders"]>[0]>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order ID",
  },
  {
    accessorKey: "orderAmount",
    header: "Order Amount",
  },
  {
    accessorKey: "type",
    header: "Order Type",
  },
  {
    accessorKey: "deliveryAmount",
    header: "Delivery Amount",
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
  },
  {
    accessorKey: "customerName",
    header: "Name",
  },
  {
    accessorKey: "customerPhone",
    header: "Phone Number",
  },

  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="address line-clamp-2">
        {" "}
        {row.original?.type === OrderType.SelfCollect
          ? "Collect at our shop"
          : row.original.deliveryAddress?.type ===
            DeliveryAddressType.PickAndDrop
            ? row.original?.deliveryAddress?.deliveryZoneLocation?.address
            : row.original.deliveryAddress?.type === DeliveryAddressType.Custom
              ? row.original.deliveryAddress?.address
              : row.original.deliveryAddress?.deliveryPickupMtaani
                ?.locationName}{" "}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => (
      <span
        className={cn(
          getOrderStatusColors(row.original?.status),
          "p-1 rounded-xl"
        )}
      >
        {row.original?.status.toLocaleLowerCase()}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <span
        className={cn(
          getOrderPaymentStatusColors(row.original?.paymentStatus),
          "p-1 rounded-xl"
        )}
      >
        {row.original?.paymentStatus.replaceAll("_", " ").toLowerCase()}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div> {format(new Date(row.original?.createdAt), "MMMM do, yyyy")}</div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Payment",
    cell: ({ row }) => <Payment row={row} />,
  },
  {
    header: "Actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];

const Payment = ({
  row,
}: {
  row: Row<NonNullable<GetOrdersQuery["orders"]>[0]>;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger
          asChild
          className="line-clamp-3 animate-pulse duration-5000 ease-linear"
        >
          <Button size={"icon"} variant={"secondary"}>
            <BanknoteIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-[420px] h-60 max-h-[450px]">
          <ScrollArea className="h-full flex flex-col space-y-2">
            <DataTable
              data={row.original?.transactions ?? []}
              columns={transactionCols}
              searchKey=""
              display={{
                filter: false,
                pagination: false,
              }}
            />
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          asChild
          className="line-clamp-3 animate-pulse duration-5000 ease-linear"
        >
          <Button size={"icon"} variant={"secondary"}>
            <ShoppingBasket />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-[420px] h-60 max-h-[450px]">
          <ScrollArea className="h-full flex flex-col space-y-2">
            <DataTable
              data={row.original?.orderItems ?? []}
              columns={orderItemsCols}
              searchKey=""
              display={{
                filter: false,
                pagination: false,
              }}
            />
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Adjust path if needed

export function Actions({
  row,
}: {
  row: Row<NonNullable<GetOrdersQuery["orders"]>[0]>;
}) {
  const [updateOrder, { loading }] = useMutation(UpdateOrderDocument,  {
    refetchQueries: [{query: GetOrdersDocument}],
  });
  const router = useRouter()
  const [isOpen, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    payload: OrderInputUpdate;
    label: string;
  } | null>(null);

  const handleUpdateOrder = async (payload: OrderInputUpdate) => {
    if (loading) return;
    await toast.promise(
      async () =>
        await updateOrder({
          variables: {
            orderId: row.original.id,
            payload: { ...payload },
          },
        }),
      {
        loading: "Updating Order...",
        success: () => {
          router.refresh();
          // setConfirmation(null); is correctly handled by AlertDialogAction's onClick
          return "Order Updated Successfully";
        },
        error: (error) => error.message,
      }
    );
  };

  const confirmAndUpdate = (payload: OrderInputUpdate, label: string) => {
    setConfirmation({ payload, label });
  };

  return (
    <>
        <PaymentForm
          row={row}
          isOpen={isOpen}
          setOpenDialog={setOpenDialog}
        />

      {/* Alert Dialog */}
      <AlertDialog open={!!confirmation} onOpenChange={() => setConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to mark this order as{" "}
              <strong>{confirmation?.label}</strong>?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmation?.payload) {
                  handleUpdateOrder(confirmation.payload);
                  setConfirmation(null);
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

     <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
  <DropdownMenuTrigger asChild>
    <Button variant={"ghost"} size={"icon"} type="button">
      <EllipsisVerticalIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Mark Order AS</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem
        className="space-x-3"
        onSelect={() => {
          setMenuOpen(false) // 👈 closes dropdown
          confirmAndUpdate({ status: OrderStatus.Confirmed }, "Confirmed")
        }}
      >
        <CheckCheck />
        <span>Confirmed</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="space-x-3"
        onSelect={() => {
          setMenuOpen(false)
          confirmAndUpdate({ status: OrderStatus.Cancelled }, "Cancelled")
        }}
      >
        <CircleOff />
        <span>Cancelled</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="space-x-3"
        onSelect={() => {
          setMenuOpen(false)
          confirmAndUpdate({ status: OrderStatus.Received }, "Received")
        }}
      >
        <PackageCheck />
        <span>Received</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuGroup>
      <DropdownMenuLabel>Mark Payment AS</DropdownMenuLabel>
      <DropdownMenuItem
        className="space-x-3"
        onSelect={() => {
          setMenuOpen(false)
          confirmAndUpdate(
            { paymentStatus: OrderPaymentStatusType.Full },
            "Payment: Full"
          )
        }}
      >
        <span>Full</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="space-x-3"
        onSelect={() => {
          setMenuOpen(false)
          confirmAndUpdate(
            { paymentStatus: OrderPaymentStatusType.Partial },
            "Payment: Partial"
          )
        }}
      >
        <span>Partial</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="space-x-3"
        onSelect={() => {
          setMenuOpen(false)
          setOpenDialog(true)
        }}
      >
        <PlusCircleIcon />
        <span>Add payment</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

    </>
  );
}


const paymentFormSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  transactionCode: z.string().optional(),
  type: z.string().optional(),
});

export const PaymentForm = ({
  row,
  isOpen,
  setOpenDialog,
}: {
  row: Row<NonNullable<GetOrdersQuery["orders"]>[0]>;
  isOpen: boolean;
  setOpenDialog: (open: boolean) => void;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      amount: "",
      phoneNumber: row.original?.customerPhone ?? "",
      transactionCode: "",
      type: "",
    },
  });
  const [addTransaction, { loading }] = useMutation(AddTransactionDocument, {
    refetchQueries: [{query: GetOrdersDocument}],
  });

  const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    toast.promise(
      async () =>
        await addTransaction({
          variables: {
            transaction: {
              orderId: row.original.id,
              amount: Number.parseFloat(data.amount),
              phoneNumber: row.original.customerPhone,
              type: data.type,
              transactionCode:
                data.transactionCode ??
                `test-${Math.random().toString(36).substring(2, 15)}`,
            },
          },
        }),
      {
        loading: "Adding Payment...",
        success: () => {
         router.refresh();
          setOpenDialog(false); // Keep this to close the dialog
          return "Payment Added Successfully";
        },
        error: (error) => {
          return error.message;
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CASH">Cash</SelectItem>
                      <SelectItem value="MPESA">M-Pesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues().type === "MPESA" && (
              <FormField
                control={form.control}
                name="transactionCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mpesa transaction code</FormLabel>
                    <Input
                      placeholder="Transaction code"
                      {...field}
                      type="string"
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-3">
              <Button
                className=""
                type="button"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button className="" type="submit">
                Add Payment
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
