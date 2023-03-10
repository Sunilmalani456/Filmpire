import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movieContainer: {
    display: "flex",
    flexWrap: "warp",
    justifyContent: "space-between",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
