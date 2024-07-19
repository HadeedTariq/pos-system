import { BellRing, Home, ListOrdered } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const UserSideElement = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <nav className="flex-1 px-2 py-4  min-[900px]:bg-gray-800">
        <Link
          to=""
          className={`flex items-center px-4 py-2 gap-2 text-gray-100 hover:bg-gray-700 ${
            pathname === "/dashboard" ? "bg-slate-700" : ""
          }`}>
          <Home />
          Home
        </Link>
        <Link
          to="orders"
          className={`flex items-center px-4 py-2 gap-2 text-gray-100 hover:bg-gray-700 ${
            pathname === "/dashboard/orders" ? "bg-slate-700" : ""
          }`}>
          <ListOrdered />
          Orders
        </Link>
        <Link
          to="notifications"
          className={`flex items-center px-4 py-2 gap-2 text-gray-100 hover:bg-gray-700 ${
            pathname === "/dashboard/notifications" ? "bg-slate-700" : ""
          }`}>
          <BellRing />
          Notifications
        </Link>
      </nav>
    </div>
  );
};

export default UserSideElement;
