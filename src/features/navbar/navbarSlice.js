import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  teamname: "",
  score: 0,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    signIn: (state, payload) => {
      state.isSignedIn = true;
      state.teamname = payload.teamname;
      state.score = payload.score;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.teamname = initialState.teamname;
      state.score = initialState.score;
      localStorage.removeItem("token");
    },
    userTeam: (state, payload) => {
      state.userTeam = payload;
    },
  },
});

export const { signIn, signOut } = navbarSlice.actions;

// selector to get isSignedIn Value
export const selectSignedIn = (state) => state.navbar.isSignedIn;

export default navbarSlice.reducer;
