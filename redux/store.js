import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducers";
import { getMoviesApi } from "./slices/apiSlice";
import searchReducer from "./slices/searchSlice";
import favoriteReducer from "./slices/favoritesSlices";

const store = configureStore({
  reducer: {
    rootReducers: rootReducers,
    // fav: favoriteReducer,
    [getMoviesApi.reducerPath]: getMoviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getMoviesApi.middleware),
});

export default store;
