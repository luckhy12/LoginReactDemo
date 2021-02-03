import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  link: {
    color: "white!important",
    textDecoration: 'none!important',
    pointer:'cursor!important',
  },
}));

export default function UnAuthHeader() {
  const classes = useStyles();
  //   const theme = useTheme();
  //   let history = useHistory();

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4">
            <Link className={classes.link} to="/">
              Dial Sight{" "}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
