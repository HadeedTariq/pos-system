import Loading from "@/components/Loading";
import { useSellerNotificationsQuery } from "@/services/apiServices";

const SellerNotifications = () => {
  const { data: notifications, isLoading } = useSellerNotificationsQuery({});
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  return <div></div>;
};

export default SellerNotifications;
