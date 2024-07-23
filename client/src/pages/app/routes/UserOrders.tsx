import Loading from "@/components/Loading";
import {
  useMyOrdersQuery,
  useUserCancelOrderMutation,
} from "@/services/apiServices";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "@/types/general";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const UserOrders = () => {
  const { isLoading, data } = useMyOrdersQuery();
  useEffect(() => {
    if (!isLoading) {
      toast({
        title: "Kindly Pay for your reached orders",
      });
    }
  }, []);
  if (isLoading)
    return (
      <div className="h-[90vh]">
        <Loading />;
      </div>
    );
  return (
    <div>
      <UserOrderTable orders={data} />
    </div>
  );
};

export default UserOrders;

export function UserOrderTable({
  orders,
}: {
  orders: OrderItem[] | undefined;
}) {
  const [cancelOrder] = useUserCancelOrderMutation();
  return (
    <Card className="mr-2">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage your orders here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] sm:table-cell">
                <span className="">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className=" md:table-cell">Price</TableHead>
              <TableHead className=" md:table-cell">Quantity</TableHead>
              <TableHead className=" md:table-cell">Total</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="sm:table-cell">
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={order.product.image}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {order.product.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className=" md:table-cell">
                  ${order.product.price}
                </TableCell>
                <TableCell className=" md:table-cell">
                  {order.productQuantity}
                </TableCell>
                <TableCell className=" md:table-cell">
                  ${order.totalPrice}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        disabled={order.status === "pending" ? false : true}
                        onClick={async () => {
                          await cancelOrder(order._id);
                        }}>
                        Cancel Order
                      </DropdownMenuItem>
                      {order.status === "cancel" && (
                        <DropdownMenuItem className="text-red-500">
                          Canceled
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem disabled={order.status !== "reached"}>
                        Pay
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            {orders?.length}-{orders?.length}
          </strong>{" "}
          of products
        </div>
      </CardFooter>
    </Card>
  );
}
