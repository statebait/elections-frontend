import axios from "axios";
import { reset } from "redux-form";

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
export const GET_RESULT = "get_result";
export const VOTER_LOGIN = "voter_login";
export const LOGOUT = "logout";
export const LOADING_START = "loading_start";
export const LOADING_END = "loading_end";

export function loginAuth(values) {
  const request = axios.post(`${process.env.REACT_APP_ROOT_URL}login`, values);
  return dispatch => {
    dispatch({
      type: LOADING_START
    });
    request
      .then(data => {
        if (data.data.admin === true) {
          dispatch({ type: ADMIN_LOGIN, payload: data });
          dispatch({ type: OPEN_ADMIN });
          dispatch({ type: LOADING_END });
        } else {
          dispatch({ type: VOTER_LOGIN, payload: data });
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
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data });
        dispatch({ type: LOADING_END });
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch({
      type: LOGOUT
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
  const request = axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}vote`,
    data: vote,
    headers: { "x-access-token": token }
  });
  return dispatch => {
    request.then(data => {
      dispatch({
        type: FINAL_SUBMIT,
        payload: data
      });
    });
  };
}

export function sendCandidate(values, token) {
  const request = axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}candidate`,
    data: values,
    headers: { "x-access-token": token }
  });
  return dispatch => {
    request.then(data => {
      dispatch({
        type: SEND_CANDIDATE,
        payload: data
      });
      dispatch(reset("candForm"));
    });
  };
}

export function sendCommittee(values, token) {
  const request = axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}committee`,
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

export function fetchCandidates(token) {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${process.env.REACT_APP_ROOT_URL}candidate`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: FETCH_CANDIDATES,
        payload: data
      });
    });
  };
}

export function fetchCommittees(token) {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${process.env.REACT_APP_ROOT_URL}committee`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: FETCH_COMMITTEES,
        payload: data
      });
    });
  };
}

export function getResult(token) {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${process.env.REACT_APP_ROOT_URL}result`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: GET_RESULT,
        payload: data
      });
    });
  };
}
