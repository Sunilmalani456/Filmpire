import React, { useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes as Switch, Route } from "react-router-dom";

import useStyles from "./Styles";
import { Actress, Movies, NavBar, Profile } from ".";
import MoviesInaformetion from "./MoviesInformetion/MoviesInformetion";
import useAlan from "./Alan";

function App() {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/actors/:id" element={<Actress />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/*" element={<Movies />} />
          <Route path="/approved" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MoviesInaformetion />} />
          {/* <Route path="/movie/:id" element={<MoviesInformetion />} /> */}
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}

export default App;
