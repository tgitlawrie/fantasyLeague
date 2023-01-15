import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activeTab: "weekly",
  isLoading: false,
};

const leaderSlice = createSlice({
  name: "leaderSlice",
  initialState,
  reducers: {
    changeTab(state, action) {
      state.activeTab = action.payload;
    },
    tabIsLoading(state, action) {
      state.isLoading = action;
    },
  },
});

const { reducer, actions } = leaderSlice;

export const { changeTab, tabIsLoading } = actions;
export default reducer;
