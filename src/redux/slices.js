import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authorize",
    initialState: {
        token: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = "";
        }
    }
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
 
