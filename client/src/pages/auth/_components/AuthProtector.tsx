import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { setUser } from "../reducer/authReducer";

const AuthProtector = () => {
  const dispatch = useDispatch();
  const { data: user } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const { data } = await authApi.get("/");
      dispatch(setUser(data));
      return data;
    },
  });
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Outlet />
    </div>
  );
};

export default AuthProtector;
