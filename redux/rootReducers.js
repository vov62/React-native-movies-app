import { combineReducers } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favoritesSlices";
import searchReducer from "./slices/searchSlice";

const rootReducer = combineReducers({
  favorite: favoriteReducer,
  search: searchReducer,
});

export default rootReducer;
