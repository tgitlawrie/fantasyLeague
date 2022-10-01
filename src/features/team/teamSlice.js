import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get team from database and assign?
  isLoading: true,
  hasTeam: false,
  team: {
    C: {},
    LW: {},
    RW: {},
    LD: {},
    RD: {},
    G: {},
  },
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
      //set team state based on postion
      payload.forEach((player) => {
        if (player.position === "C") state.team.C = player;
        if (player.position === "LW") state.team.LW = player;
        if (player.position === "RW") state.team.RW = player;
        if (player.position === "LD") state.team.LD = player;
        if (player.position === "RD") state.team.RD = player;
        if (player.position === "G") state.team.G = player;
      });
    },
    hasTeam(state) {
      state.isLoading = false;
      state.hasTeam = true;
    },
  },
});

const { reducer, actions } = teamSlice;

export const { addPlayer, setTeam, hasTeam } = actions;
export default reducer;
