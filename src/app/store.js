import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/forms/loginSlice";
import { reducer as formReducer } from "redux-form";
import navbarReducer from "../features/navbar/navbarSlice";
import teamReducer from "../features/team/teamSlice";

const storeReducers = combineReducers({
  login: loginReducer,
  navbar: navbarReducer,
  form: formReducer,
  team: teamReducer,
});

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
