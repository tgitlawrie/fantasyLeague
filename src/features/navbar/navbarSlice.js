import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.isSignedIn = false;
    },
  },
});

export const { signIn, signOut } = navbarSlice.actions;

// selector to get isSignedIn Value
export const selectSignedIn = (state) => state.navbar.isSignedIn;

export default navbarSlice.reducer;
