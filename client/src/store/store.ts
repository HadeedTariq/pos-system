import sellerReducer, { SellerState } from "@/pages/app/reducer/sellerReducer";
import authReducer, { AuthState } from "@/pages/auth/reducer/authReducer";
import fullAppReducer, { FullAppState } from "@/reducers/fullAppReducer";
import { posApi } from "@/services/apiServices";
import { configureStore } from "@reduxjs/toolkit";

// ! All reducers types are defined here to use in selectors
export interface StoreState {
  fullAppReducer: FullAppState;
  authReducer: AuthState;
  sellerReducer: SellerState;
}

export const store = configureStore({
  reducer: {
    fullAppReducer,
    authReducer,
    sellerReducer,
    [posApi.reducerPath]: posApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(posApi.middleware),
});
