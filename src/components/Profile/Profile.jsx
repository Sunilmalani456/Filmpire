import React, { useEffect } from "react";
// import { useSelector } from "redux-react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "../RatedCards/RatedCards";

function Profile() {
  console.log("Profile");
  const { user } = useSelector((state) => state.user); //user is depend on what we define in store user: userReducer,
  // console.log("state.user", user);

  /*seting the initial value of isMovieFavorited/isMovieWatchlisted*/
  const { data: favoriteMovies, refetch: refetchFavorited } = useGetListQuery({
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
    list: "favorite/movies",
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
      list: "watchlist/movies",
    });

  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favirite or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
}

export default Profile;
