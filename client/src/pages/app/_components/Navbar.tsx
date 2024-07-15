import ThemeHandler from "@/components/ThemeHandler";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useGetUserDetailsQuery } from "@/services/apiServices";
import { setCurrentUser } from "@/reducers/fullAppReducer";
import { useDispatch } from "react-redux";
import MenuHandler from "./MenuHandler";

const Navbar = () => {
  const { currentUser } = useApp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetUserDetailsQuery({});

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(user));
    }
  }, [user]);
  return (
    <div className="flex flex-col  w-full">
      <nav className="bg-white shadow-lg relative h-[60px] max-[460px]:h-[95px] w-full   dark:bg-slate-800">
        <div
          className="flex justify-between z-40
          fixed max-[460px]:flex-col w-full p-2 bg-white dark:bg-slate-800 h-[60px] items-center max-[460px]:h-[95px] gap-2">
          <span
            className="text-3xl z-50 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-roboto cursor-pointer font-semibold"
            onClick={() => navigate("/")}>
            QuickSell
          </span>
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
            {currentUser?.role === "Seller" && (
              <Button
                onClick={() => navigate("/seller/dashboard")}
                variant={"neutral"}>
                Dashboard
              </Button>
            )}
            <ThemeHandler />
            <MenuHandler />
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
