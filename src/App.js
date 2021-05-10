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
import AppLayout from "./components/layout/AppLayout";
import UserList from "./components/User/UserList";
import RolesPage from "./components/Roles/RolesPage";
import ClientsPage from "./components/Clients/ClientsPage";
import ChangePassword from "./components/User/ChangePassword";
import VoiceCalls from "./components/VoiceCalls/VoiceCalls";
import CustomerPage from "./components/Engage/CustomerPage";
import EmailTemplatePage from "./components/Templates/EmailTemplatePage";
import SMSTemplatePage from "./components/Templates/SMSTemplatePage";
import ScriptTemplatePage from "./components/Templates/ScriptTemplatePage";
import CalendarPage from "./components/Calendar/CalendarPage";
import ReportingPage from "./components/Reports/Reporting";
import BillingPage from "./components/Bills/BillingPage";
import CustomerDetail from "./components/Engage/CustomerDetail";
import VideoCallPage from "./components/VideoCalls/VideoCallPage";
import MessageLogsPage from "./components/Reports/MessageLogs";
import VoiceCallLogsPage from "./components/Reports/VoiceCallLogs";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            <PublicRoute exact path={["/", "/login"]} component={LoginPage} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute
              exact
              path="/forgot-password"
              component={ForgotPassword}
            />
            <ProtectedRoute exact path="/details" component={Details} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/engage" component={CustomerPage} />
            <ProtectedRoute
              exact
              path="/email-template"
              component={EmailTemplatePage}
            />
            <ProtectedRoute
              exact
              path="/sms-template"
              component={SMSTemplatePage}
            />
            <ProtectedRoute
              exact
              path="/script-template"
              component={ScriptTemplatePage}
            />
            <ProtectedRoute exact path="/calendar" component={CalendarPage} />
            <ProtectedRoute exact path="/reporting" component={ReportingPage} />
            <ProtectedRoute exact path="/biling" component={BillingPage} />
            <ProtectedRoute exact path="/user" component={UserList} />
            <ProtectedRoute exact path="/roles" component={RolesPage} />
            <ProtectedRoute exact path="/clients" component={ClientsPage} />
            <ProtectedRoute
              exact
              path="/change-password"
              component={ChangePassword}
            />
            <ProtectedRoute exact path="/voice-calls" component={VoiceCalls} />
            <ProtectedRoute
              path="/customer/details"
              component={CustomerDetail}
            />
            <ProtectedRoute
              path="/customer/Video-call"
              component={VideoCallPage}
            />
            <ProtectedRoute path="/email-logs" component={ReportingPage} />
            <ProtectedRoute path="/sms-logs" component={MessageLogsPage} />
            <ProtectedRoute path="/voicecall-logs" component={VoiceCallLogsPage} />
            <ProtectedRoute path="/videocall-logs" component={ReportingPage} />
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
