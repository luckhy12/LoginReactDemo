import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Details from "./components/Details";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute
            exact
            path="/Details"
            component={Details}
            loginData={props.data.loginData}
          />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    data: state.login,
    error: state.error,
  };
};

export default connect(mapStateToProps, null)(App);
