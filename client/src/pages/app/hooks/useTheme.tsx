import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useTheme = () => {
  const { theme } = useSelector((state: StoreState) => state.fullAppReducer);
  return { theme };
};
