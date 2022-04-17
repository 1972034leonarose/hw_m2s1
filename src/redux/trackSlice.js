import { createSlice } from "@reduxjs/toolkit";

export const trackSlice = createSlice({
  name: "tracks",
  initialState: {
    tracks: {},
    selectedTracks: {},
  },
  reducers: {
    // tracks that are being searched
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setSelectedTracks: (state, action) => {
      state.selectedTracks = action.payload;
    },
  },
});

export const { setTracks, setSelectedTracks } = trackSlice.actions;
export default trackSlice.reducer;
