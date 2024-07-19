import { Outlet } from "react-router-dom";
import UserSideElement from "./UserSidebarElement";
import UserSidebarSheet from "./UserDashboardSideSheet";

const UserDashboardSidebar = () => {
  return (
    <div className="flex h-[90vh]  w-full">
      <div className="flex flex-col relative w-64 z-30 h-[90vh] max-[900px]:hidden">
        <div className="flex flex-col fixed w-52 z-50 h-[94vh]  bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">
              User Dashboard
            </span>
          </div>
          <UserSideElement />
        </div>
      </div>
      <UserSidebarSheet />
      <div className="w-full h-fit overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardSidebar;
