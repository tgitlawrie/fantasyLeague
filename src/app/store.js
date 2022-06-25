import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/forms/loginSlice";
import { reducer as formReducer } from "redux-form";
import navbarReducer from "../features/navbar/navbarSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    navbar: navbarReducer,
    form: formReducer,
  },
});
