import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/forms/loginSlice";
import { reducer as formReducer } from "redux-form";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    form: formReducer,
  },
});
