import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useApp = () => {
  const app = useSelector((state: StoreState) => state.fullAppReducer);
  return { ...app };
};
