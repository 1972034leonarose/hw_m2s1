import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  token: string,
  isAuthorized: boolean,
  profile: object
}

const initialState: StateType = {
  token: "",
  isAuthorized: false,
  profile: {}
}

const authSlice = createSlice({
  name: "authorize",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthorized = true;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, setProfile, removeToken } = authSlice.actions;
export default authSlice.reducer;
