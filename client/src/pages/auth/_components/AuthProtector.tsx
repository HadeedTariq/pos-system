import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "@/services/apiServices";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { ArrowBigLeft } from "lucide-react";
import { setCurrentUser } from "@/reducers/fullAppReducer";

const AuthProtector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserDetailsQuery({});

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(user));
    }
  }, [user]);
  if (isLoading) return <Loading />;
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="h-[100vh]">
      <ArrowBigLeft
        cursor={"pointer"}
        size={30}
        onClick={() => navigate("/")}
      />
      <div className="flex items-center justify-center h-[95%]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthProtector;
