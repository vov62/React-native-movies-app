import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    ADD_TO_FAVORITE: (state, action) => {
      return { ...state, favorite: [...state.favorite, { ...action.payload }] };
    },
    REMOVE_FROM_FAVORITE: (state, action) => {
      return {
        ...state,
        favorite: state.favorite.filter((f) => f.id !== action.payload),
      };
    },
    REMOVE_FAVORITE: (state) => {
      return {
        ...state,
        favorite: [],
      };
    },
  },
});

export const { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE, REMOVE_FAVORITE } =
  favoriteSlice.actions;

export const favoriteData = (state) => state.rootReducers.favorite;

export default favoriteSlice.reducer;
