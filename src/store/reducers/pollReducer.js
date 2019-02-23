import {
  ASYNC_STORE,
  STORE_POLL,
  DISPLAY_POLL,
  VOTE_STORE,
  GO_BACK,
  FINAL_SUBMIT,
  STORE_ERROR
} from "../actions/actions";

const INITIAL_STATE = {
  key: 0,
  finalState: false,
  currentCommittee: {},
  allCommittees: [],
  sid: "",
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
          finalState: false,
          currentCommittee: state.allCommittees[state.key]
        };
      } else {
        return {
          ...state,
          finalState: true
        };
      }
    // if (state.key === state.allCommittees.length - 1) {
    //   return {
    //     ...state,
    //     finalState: true
    //   };
    // } else {
    //   return {
    //     ...state,
    //     finalState: false,
    //     currentCommittee: state.allCommittees[state.key]
    //   };
    // }
    case VOTE_STORE:
      return {
        ...state,
        key: state.key + 1,
        vote: [...state.vote, action.payload]
      };
    case GO_BACK:
      const newVote = state.vote;
      newVote.pop();
      return {
        ...state,
        key: state.key - 1,
        vote: newVote
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
