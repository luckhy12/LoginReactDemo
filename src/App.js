import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Details from "./components/Details";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/layout/AppLayout"

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute
            exact
            path="/details"
            component={Details}
            loginData={props.data.loginData}
          />
           <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
            loginData={props.data.loginData}
          />
        </Switch>
        </AppLayout>
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
