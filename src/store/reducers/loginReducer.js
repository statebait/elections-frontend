import {
  LOGIN_FAIL,
  OPEN_POLL,
  DISPLAY_POLL,
  NEXT_POLL,
  STORE_POLL,
  VOTE_STORE,
  FINAL_SUBMIT,
  HASH_FINAL,
  OPEN_ADMIN
} from "../actions";

let key = 0;
let allCommittees = [];
let vote = [];

const INITIAL_STATE = {
  finalState: false,
  committee: {},
  all: [],
  sid: 0,
  vote: [],
  token: "",
  message: "",
  page: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_FAIL:
      console.log("LOGIN FAILED:", action.payload.data.message);
      return {
        ...state,
        message: action.payload.data.message,
        error: "Login has failed. Please try again"
      };
    case OPEN_POLL:
      return { ...state, page: "poll" };
    case OPEN_ADMIN:
      return { ...state, page: "admin" };
    case HASH_FINAL:
      console.log(action.payload.sid);
      return {
        ...state,
        sid: action.payload.sid
      };
    case STORE_POLL:
      console.log("Store Poll :", action.payload.data);
      allCommittees = action.payload.data.list;
      return { ...state, token: action.payload.data.token };
    case DISPLAY_POLL:
      if (allCommittees[key] != null) {
        return { ...state, committee: allCommittees[key], all: allCommittees };
      } else {
        return {
          ...state,
          finalState: true
        };
      }
    case NEXT_POLL:
      key++;
      return state;
    case VOTE_STORE:
      vote.push(action.payload);
      return {
        ...state,
        vote: vote
      };
    case FINAL_SUBMIT:
      console.log(vote);
      return state;
    default:
      return state;
  }
}
