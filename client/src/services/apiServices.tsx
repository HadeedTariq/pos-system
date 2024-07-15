import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "@/utils/axios";
import {
  LoginSchema,
  RegisterSchema,
} from "@/pages/auth/validators/user.validator";
import { Product } from "@/pages/app/reducer/sellerReducer";
import { SellerNotificationsType } from "@/types/general";

export const posApi = createApi({
  reducerPath: "posApi",
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
  tagTypes: ["ProductMutate", "AllProducts", "SellerNotifications"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user: RegisterSchema) => ({
        url: "/auth/sendOtp",
        method: "POST",
        body: user,
      }),
    }),
    sendOtp: builder.mutation({
      query: (user: RegisterSchema & { otp: string }) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user: LoginSchema) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["AllProducts"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query({
      query: () => "/auth/",
    }),
    createProduct: builder.mutation({
      query: (product: FormData) => ({
        url: "/inventory/createProduct",
        body: product,
        method: "POST",
      }),
      invalidatesTags: ["ProductMutate"],
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/inventory/deleteProduct?productId=${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductMutate"],
    }),
    editProduct: builder.mutation({
      query: (product: any) => ({
        url: `/inventory/editProduct`,
        body: product,
        method: "PUT",
      }),
      invalidatesTags: ["ProductMutate"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/inventory/products",
      }),
      providesTags: ["AllProducts"],
    }),
    orderProduct: builder.mutation({
      query: (product: any) => ({
        url: "/inventory/orderProduct",
        body: product,
        method: "POST",
      }),
      invalidatesTags: ["AllProducts"],
    }),
    getSellerProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/inventory/seller/products",
      }),
      providesTags: ["ProductMutate"],
    }),
    sellerNotifications: builder.query<SellerNotificationsType[], void>({
      query: () => ({
        url: "/inventory/seller/notifications",
      }),
      providesTags: ["SellerNotifications"],
    }),
    deleiverOrder: builder.mutation({
      query: (orderId: string) => ({
        url: "/inventory/seller/deleiverProduct",
        method: "PUT",
        body: { orderId },
      }),
      invalidatesTags: ["SellerNotifications"],
    }),
    cancelOrder: builder.mutation({
      query: (orderId: string) => ({
        url: "/inventory/seller/cancelOrder",
        method: "PUT",
        body: { orderId },
      }),
      invalidatesTags: ["SellerNotifications"],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserDetailsQuery,
  useCreateProductMutation,
  useGetSellerProductsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
  useOrderProductMutation,
  useLogoutUserMutation,
  useSellerNotificationsQuery,
  useDeleiverOrderMutation,
  useCancelOrderMutation,
} = posApi;
