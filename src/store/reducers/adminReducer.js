import {
  SEND_CANDIDATE,
  SEND_COMMITTEE,
  FETCH_CANDIDATES,
  FETCH_COMMITTEES,
  ADMIN_LOGIN
} from "../actions";
import _ from "lodash";

export default function(state = { token: "" }, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      console.log(action.payload);
      localStorage.setItem("TOKEN", action.payload.data.token);
      return state;
    case SEND_CANDIDATE:
      return { ...state, message: action.payload.data.message };
    case SEND_COMMITTEE:
      console.log(action.payload.data.message);
      return state;
    case FETCH_CANDIDATES:
      return _.mapKeys(action.payload.data, "sid");
    case FETCH_COMMITTEES:
      return _.mapKeys(action.payload.data, "_id");
    default:
      return state;
  }
}
