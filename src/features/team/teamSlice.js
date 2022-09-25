import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get team from database and assign?
  isLoading: true,
  team: [],
  bench: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addPlayer(state, payload) {
      state.team = null;
    },
    setTeam(state, { payload }) {
      console.log(payload);
      state.team = payload;
    },
  },
});

const { reducer, actions } = teamSlice;

export const { addPlayer, setTeam } = actions;
export default reducer;
