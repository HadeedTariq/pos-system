import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "@/utils/axios";
import {
  LoginSchema,
  RegisterSchema,
} from "@/pages/auth/validators/user.validator";

export const posApi = createApi({
  reducerPath: "posApi",
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
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
    }),
  }),
});

export const {
  useSendOtpMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = posApi;
