import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  draftStage: 1,
  newPlayer: {},
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    addPlayer(state, action) {
      state.newPlayer = { ...action.payload };
      axios({
        method: "post",
        url: "/players/team/add",
        data: state.newPlayer,
      });
    },
    advanceDraft(state) {
      if (state.draftStage < 8) {
        state.draftStage++;
        // console.log("draft+");
      }
    },
    retreatDraft(state) {
      if (state.draftStage > 0) {
        state.draftStage--;
      }
    },
  },
});

const { reducer, actions } = draftSlice;

export const { advanceDraft, retreatDraft, addPlayer } = actions;
export default reducer;
