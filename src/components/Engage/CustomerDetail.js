import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";


const styles = (theme) => ({
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
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexGrow: 1,
  },
  heading: {
    fontWeight: "bold",
    marginTop: 30,
    paddingBottom: 30,
  },
  headingName: {
    fontWeight: "bold",
    color: "black"
  },
  outerTitleIcons: {
    width: 100,
    height: 100,
    marginBottom: 3,
    marginLeft: 5,
    borderRadius: 50,
  },
});

class CustomerDetail extends React.Component {
  render() {
    const { classes, location } = this.props;

    return (
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              component="h5"
              gutterBottom
              className={classes.heading}
            >
              Customer Overview
            </Typography>
          </Grid>

          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Typography component="div">
                  <Box
                    fontWeight="fontWeightBold"
                    m={1}
                    textAlign="left"
                    color="black"
                  >
                    <img src="Task.png" alt="Task" className={classes.outerTitleIcons} />
                  </Box>
                </Typography>
                <Typography variant="h5" className={classes.headingName}>
                  {location.state.customerData.customerName_chr}
                </Typography>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Typography
                  variant="h5"
                  component="h5"
                  gutterBottom
                  className={classes.heading}
                >
                  Customer Overview
                </Typography>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Typography
                  variant="h5"
                  component="h5"
                  gutterBottom
                  className={classes.heading}
                >
                  Customer Overview
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => {
  return {
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetail))
);
