import { BellRing, Home, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SellerSideElement = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <nav className="flex-1 px-2 py-4 min-[900px]:bg-gray-800">
        <Link
          to=""
          className={`flex items-center px-4 py-2 gap-2 text-gray-100 hover:bg-gray-700 ${
            pathname === "/seller/dashboard" ? "bg-slate-700" : ""
          }`}>
          <Home />
          Home
        </Link>
        <Link
          to="products"
          className={`flex items-center px-4 py-2 mt-2 gap-2 text-gray-100 hover:bg-gray-700 ${
            pathname === "/seller/dashboard/products"
              ? "bg-slate-700"
              : pathname.includes("details")
              ? "bg-slate-700"
              : ""
          }`}>
          <ShoppingBag />
          Products
        </Link>
        <Link
          to="notifications"
          className={`flex items-center px-4 py-2 mt-2 gap-2 text-gray-100 hover:bg-gray-700 ${
            pathname === "/seller/dashboard/notifications" ? "bg-slate-700" : ""
          }`}>
          <BellRing />
          Notifications
        </Link>
      </nav>
    </div>
  );
};

export default SellerSideElement;
