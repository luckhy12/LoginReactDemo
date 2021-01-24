import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({ component: Component, loginData, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.token) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};

export default connect(mapStateToProps, null)(ProtectedRoute);
