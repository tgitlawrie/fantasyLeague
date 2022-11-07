import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get team from database and assign?
  isLoading: true,
  team: {
    name: "",
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
    setTeam(state, { payload }) {
      console.log(payload);
      state.team.name = payload.teamname;
      state.team.logo = payload.logo;
      //set team state based on postion
      payload.team.forEach((player) => {
        if (player.position === "C") state.team.C = player;
        if (player.position === "LW") state.team.LW = player;
        if (player.position === "RW") state.team.RW = player;
        if (player.position === "LD") state.team.LD = player;
        if (player.position === "RD") state.team.RD = player;
        if (player.position === "G") state.team.G = player;
      });
    },
  },
});

const { reducer, actions } = teamSlice;

export const { setTeam } = actions;
export default reducer;
