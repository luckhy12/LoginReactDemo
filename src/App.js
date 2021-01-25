import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Details from "./components/Details";
import Register from "./components/Register";
import {NotificationContainer} from 'react-notifications';

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute
            exact
            path="/Details"
            component={Details}
            loginData={props.data.loginData}
          />
        </Switch>
      </BrowserRouter>
      <NotificationContainer/>
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
