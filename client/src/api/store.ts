import { configureStore } from "@reduxjs/toolkit";
import { accountApi } from ".";
import { eventApi } from ".";
import { chatApi } from ".";

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
		[chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([accountApi.middleware, eventApi.middleware, chatApi.middleware]),
});
