import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/forms/loginSlice";
import { reducer as formReducer } from "redux-form";
import navbarReducer from "../features/navbar/navbarSlice";
import teamReducer from "../features/team/teamSlice";
import draftReducer from "../features/team/draftSlice";
import playerReducer from "../features/playerCard/playerCardSlice";
import axios from "axios";

const storeReducers = combineReducers({
  login: loginReducer,
  navbar: navbarReducer,
  form: formReducer,
  team: teamReducer,
  draft: draftReducer,
  playercard: playerReducer,
});

// this set up allows for state reset on logout
const rootReducer = (state, action) => {
  if (action.type === "navbar/signOut") {
    state = undefined;
  }
  return storeReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  console.log("store called");
  const state = store.getState();
  axios.post("/users/save-state", state);
});
