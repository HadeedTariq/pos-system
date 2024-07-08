import { createSlice } from "@reduxjs/toolkit";
import { RegisterSchema } from "../validators/user.validator";

export type AuthState = {
  user: RegisterSchema | null;
};
const initialState: AuthState = {
  user: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: RegisterSchema }) => {
      state.user = payload;
    },
  },
});

export default authReducer.reducer;

export const { setUser } = authReducer.actions;
