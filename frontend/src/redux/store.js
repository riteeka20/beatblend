import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { fetchApi } from "./services/songFetch";
export const store = configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});
