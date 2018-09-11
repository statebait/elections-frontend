import axios from "axios";
import { reset } from "redux-form";

const ROOT_URL = "http://localhost:5000/";

export const OPEN_POLL = "open_poll";
export const OPEN_ADMIN = "open_admin";
export const LOGIN_FAIL = "login_fail";
export const SEND_CANDIDATE = "send_candidate";
export const SEND_COMMITTEE = "send_committee";
export const FETCH_CANDIDATES = "fetch_candidates";
export const FETCH_COMMITTEES = "fetch_committees";
export const DISPLAY_POLL = "display_poll";
export const HASH_FINAL = "hash_final";
export const NEXT_POLL = "next_poll";
export const STORE_POLL = "store_poll";
export const VOTE_STORE = "vote_store";
export const FINAL_SUBMIT = "final_submit";
export const ADMIN_LOGIN = "admin_login";
export const LOADING_START = "loading_start";
export const LOADING_END = "loading_end";

export function loginAuth(values) {
  const request = axios.post(`${ROOT_URL}login`, values);
  return dispatch => {
    dispatch({
      type: LOADING_START
    });
    request.then(data => {
      if (
        data.data.message === "Incorrect Password" ||
        data.data.message === "User Not Found" ||
        data.data.message === "User Has Already Voted"
      ) {
        dispatch({
          type: LOGIN_FAIL,
          payload: data
        });
        dispatch({ type: LOADING_END });
      } else {
        if (data.data.admin === true) {
          dispatch({ type: OPEN_ADMIN });
          dispatch({ type: ADMIN_LOGIN, payload: data });
          dispatch({ type: LOADING_END });
        } else {
          dispatch({ type: OPEN_POLL });
          dispatch({
            type: STORE_POLL,
            payload: data
          });
          dispatch({
            type: DISPLAY_POLL
          });
          dispatch({
            type: HASH_FINAL,
            payload: values
          });
          dispatch({ type: LOADING_END });
        }
      }
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

export function finalSubmit(vote, token) {
  console.log(vote);
  console.log(token);
  const request = axios({
    method: "post",
    url: `${ROOT_URL}vote`,
    data: vote,
    headers: { "x-access-token": token }
  });
  return dispatch => {
    request.then(
      dispatch({
        type: FINAL_SUBMIT,
        payload: vote
      })
    );
  };
}

export function sendCandidate(values, token) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}candidate`,
    data: values,
    headers: { "x-access-token": token }
  });
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

export function sendCommittee(values, token) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}committee`,
    data: values,
    headers: { "x-access-token": token }
  });
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
