import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  outerTitleIcons: {
    width: 15,
    height: 15,
    marginBottom: 3,
    marginLeft: 5,
  },
  root: {
    flexGrow: 1,
    padding: 15,
  },
  innerroot: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  innerpaper: {
    minWidth: 275,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor: "#F4F2FF",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function MiniDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" gutterBottom>
            Dashboard Overview
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.search}>
            <Box display="flex" justifyContent="flex-end">
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
          </div>
        </Grid>

        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography component="div">
              <Box
                fontWeight="fontWeightBold"
                m={1}
                textAlign="left"
                color="black"
              >
                Today's Task{" "}
                <img src="Task.png" className={classes.outerTitleIcons} />
              </Box>
            </Typography>

            <Card className={classes.innerpaper}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                style={{ textAlign: "left" }}
                title="Maureen Biologist"
                action={<Chip size="small" label="1:30 pm" color="#27F190" />}
                subheader="Call, 2nd Try"
              />
            </Card>
            <Card className={classes.innerpaper}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                style={{ textAlign: "left" }}
                action={<Chip size="small" label="Anytime" color="secondary" />}
                title="Maureen Biologist"
                subheader="Call, 2nd Try"
              />
            </Card>

            {/* --------- */}
          </Paper>
        </Grid>
        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <Paper className={classes.paper}>
            {" "}
            <Typography component="div">
              <Box
                fontWeight="fontWeightBold"
                m={1}
                textAlign="left"
                color="black"
              >
                This week stats{" "}
                <img src="Vector.png" className={classes.outerTitleIcons} />
              </Box>
            </Typography>
            {/* -----------------Inner Content Cell 2 --------------- */}
            <Card className={classes.innerpaper}>
              <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Calls Made
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Reached
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Won
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card className={classes.innerpaper}>
              <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Calls Made
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Reached
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Won
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card className={classes.innerpaper}>
              <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Calls Made
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Reached
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Typography align="left" variant="subtitle2">
                    Won
                  </Typography>
                  <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    50
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            {/* ------------------------------------------ */}
          </Paper>
        </Grid>
        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography component="div">
              <Box
                fontWeight="fontWeightBold"
                m={1}
                textAlign="left"
                color="black"
              >
                Live Feed{" "}
                <img src="LiveFeed.png" className={classes.outerTitleIcons} />
              </Box>
            </Typography>
            {/* -----------------Inner Content Cell 3 --------------- */}

            <Card className={classes.innerpaper}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    JD
                  </Avatar>
                }
                style={{ textAlign: "left" }}
                title="John Doe"
                subheader="Just Now"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
            </Card>

            <Card className={classes.innerpaper}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    JD
                  </Avatar>
                }
                style={{ textAlign: "left" }}
                title="John Doe"
                subheader="Just Now"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
            </Card>

            {/* ------------------------------------------ */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
