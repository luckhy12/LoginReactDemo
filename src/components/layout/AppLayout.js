import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppHeaderBarDrawer from "../../components/layout/AppHeaderBarDrawer";
import { registerUser } from "../../services/UserService";
// import Footer from "common/components/Footer/Footer";

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
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
        {localStorage.token ? (
          <AppHeaderBarDrawer />
        ) : (
          null
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
		  {this.props.children}
        </main>
        {/* {this.props.location.pathname == "/login" ||
          this.props.location.pathname == "/registration"} */}
        {/* <Footer /> */}
      </div>
    );
  }
}
const mapDispatchToProps = {
	registerUser,
  };
  const mapStateToProps = (state) => {
	return {
	  data: state.login,
	};
  };
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AppLayout)
);
