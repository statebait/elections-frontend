import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import pollReducer from "./pollReducer";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  poll: pollReducer,
  admin: adminReducer
});

export default rootReducer;
