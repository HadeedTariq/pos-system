import Loading from "@/components/Loading";
import {
  useDeleiverOrderMutation,
  useCancelOrderMutation,
  useSellerNotificationsQuery,
} from "@/services/apiServices";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SellerNotificationsType } from "@/types/general";

const SellerNotifications = () => {
  const { data: notifications, isLoading } = useSellerNotificationsQuery();
  if (isLoading)
    return (
      <div className="h-[90vh]">
        <Loading />;
      </div>
    );
  return (
    <>
      {notifications?.map((notification, index) => (
        <NotificationComponent
          key={notification._id}
          notification={notification}
          index={index + 1}
        />
      ))}
    </>
  );
};

export default SellerNotifications;

function NotificationComponent({
  notification,
  index,
}: {
  notification: SellerNotificationsType;
  index: number;
}) {
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [deleiverOrder, { isLoading: isDeleivering }] =
    useDeleiverOrderMutation();
  return (
    <Card className="sm:col-span-2 mr-2">
      <CardHeader className="pb-3">
        <CardTitle>Order no {index} </CardTitle>
        <CardDescription className="capitalize max-w-lg font-lato leading-relaxed text-lg">
          {notification.message}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-2">
        {notification.order.status === "pending" && (
          <>
            <Button
              variant={"gradient"}
              className="font-ptSans"
              disabled={isDeleivering}
              onClick={async () => {
                deleiverOrder(notification.orderId);
              }}>
              Deleiver Order
            </Button>
            <Button
              variant={"destructive"}
              className="font-ptSans"
              disabled={isCancelling}
              onClick={async () => {
                cancelOrder(notification.orderId);
              }}>
              Cancel Order
            </Button>
          </>
        )}
        {notification.order.status === "reached" && (
          <Button variant={"info"} disabled>
            Reached
          </Button>
        )}
        {notification.order.status === "cancel" && (
          <Button variant={"destructive"} disabled>
            Canceled
          </Button>
        )}
        {notification.order.status === "delivered" && (
          <Button variant={"ghost"} disabled>
            Deleivered
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
