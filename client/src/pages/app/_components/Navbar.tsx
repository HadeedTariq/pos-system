import ThemeHandler from "@/components/ThemeHandler";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <nav className="bg-white shadow-lg p-2 px-4 dark:bg-slate-800">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <span
              className="text-3xl bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-roboto cursor-pointer font-semibold"
              onClick={() => navigate("/")}>
              QuickSell
            </span>
          </div>
          <div className="flex items-center gap-3 ">
            {!currentUser && (
              <>
                <Link
                  to="/auth/login"
                  className="py-2 px-2 font-medium  rounded hover:underline transition duration-300">
                  Log In
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-violet-500 hover:bg-violet-600 transition duration-500  text-white rounded-md py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
            {currentUser?.role === "Seller" && (
              <Button
                onClick={() => navigate("/seller/createProduct")}
                variant={"gradient"}>
                Create Product
              </Button>
            )}
            <ThemeHandler />
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
