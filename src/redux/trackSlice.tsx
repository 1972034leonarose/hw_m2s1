import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  tracks: Array<object>;
  selectedTracks: Array<object>;
  playlist: boolean;
};

const initialState: StateType = {
  tracks: [],
  selectedTracks: [],
  playlist: false
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    // tracks that are being searched
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    // selected tracks to add to playlist
    setSelectedTracks: (state, action) => {
      state.selectedTracks = action.payload;
    },
    // playlist successfully created or not
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    }
  },
});

export const { setTracks, setSelectedTracks, setPlaylist } = trackSlice.actions;
export default trackSlice.reducer;
