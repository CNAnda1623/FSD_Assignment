import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authApi, type AuthUser } from "../api/authApi";
import type { RootState } from "../makeStore";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
}

const initialState: AuthState = {
  status: "loading",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "anonymous";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Session established: getMe fulfilled
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.user;
      })
      // 2. Login (password or code) fulfilled
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.loginCode.matchFulfilled
        ),
        (state, action) => {
          state.status = "authenticated";
          state.user = action.payload.user;
        }
      )
      // 3. getMe rejected (including after re-auth failure)
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
        state.status = "anonymous";
        state.user = null;
      })
      // 4. Session terminated: logout, deleteAccount, resetPassword fulfilled
      .addMatcher(
        isAnyOf(
          authApi.endpoints.logout.matchFulfilled,
          authApi.endpoints.deleteAccount.matchFulfilled,
          authApi.endpoints.resetPassword.matchFulfilled
        ),
        (state) => {
          state.status = "anonymous";
          state.user = null;
        }
      );
  },
});

export const { logoutUser } = authSlice.actions;

export const selectAuthStatus = (state: RootState): AuthStatus =>
  state.auth.status;
export const selectUser = (state: RootState): AuthUser | null =>
  state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.status === "authenticated";
export const selectDisplayName = (state: RootState): string =>
  state.auth.user?.name ?? "";

export default authSlice.reducer;
