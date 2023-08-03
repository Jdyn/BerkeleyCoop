import { configureStore } from "@reduxjs/toolkit";
import { accountApi } from ".";
import { eventApi } from ".";

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([accountApi.middleware, eventApi.middleware]),
});
