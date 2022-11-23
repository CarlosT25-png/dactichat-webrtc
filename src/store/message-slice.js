import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: []
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      state.message = [...state.message, action.payload];
    }
  }
})

export default messageSlice;