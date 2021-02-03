import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppHeaderBarDrawer from "../../components/layout/AppHeaderBarDrawer";
import UnAuthHeader from "../../components/layout/UnAuthHeader";
import { registerUser } from "../../services/UserService";
import CircularProgress from '@material-ui/core/CircularProgress';
// import Footer from "common/components/Footer/Footer";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
});

class AppLayout extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getProfileData();
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <CircularProgress /> */}
        {this.props.data.token ? <AppHeaderBarDrawer /> : <UnAuthHeader />}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}
const mapDispatchToProps = {
  registerUser,
};
const mapStateToProps = (state) => {
  return {
    data: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AppLayout)
);
