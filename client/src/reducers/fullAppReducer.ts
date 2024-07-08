import { createSlice } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";

export type FullAppState = {
  theme: Theme;
  storageKey: string;
};

const initialState: FullAppState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
  storageKey: "vite-ui-theme",
};

const fullAppReducer = createSlice({
  name: "fullAppReducer",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: Theme }) => {
      localStorage.setItem(state.storageKey, payload);
      state.theme = payload;
    },
  },
});

export const { setTheme } = fullAppReducer.actions;
export default fullAppReducer.reducer;
