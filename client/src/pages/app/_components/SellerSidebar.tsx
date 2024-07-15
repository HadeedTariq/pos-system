import { BellRing, Home, ShoppingBag } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SellerSidebarSheet from "./SellerSidebarSheet";

const SellerSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-[90vh]  w-full">
      <div className="flex flex-col relative w-64 z-30 h-[90vh] max-[900px]:hidden">
        <div className="flex flex-col fixed w-52 z-50 h-[94vh]  bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">
              Seller Dashboard
            </span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
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
                to="products"
                className={`flex items-center px-4 py-2 mt-2 gap-2 text-gray-100 hover:bg-gray-700 ${
                  pathname === "/seller/dashboard/notifications"
                    ? "bg-slate-700"
                    : ""
                }`}>
                <BellRing />
                Notifications
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <SellerSidebarSheet />
      <div className="w-full h-fit">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerSidebar;
