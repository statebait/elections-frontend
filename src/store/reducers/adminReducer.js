import {
  SEND_CANDIDATE_START,
  SEND_CANDIDATE_END,
  SEND_COMMITTEE_START,
  SEND_COMMITTEE_END,
  FETCH_CANDIDATES,
  FETCH_COMMITTEES,
  GET_RESULT
} from "../actions/actions";

const INITIAL_STATE = {
  token: "",
  candidate: {
    message: "",
    list: []
  },
  committee: {
    message: "",
    list: []
  },
  results: []
};

export default function(state = INITIAL_STATE, action) {
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
      return { ...state, candidate: { list: action.payload.data } };
    case FETCH_COMMITTEES:
      return { ...state, committee: { list: action.payload.data } };
    case GET_RESULT:
      return { ...state, results: action.payload.data.allResults };
    default:
      return state;
  }
}
