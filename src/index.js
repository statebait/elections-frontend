// NPM imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

//Global CSS File
import "./style/index.scss";

//Private Routes
import PrivateRoute from "./utils/PrivateRoute";

//Store and Persistor
import { store, persistor } from "./store";

//Create-React-App Import for faster loading
import * as serviceWorker from "./serviceWorker";

//Component Imports
import LoginPage from "./components/Login/";
import PollMain from "./components/Poll/";
import AdminDashboard from "./components/AdminDashboard";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/admin" component={AdminDashboard} />
          <PrivateRoute path="/poll" component={PollMain} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
