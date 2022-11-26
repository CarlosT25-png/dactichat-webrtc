import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: []
};

const videosSlice = createSlice({
  name: 'videos',
  initialState: initialState,
  reducers: {
    setVideos(state, action) {
      state.videos = [...state.videos, action.payload];
    }
  }
})

export default videosSlice;