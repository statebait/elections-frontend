// NPM imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import thunk from "redux-thunk";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

//Global CSS File
import "./style/index.css";

//Reducer
import reducers from "./store/reducers";

//Create-React-App Import for faster loading
import registerServiceWorker from "./registerServiceWorker";

//Component Imports
import { fakeAuth } from "./components/auth";
import LoginPage from "./components/login_page";
import PollMain from "./components/poll/poll_main";
import AdminMain from "./components/admin/admin_main";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={AdminMain} />
        <Route path="/poll" component={PollMain} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
