import { createListenerMiddleware } from "@reduxjs/toolkit";
import { Socket } from "phoenix";
import { subscribe } from "./socket/socket";

const listenerMiddleware = createListenerMiddleware();

let socket = null;

listenerMiddleware.startListening({
  actionCreator: subscribe,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const { token } = action.payload;

    socket = new Socket(`ws://localhost:4000/socket`, {
      params: { token },
      reconnectAfterMs: (_) => 10000,
      rejoinAfterMs: (_) => 10000,
      heartbeatIntervalMs: 10000,
    });

    socket.connect();
  },
});
