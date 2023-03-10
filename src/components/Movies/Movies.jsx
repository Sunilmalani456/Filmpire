import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
  // Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";
// redux-Slice
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

function Movies() {
  // eslint-disable-next-line no-console
  console.log("Movies");
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 17 : 19;
  const [page, setpage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  console.log(selectGenreOrCategory);
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No Movies that Match That Name...
          <br />
          Please Search For Somthing else...
        </Typography>
      </Box>
    );
  }

  if (error) return "An Error Has Occured..";

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setpage}
        totalPage={data.total_pages}
      />
    </div>
  );
}

export default Movies;
