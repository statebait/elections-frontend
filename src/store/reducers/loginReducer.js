import {
  LOGIN_FAIL,
  OPEN_POLL,
  DISPLAY_POLL,
  NEXT_POLL,
  STORE_POLL,
  VOTE_STORE,
  FINAL_SUBMIT,
  HASH_FINAL,
  OPEN_ADMIN,
  VOTER_LOGIN,
  LOADING_START,
  LOGOUT,
  LOADING_END
} from "../actions";
import auth from "../../utils/authChecker";

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
  page: "",
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_END:
      return {
        ...state,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case OPEN_POLL:
      return { ...state, page: "poll" };
    case OPEN_ADMIN:
      return { ...state, page: "admin" };
    case LOGOUT:
      auth.logout();
      localStorage.removeItem("TOKEN");
      return { ...state, page: "" };
    case VOTER_LOGIN:
      const token = action.payload.data.token;
      auth.authenticate(token);
      localStorage.setItem("TOKEN", token);
      return state;
    case HASH_FINAL:
      return {
        ...state,
        sid: action.payload.sid
      };
    case STORE_POLL:
      allCommittees = action.payload.data.list;
      return { ...state, token: action.payload.data.token, submitMessage: "" };
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
      key = 0;
      return {
        ...state,
        submitMessage: action.payload.data.message,
        page: "",
        finalState: false
      };
    default:
      return state;
  }
}
