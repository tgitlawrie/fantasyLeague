import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  score: 0,
};
//TODO move teamname out of here into team.
export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    signIn: (state, payload) => {
      state.isSignedIn = true;
      state.score = payload.score;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { signIn, signOut } = navbarSlice.actions;

// selector to get isSignedIn Value
export const selectSignedIn = (state) => state.navbar.isSignedIn;

export default navbarSlice.reducer;
