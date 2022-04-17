import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  tracks: Array<object>;
  selectedTracks: Array<object>;
};

const initialState: StateType = {
  tracks: [],
  selectedTracks: [],
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
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
