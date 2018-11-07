import {
  SEND_CANDIDATE,
  SEND_COMMITTEE,
  FETCH_CANDIDATES,
  FETCH_COMMITTEES,
  ADMIN_LOGIN,
  GET_RESULT
} from "../actions";
import _ from "lodash";
import auth from "../../utils/authChecker";

export default function(state = { token: "" }, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      const token = action.payload.data.token;
      auth.authenticate(token);
      localStorage.setItem("TOKEN", token);
      return state;
    case SEND_CANDIDATE:
      return { ...state, message: action.payload.data.message };
    case SEND_COMMITTEE:
      return { ...state, message: action.payload.data.message };
    case FETCH_CANDIDATES:
      return _.mapKeys(action.payload.data, "sid");
    case FETCH_COMMITTEES:
      return _.mapKeys(action.payload.data, "_id");
    case GET_RESULT:
      return { ...state, results: action.payload.data.allResults };
    default:
      return state;
  }
}
