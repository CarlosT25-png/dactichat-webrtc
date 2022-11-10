import { createSlice } from "@reduxjs/toolkit";

const initialRoomState = {
  identity: '',
  isRoomHost: false
};

const roomSlice = createSlice({
  name: 'room',
  initialState: initialRoomState,
  reducers: {
    setIsRoomHost(state, action) {
      state.isRoomHost = action.payload;
    }
  }
})

export default roomSlice;