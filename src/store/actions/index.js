import axios from "axios";
import { reset } from "redux-form";

const ROOT_URL = "http://localhost:5000/";

export const LOGIN_AUTH = "login_auth";
export const SEND_CANDIDATE = "send_candidate";
export const SEND_COMMITTEE = "send_committee";
export const FETCH_CANDIDATES = "fetch_candidates";
export const FETCH_COMMITTEES = "fetch_committees";
export const DISPLAY_POLL = "display_poll";
export const NEXT_POLL = "next_poll";
export const STORE_POLL = "store_poll";
export const VOTE_STORE = "vote_store";
export const FINAL_SUBMIT = "final_submit";

export function loginAuth(values) {
  const request = axios.post(`${ROOT_URL}login`, values);

  return dispatch => {
    request.then(data => {
      dispatch({ type: LOGIN_AUTH });
      dispatch({
        type: STORE_POLL,
        payload: data
      });
    });
  };
}
export function nextPoll() {
  return dispatch => {
    dispatch({ type: NEXT_POLL });
    dispatch({ type: DISPLAY_POLL });
  };
}

export function voteStore(voteDetail) {
  return dispatch => {
    dispatch({
      type: VOTE_STORE,
      payload: voteDetail
    });
    dispatch(reset("votepoll"));
  };
}

export function finalSubmit(vote) {
  return dispatch => {
    dispatch({
      type: FINAL_SUBMIT,
      payload: vote
    });
  };
}

export function sendCandidate(values) {
  const request = axios.post(`${ROOT_URL}candidate`, values);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: SEND_CANDIDATE,
        payload: request
      });
      dispatch(reset("candForm"));
    });
  };
}

export function sendCommittee(values) {
  const request = axios.post(`${ROOT_URL}committee`, values);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: SEND_COMMITTEE,
        payload: data
      });
      dispatch(reset("commForm"));
    });
  };
}

export function fetchCandidates() {
  const request = axios.get(`${ROOT_URL}candidate`);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: FETCH_CANDIDATES,
        payload: data
      });
    });
  };
}

export function fetchCommittees() {
  const request = axios.get(`${ROOT_URL}committee`);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: FETCH_COMMITTEES,
        payload: data
      });
    });
  };
}
