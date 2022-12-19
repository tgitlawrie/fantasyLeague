import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  expanded: false,
  lock: false,
};

const playerCardSlice = createSlice({
  name: "playercard",
  initialState,
  reducers: {
    expandOff(state) {
      if (!state.lock) state.expanded = false;
    },
    expandOn(state) {
      if (!state.lock) state.expanded = true;
    },
    lockExpand(state, action) {
      state.lock = action;
    },
  },
});

const { reducer, actions } = playerCardSlice;

export const { expandOff, expandOn, lockExpand } = actions;
export default reducer;
