import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import trackReducer from "./trackSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    track: trackReducer
  },
});
