import { configureStore } from "@reduxjs/toolkit";
import { getMoviesData } from "./slices/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [getMoviesData.reducerPath]: getMoviesData.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getMoviesData.middleware),
});
