import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SocketState {
  rooms: Record<string, any>[];
  messages: Record<string, any>[];
}

const initialState = {
  rooms: [],
  messages: [],
} as SocketState;

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    subscribe: (_, _action: PayloadAction<{ token: string }>) => {},
    setRooms: (state, action: PayloadAction<Record<string, any>[]>) => {
      state.rooms = action.payload;
    },
    setMessages: (state, action: PayloadAction<Record<string, any>[]>) => {
      state.messages = action.payload;
    },
    changeChannel: (_state, _action: PayloadAction<string>) => {},
  },
});

export const { subscribe } = socketSlice.actions;
