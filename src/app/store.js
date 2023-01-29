import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/forms/loginSlice";
import { reducer as formReducer } from "redux-form";
import navbarReducer from "../features/navbar/navbarSlice";
import teamReducer from "../features/team/teamSlice";
import draftReducer from "../features/team/draftSlice";
import playerReducer from "../features/playerCard/playerCardSlice";
import leaderReducer from "../features/leaderboard/leaderSlice";
import leaguereducer from "../features/league/leaguereducer";
import axios from "axios";

const storeReducers = combineReducers({
  login: loginReducer,
  navbar: navbarReducer,
  form: formReducer,
  team: teamReducer,
  draft: draftReducer,
  playercard: playerReducer,
  leaderboard: leaderReducer,
  league: leaguereducer,
});

// this set up allows for state reset on logout
const rootReducer = (state, action) => {
  if (action.type === "navbar/signOut") {
    state = undefined;
  }
  if (action.type === "RESTORE_STATE") {
    state = action.payload;
  }
  return storeReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// if state has changed, make request to update state in session store.
let prevState = null;
store.subscribe(() => {
  const state = store.getState();
  if (prevState !== state) {
    axios.post("/users/save-state", state);
  }
  prevState = state;
});
