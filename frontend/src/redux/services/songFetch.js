import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchApi = createApi({
  reducerPath: "fetchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  endpoints: (builders) => ({
    getTopArtists: builders.query({
      query: () => `/topartists`,
    }),
    getArtistDetail: builders.query({
      query: (artistId) => `/artists/${artistId}`,
    }),
    getSongDetail: builders.query({
      query: (songid) => `/songs/${songid}`,
    }),
    getDiscoverCharts: builders.query({
      query: () => `/discover`,
      transformResponse: (response) => {
        return response;
      },
    }),
    getSongsByGenre: builders.query({
      query: (genreListId) => `/discover/${genreListId}`,
      transformResponse: (response) => {
        return response;
      },
    }),
    getAroundYouTracks: builders.query({
      query: () => `/around-you`,
    }),
    getTopChart: builders.query({
      query: () => `/topcharts`,
      transformResponse: (response) => {
        return response;
      },
    }),
    getSearchTracks: builders.query({
      query: (searchString) => `/search/${searchString}`,
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetSongsByGenreQuery,
  useGetTopArtistsQuery,
  useGetSearchTracksQuery,
  useGetArtistDetailQuery,
  useGetSongDetailQuery,
  useGetAroundYouTracksQuery,
  useGetDiscoverChartsQuery,
  useGetTopChartQuery,
} = fetchApi;
