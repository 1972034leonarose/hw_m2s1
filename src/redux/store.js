import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
