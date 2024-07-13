import { createSlice } from "@reduxjs/toolkit";
export interface Product {
  _id: string;
  name: string;
  creator: string;
  price: number;
  image: string;
  details: string;
  extraImages: string[]; // Array of image URLs as strings
  stock: number;
  category: string;
  used: boolean;
  outOfStock: boolean;
  purchasers: string[]; // Array of purchaser IDs (strings)
  createdAt: string;
  updatedAt: string;
}

export type SellerState = {
  products: Product[];
};

const initialState: SellerState = {
  products: [],
};

const sellerReducer = createSlice({
  name: "sellerReducer",
  initialState,
  reducers: {
    setProducts: (state, { payload }: { payload: Product[] }) => {
      state.products = payload;
    },
  },
});

export const { setProducts } = sellerReducer.actions;
export default sellerReducer.reducer;
