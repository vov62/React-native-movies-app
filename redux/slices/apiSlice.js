import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Config } from "react-native-config";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "9c671f038c52e7e08dcdf195b04cd325";
const trendingMoviesEndpoint = `/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `/movie/top_rated?api_key=${apiKey}`;

export const getMoviesApi = createApi({
  reducerPath: "getMoviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query({
      query: () => trendingMoviesEndpoint,
    }),
    getUpcomingMovies: builder.query({
      query: () => upcomingMoviesEndpoint,
    }),
    topRatedMovies: builder.query({
      query: () => topRatedMoviesEndpoint,
    }),
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=${apiKey}`,
    }),
    getActorsDetails: builder.query({
      query: (id) => `/movie/${id}/credits?api_key=${apiKey}`,
    }),
    getSimilarMovies: builder.query({
      query: (id) => `/movie/${id}/similar?api_key=${apiKey}`,
    }),
    getActorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${apiKey}`,
    }),
    getActorMovies: builder.query({
      query: (id) => `/person/${id}/movie_credits?api_key=${apiKey}`,
    }),

    getSearchTerm: builder.query({
      query: (q) => `/search/movie?query=${q}&api_key=${apiKey}`,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useTopRatedMoviesQuery,
  useGetMovieDetailsQuery,
  useGetActorsDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetActorDetailsQuery,
  useGetActorMoviesQuery,
  useGetSearchTermQuery,
} = getMoviesApi;
