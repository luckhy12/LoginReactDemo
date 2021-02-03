import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "./components/LoginPage";
import Details from "./components/Details";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/layout/AppLayout"
import UserList from "./components/User/UserList";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
      <AppLayout>
        <Switch>
         <PublicRoute exact path={["/", "/login"]} component={LoginPage} />
         <PublicRoute exact path="/register" component={Register} />
         <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute
            exact
            path="/details"
            component={Details}
          />
           <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
          />
           <ProtectedRoute
            exact
            path="/user"
            component={UserList}
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
