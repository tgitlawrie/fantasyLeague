import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  draftStage: 1,
  isDraftComplete: false,
  newTeam: {
    logo: "",
    name: "",
    C: {},
    LW: {},
    RW: {},
    LD: {},
    RD: {},
    G: {},
  },
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
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
    setDraftStage(state, action) {
      state.draftStage = action.payload;
    },
    isDraftComplete(state, action) {
      state.isDraftComplete = action.payload;
    },
    setLogo(state, action) {
      // add url with scaling
      // split the url at upload and insert transformation
      const tranformation = "upload/c_scale,w_200/";
      const splitUrl = action.payload.split("upload/");
      const transformedUrl = splitUrl[0] + tranformation + splitUrl[1];
      state.newTeam.logo = transformedUrl;
    },
    setNewTeam(state, { payload }) {
      if (!payload.position) state.newTeam.name = payload;
      if (payload.position === "C") state.newTeam.C = payload;
      if (payload.position === "LW") state.newTeam.LW = payload;
      if (payload.position === "RW") state.newTeam.RW = payload;
      if (payload.position === "LD") state.newTeam.LD = payload;
      if (payload.position === "RD") state.newTeam.RD = payload;
      if(payload.savePct) state.newTeam.G = payload;
    },
    saveNewTeam(state, action) {
      console.log(`saveNewTeam ${action.payload}`);
      // send to server for save
      axios({
        method: "post",
        url: "/players/team/new",
        data: action.payload,
      });
    },
  },
});

const { reducer, actions } = draftSlice;

export const {
  advanceDraft,
  retreatDraft,
  setNewTeam,
  setLogo,
  saveNewTeam,
  setDraftStage,
  isDraftComplete,
} = actions;
export default reducer;
