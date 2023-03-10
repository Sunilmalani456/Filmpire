import React from "react";
import { Grid } from "@mui/material";
import useStyles from "./Style";
import { Movie } from "../Movie/Movie";

export const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  // console.log(MovieList);
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid container className={classes.movieContainer}>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};
