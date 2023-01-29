import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const leagueTypes = {
  HEAD2HEAD: "head2head",
  ROTISSERIE: "rotisserie",
  POINTS_LEAGUE: "pointsLeague",
  REDRAFT: "redraft",
};

const initialState = {
  // leagues the player has signed up for
  isLoading: true,
  signedLeagues: {
    head2head: null,
    rotisserie: null,
    pointsLeague: null,
    redraft: null,
  },
  selectedLeague: null,
};

//TODO move teamname out of here into team.
export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setSelectedLeague(state, action) {
      state.selectedLeague = leagueTypes[action.payload];
    },
    setLeagues(state, action) {
      //make request to get leagues and assign to signed leagues
      console.log(action);
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setSelectedLeague, setLeagues, setLoading } =
  leagueSlice.actions;
export default leagueSlice.reducer;
