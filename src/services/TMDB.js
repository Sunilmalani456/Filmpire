import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),

  endpoints: (builder) => ({
    /*Get Movie Genres*/
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // get movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        } //for search functionality

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        } //for categories
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        } //for genres
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`; //by default
      },
    }),

    /*Get Movie*/
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    /*Get Recommended Movies*/
    // getList: builder.query({
    //   query: ({
    //     listName,
    //     accountId,
    //     sessionId,
    //     page,
    //   }) => `/account/${accountId}/${listName}?api_key=1056e7134c2cd97a56cc1f66078fd147&session_id=${sessionId}
    //   &page=${page}`,
    // }),

    /*Get Recommended Movies*/
    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),

    /*Get Actor's Details*/
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    /*Get Movies By Actor's Id*/
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),

    /*Get Favorited Or Watchlisted Movies*/
    getList: builder.query({
      query: ({ accountId, sessionId, page, list }) =>
        `account/${accountId}/${list}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
