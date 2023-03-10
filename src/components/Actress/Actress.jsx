import React, { useState } from "react";
import useStyle from "./style";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import { MovieList } from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

function Actress() {
  // eslint-disable-next-line no-console
  console.log("Actress");
  const classes = useStyle();
  const { id } = useParams();
  const [page, setpage] = useState(1);
  const { data, error, isFetching } = useGetActorsDetailsQuery(id);
  const { data: movies, isFetching: isMoviesFetching } =
    useGetMoviesByActorIdQuery({ id, page });
  const history = useNavigate();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry, no biography yet..."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>
          Movies
        </Typography>
        {!isMoviesFetching &&
          (movies && movies?.results?.length ? (
            <>
              <MovieList movies={movies} numberOfMovies={12} />
              <Pagination
                currentPage={page}
                setPage={setpage}
                totalPages={movies?.total_pages}
              />
            </>
          ) : (
            <Box>
              <Typography variant="h6" align="center">
                Sorry, nothing was found.
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
}

export default Actress;
