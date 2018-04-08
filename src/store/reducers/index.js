import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "./login_reducer";
import adminReducer from "./admin_reducer";

const rootReducer = combineReducers({
  form: formReducer,
  login: loginReducer,
  admin: adminReducer
});

export default rootReducer;
