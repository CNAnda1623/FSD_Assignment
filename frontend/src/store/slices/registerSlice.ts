import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../makeStore";

export interface RegisterStep1Data {
  region: string;
  firstName: string;
  lastName: string;
  agreed: boolean;
  newsletter: boolean;
}

export interface RegisterState {
  step: 1 | 2;
  step1: RegisterStep1Data;
  resendAvailableAt: number | null; // epoch milliseconds
  successDialogOpen: boolean;
}

const initialStep1: RegisterStep1Data = {
  region: "India",
  firstName: "",
  lastName: "",
  agreed: false,
  newsletter: false,
};

const initialState: RegisterState = {
  step: 1,
  step1: initialStep1,
  resendAvailableAt: null,
  successDialogOpen: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    saveStep1: (state, action: PayloadAction<RegisterStep1Data>) => {
      state.step1 = action.payload;
    },
    goToStep: (state, action: PayloadAction<1 | 2>) => {
      state.step = action.payload;
    },
    codeSent: {
      reducer(state, action: PayloadAction<number>) {
        state.resendAvailableAt = action.payload;
      },
      prepare() {
        return { payload: Date.now() + 60_000 };
      },
    },
    openSuccess: (state) => {
      state.successDialogOpen = true;
    },
    resetRegister: () => initialState,
  },
});

export const {
  saveStep1,
  goToStep,
  codeSent,
  openSuccess,
  resetRegister,
} = registerSlice.actions;

export const selectRegisterStep = (state: RootState): 1 | 2 =>
  state.register.step;
export const selectRegisterStep1 = (state: RootState): RegisterStep1Data =>
  state.register.step1;
export const selectResendAvailableAt = (state: RootState): number | null =>
  state.register.resendAvailableAt;
export const selectSuccessDialogOpen = (state: RootState): boolean =>
  state.register.successDialogOpen;

export default registerSlice.reducer;
