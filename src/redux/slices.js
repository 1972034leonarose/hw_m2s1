import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authorize",
    initialState: {
        token: "",
        isAuthorized: false,
        profile: {}
    },
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
        }
    }
});

export const { setToken, setProfile, removeToken } = authSlice.actions;
export default authSlice.reducer;
 
