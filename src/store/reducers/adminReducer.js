import {
  SEND_CANDIDATE_START,
  SEND_CANDIDATE_END,
  SEND_COMMITTEE_START,
  SEND_COMMITTEE_END,
  FETCH_CANDIDATES,
  FETCH_COMMITTEES,
  DELETE_CANDIDATE,
  DELETE_COMMITTEE,
  DELETE_CANDIDATE_ERROR,
  DELETE_COMMITTEE_ERROR,
  GET_RESULT,
  GET_STATS
} from "../actions/actions";

const INITIAL_STATE = {
  token: "",
  candidate: {
    message: "",
    error: false,
    list: []
  },
  committee: {
    message: "",
    error: false,
    list: []
  },
  results: [],
  stats: {}
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
      return {
        ...state,
        candidate: { list: action.payload.data, message: "" }
      };
    case FETCH_COMMITTEES:
      return {
        ...state,
        committee: { list: action.payload.data, message: "" }
      };
    case DELETE_CANDIDATE:
      return {
        ...state,
        candidate: { ...state.candidate, message: "Deleted Candidate" }
      };
    case DELETE_CANDIDATE_ERROR:
      return {
        ...state,
        candidate: { ...state.candidate, message: "Delete Failed", error: true }
      };
    case DELETE_COMMITTEE:
      return {
        ...state,
        committee: { ...state.committee, message: "Deleted Committee" }
      };
    case DELETE_COMMITTEE_ERROR:
      return {
        ...state,
        candidate: { ...state.committee, message: "Delete Failed", error: true }
      };
    case GET_RESULT:
      return { ...state, results: action.payload.data.allResults };
    case GET_STATS:
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}
