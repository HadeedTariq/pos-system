import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../hooks/useApp";

const SellerProtector = () => {
  const { currentUser } = useApp();
  if (currentUser?.role !== "Seller") return <Navigate to={"/"} />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default SellerProtector;
