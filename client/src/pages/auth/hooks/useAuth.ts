import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const authReducer = useSelector((state: StoreState) => state.authReducer);
  return { ...authReducer };
};
