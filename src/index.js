// NPM imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import thunk from "redux-thunk";

//Global CSS File
import "./style/index.scss";

//Private Routes
import PrivateRoute from "./utils/PrivateRoute";

//Reducer
import reducers from "./store/reducers";

//Create-React-App Import for faster loading
import * as serviceWorker from "./serviceWorker";

//Component Imports
import LoginPage from "./components/Login/";
import PollMain from "./components/Poll/";
import AdminDashboard from "./components/AdminDashboard";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin" component={AdminDashboard} />
        <PrivateRoute path="/poll" component={PollMain} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
