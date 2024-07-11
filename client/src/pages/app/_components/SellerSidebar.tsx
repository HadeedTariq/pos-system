import { Home, ShoppingBag } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const SellerSidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="flex h-screen ">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
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
                pathname === "/seller/dashboard/products" ? "bg-slate-700" : ""
              }`}>
              <ShoppingBag />
              Products
            </Link>
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SellerSidebar;
