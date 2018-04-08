import {
  LOGIN_AUTH,
  DISPLAY_POLL,
  NEXT_POLL,
  STORE_POLL,
  VOTE_STORE,
  FINAL_SUBMIT
} from "../actions";

let key = 0;
let allCommittees = [];
let vote = [];

export default function(
  state = { finalState: false, committee: {}, all: [] },
  action
) {
  switch (action.type) {
    case LOGIN_AUTH:
      console.log("Logged in!");
      return state;
    case STORE_POLL:
      allCommittees = action.payload.data;
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
      return state;
    case FINAL_SUBMIT:
      console.log(vote);
      return state;
    default:
      return state;
  }
}
