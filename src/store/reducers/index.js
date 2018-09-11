import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "./loginReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  form: formReducer,
  login: loginReducer,
  admin: adminReducer
});

export default rootReducer;
