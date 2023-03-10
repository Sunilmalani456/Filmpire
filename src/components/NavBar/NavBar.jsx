import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  Icon,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useStyle from "./style";
import { Sidebar } from "../Sidebar/Sidebar";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import Search from "../Search/Search";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { setUser, userSelector } from "../../features/auth";

function NavBar() {
  const { isAuthenticated, user } = useSelector(userSelector);

  const [mobileOpen, setMobileOpen] = useState(false);
  console.log("NavBar");
  const classes = useStyle();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  console.log(user);
  // for login
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStroage = localStorage.getItem("session_id");
  const dispatch = useDispatch();

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStroage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStroage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              {" "}
              {/*an element*/}
              <Menu /> {/*an icon*/}
            </IconButton>
          )}
          {/*dark mode toggle button*/}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face$${user?.avatar?.tmdb?.avatar_path}`}
                />
                {/*<Avatar> is a styled image*/}
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {" "}
          {/*HTML5 div with navigation abilities*/}
          {isMobile ? (
            <Drawer
              variant="temporary" //toggleable
              anchor="right"
              open={mobileOpen} //by default mobileOpen == false
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }} //a way to override the underlying styles of the mui component
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} /> {/*a new component*/}
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} /> {/*a new component*/}
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default NavBar;
