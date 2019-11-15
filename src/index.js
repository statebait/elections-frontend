import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PrivateRoute from "./utils/PrivateRoute";
import { store, persistor } from "./store";
//Service Worker
import * as serviceWorker from "./serviceWorker";
//Global CSS File
import "./style/index.scss";

//Component Imports
const LoginPage = lazy(() => import("./components/Login/"));
const PollMain = lazy(() => import("./components/Poll"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

//react-toastify configuration
toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 4000,
  pauseOnHover: false
});

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <PrivateRoute path="/admin" component={AdminDashboard} />
            <PrivateRoute path="/poll" component={PollMain} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      </PersistGate>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
