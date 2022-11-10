import { createSlice } from "@reduxjs/toolkit";

const initialRoomState = {
  identity: '',
  isRoomHost: false,
  connectOnlyWithAudio: false
};

const roomSlice = createSlice({
  name: 'room',
  initialState: initialRoomState,
  reducers: {
    setIsRoomHost(state, action) {
      state.isRoomHost = action.payload;
    },
    setConnectOnlyWithAudio(state, action) {
      state.connectOnlyWithAudio = action.payload;
    }
  }
})

export default roomSlice;