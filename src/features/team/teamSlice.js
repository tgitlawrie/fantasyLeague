import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get team from database and assign?
  isLoading: true,
  hasTeam: false,
  team: [],
  bench: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addPlayer(state) {
      state.team = null;
    },
    setTeam(state, { payload }) {
      state.team = payload;
    },
    hasTeam(state) {
      state.isLoading = false;
      state.hasTeam = true;
      console.log(`hasTeam` + state.team);
    },
  },
});

const { reducer, actions } = teamSlice;

export const { addPlayer, setTeam, hasTeam } = actions;
export default reducer;
