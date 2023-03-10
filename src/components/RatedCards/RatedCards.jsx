import { Typography, Box } from "@mui/material";
import React from "react";
import { Movie } from "../Movie/Movie";
import useStyles from "./style";

export const RatedCards = ({ title, data }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};
