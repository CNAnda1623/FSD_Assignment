import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface GetMeResponse {
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginCodeRequest {
  email: string;
  code: string;
  rememberMe?: boolean;
}

export interface SendCodeRequest {
  email: string;
  purpose: "register" | "login" | "reset-password" | "delete-account";
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  region: string;
  role: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface DeleteAccountRequest {
  email?: string;
  code?: string;
}

export interface BasicResponse {
  success: boolean;
  message?: string;
  devCode?: string;
}

export interface LoginResponse {
  success: boolean;
  user: AuthUser;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, void>({
      query: () => "/me",
      providesTags: ["Session"],
    }),

    sendCode: builder.mutation<BasicResponse, SendCodeRequest>({
      query: (body) => ({
        url: "/send-code",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<BasicResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),

    loginCode: builder.mutation<LoginResponse, LoginCodeRequest>({
      query: (body) => ({
        url: "/login-code",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),

    logout: builder.mutation<BasicResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Session"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          // Ignore network errors on logout
        } finally {
          dispatch({ type: "auth/logoutUser" });
          dispatch(authApi.util.resetApiState());
        }
      },
    }),

    forgotPassword: builder.mutation<BasicResponse, { email: string }>({
      query: ({ email }) => ({
        url: "/send-code",
        method: "POST",
        body: { email, purpose: "reset-password" },
      }),
    }),

    resetPassword: builder.mutation<BasicResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),

    deleteAccount: builder.mutation<BasicResponse, DeleteAccountRequest | void>({
      query: (body) => ({
        url: "/delete-account",
        method: "POST",
        body: body ?? {},
      }),
      invalidatesTags: ["Session"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.resetApiState());
        } catch {
          dispatch(authApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useSendCodeMutation,
  useRegisterMutation,
  useLoginMutation,
  useLoginCodeMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
} = authApi;
