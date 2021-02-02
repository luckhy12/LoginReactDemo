import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!localStorage.token) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: "/dashboard" }} />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.login && state.login.loginData,
  };
};

export default connect(mapStateToProps, null)(PublicRoute);
