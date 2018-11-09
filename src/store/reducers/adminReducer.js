import {
  SEND_CANDIDATE_START,
  SEND_CANDIDATE_END,
  SEND_COMMITTEE_START,
  SEND_COMMITTEE_END,
  FETCH_CANDIDATES,
  FETCH_COMMITTEES,
  GET_RESULT
} from "../actions/actions";
import _ from "lodash";

export default function(
  state = {
    token: "",
    candidate: {
      message: ""
    },
    committee: {
      message: ""
    }
  },
  action
) {
  switch (action.type) {
    case SEND_CANDIDATE_START:
      return { ...state, candidate: { message: "" } };
    case SEND_CANDIDATE_END:
      return { ...state, candidate: { message: action.payload } };
    case SEND_COMMITTEE_START:
      return { ...state, committee: { message: "" } };
    case SEND_COMMITTEE_END:
      return { ...state, committee: { message: action.payload } };
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
