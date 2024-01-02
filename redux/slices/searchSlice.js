import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieName: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    MOVIE_SEARCH: (state, action) => {
      return { ...state, movieName: action.payload };
    },
    RESET_MOVIE_SEARCH: (state) => {
      return { ...state, movieName: "" };
    },
  },
});

export const { MOVIE_SEARCH, RESET_MOVIE_SEARCH } = searchSlice.actions;

export const searchResultsData = (state) => state.rootReducers.search;

export default searchSlice.reducer;
