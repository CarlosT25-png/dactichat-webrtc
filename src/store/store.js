import { configureStore } from '@reduxjs/toolkit';
import roomSlice from './room-slice';
import videosSlice from './videos-slice';

export const store = configureStore({
  reducer: {
    room: roomSlice.reducer,
    videos: videosSlice.reducer
  }
});


export const roomActions = roomSlice.actions;
export const videosActions = videosSlice.actions;
