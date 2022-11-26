import { createSlice } from "@reduxjs/toolkit";

const initialRoomState = {
  identity: '',
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  showOverlay: true,
  showParticipants: false,
  participants: []
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
    },
    setRoomId(state, action) {
      state.roomId = action.payload
    },
    setIdentity(state, action){
      state.identity = action.payload;
    },
    setShowOverlay(state, action){
      state.showOverlay = action.payload;
    },
    setParticipants(state, action){
      state.participants = action.payload
    },
    setShowParticipants(state, action){
      state.showParticipants = action.payload
    }
  }
})

export default roomSlice;