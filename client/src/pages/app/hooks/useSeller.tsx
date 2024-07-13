import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useSeller = () => {
  const seller = useSelector((state: StoreState) => state.sellerReducer);
  return { ...seller };
};
