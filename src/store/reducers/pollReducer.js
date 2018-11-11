import {
  ASYNC_STORE,
  STORE_POLL,
  DISPLAY_POLL,
  VOTE_STORE,
  FINAL_SUBMIT,
  STORE_ERROR
} from "../actions/actions";

const INITIAL_STATE = {
  key: 0,
  finalState: false,
  currentCommittee: {},
  allCommittees: [],
  sid: 0,
  vote: [],
  submitMessage: "",
  validationError: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ASYNC_STORE:
      return {
        ...state,
        sid: action.payload.sid
      };
    case STORE_POLL:
      return {
        ...state,
        allCommittees: action.payload.data.list,
        submitMessage: ""
      };
    case DISPLAY_POLL:
      if (state.allCommittees[state.key] != null) {
        return {
          ...state,
          currentCommittee: state.allCommittees[state.key]
        };
      } else {
        return {
          ...state,
          finalState: true
        };
      }
    case VOTE_STORE:
      return {
        ...state,
        key: state.key + 1,
        vote: [...state.vote, action.payload]
      };
    case STORE_ERROR:
      return { ...state, validationError: action.payload };
    case FINAL_SUBMIT:
      return {
        ...state,
        key: 0,
        submitMessage: action.payload,
        finalState: false,
        vote: [],
        allCommittees: [],
        currentCommittee: {},
        validationError: ""
      };
    default:
      return state;
  }
}
