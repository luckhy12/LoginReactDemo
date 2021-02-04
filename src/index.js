import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReduxStore from "./ReduxStore";
import { Provider } from "react-redux";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';

ReactDOM.render(
  <Provider store={ReduxStore.getDefaultStore().store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <NotificationContainer />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
