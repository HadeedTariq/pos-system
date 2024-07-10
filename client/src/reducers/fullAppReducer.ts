import { createSlice } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";
export type LoggedInUser = {
  name: string;
  email: string;
  _id: string;
  role: string;
};

export type FullAppState = {
  theme: Theme;
  storageKey: string;
  currentUser: LoggedInUser | undefined;
};

const initialState: FullAppState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
  storageKey: "vite-ui-theme",
  currentUser: undefined,
};

const fullAppReducer = createSlice({
  name: "fullAppReducer",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: Theme }) => {
      localStorage.setItem(state.storageKey, payload);
      state.theme = payload;
    },
    setCurrentUser: (state, { payload }: { payload: LoggedInUser }) => {
      state.currentUser = payload;
    },
  },
});

export const { setTheme, setCurrentUser } = fullAppReducer.actions;
export default fullAppReducer.reducer;
