import {
  SEND_CANDIDATE,
  SEND_COMMITTEE,
  FETCH_CANDIDATES,
  FETCH_COMMITTEES
} from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case SEND_CANDIDATE:
      // console.log(action.payload.data.message);
      return state;
    case SEND_COMMITTEE:
      // console.log(action.payload.data.message);
      return state;
    case FETCH_CANDIDATES:
      return _.mapKeys(action.payload.data, "sid");
    case FETCH_COMMITTEES:
      return _.mapKeys(action.payload.data, "_id");
    default:
      return state;
  }
}
