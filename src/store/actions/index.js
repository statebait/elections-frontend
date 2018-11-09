import axios from "axios";
import { reset } from "redux-form";
import * as actions from "./actions";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

export function loginAuth(values) {
  const request = axios.post(`${API_URL}login`, values);
  return dispatch => {
    dispatch({
      type: actions.LOADING_START
    });
    request
      .then(data => {
        if (data.data.admin === true) {
          dispatch({ type: actions.ADMIN_LOGIN, payload: data });
          dispatch({ type: actions.OPEN_ADMIN });
          dispatch({ type: actions.LOADING_END });
        } else {
          dispatch({ type: actions.VOTER_LOGIN, payload: data });
          dispatch({ type: actions.OPEN_POLL });
          dispatch({
            type: actions.STORE_POLL,
            payload: data
          });
          dispatch({
            type: actions.DISPLAY_POLL
          });
          dispatch({
            type: actions.HASH_FINAL,
            payload: values
          });
          dispatch({ type: actions.LOADING_END });
        }
      })
      .catch(err => {
        dispatch({ type: actions.LOGIN_FAIL, payload: err.response.data });
        dispatch({ type: actions.LOADING_END });
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch({
      type: actions.LOGOUT
    });
  };
}

export function nextPoll() {
  return dispatch => {
    dispatch({ type: actions.NEXT_POLL });
    dispatch({ type: actions.DISPLAY_POLL });
  };
}

export function voteStore(voteDetail) {
  return dispatch => {
    dispatch({
      type: actions.VOTE_STORE,
      payload: voteDetail
    });
    dispatch(reset("votepoll"));
  };
}

export function finalSubmit(vote, token) {
  const request = axios({
    method: "post",
    url: `${API_URL}vote`,
    data: vote,
    headers: { "x-access-token": token }
  });
  return dispatch => {
    request.then(data => {
      dispatch({
        type: actions.FINAL_SUBMIT,
        payload: data
      });
    });
  };
}

export function sendCandidate(values, token) {
  const request = axios({
    method: "post",
    url: `${API_URL}candidate`,
    data: values,
    headers: { "x-access-token": token }
  });
  return dispatch => {
    dispatch({
      type: actions.SEND_CANDIDATE_START
    });
    request
      .then(data => {
        dispatch({
          type: actions.SEND_CANDIDATE_END,
          payload: data.data
        });
        dispatch(reset("candForm"));
      })
      .catch(err => {
        dispatch({
          type: actions.SEND_CANDIDATE_END,
          payload: err.response.data
        });
      });
  };
}

export function sendCommittee(values, token) {
  const request = axios({
    method: "post",
    url: `${API_URL}committee`,
    data: values,
    headers: { "x-access-token": token }
  });
  return dispatch => {
    dispatch({
      type: actions.SEND_COMMITTEE_START
    });
    request
      .then(data => {
        dispatch({
          type: actions.SEND_COMMITTEE_END,
          payload: data.data
        });
        dispatch(reset("commForm"));
      })
      .catch(err => {
        dispatch({
          type: actions.SEND_COMMITTEE_END,
          payload: err.response.data
        });
      });
  };
}

export function fetchCandidates(token) {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${API_URL}candidate`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: actions.FETCH_CANDIDATES,
        payload: data
      });
    });
  };
}

export function fetchCommittees(token) {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${API_URL}committee`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: actions.FETCH_COMMITTEES,
        payload: data
      });
    });
  };
}

export function getResult(token) {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${API_URL}result`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: actions.GET_RESULT,
        payload: data
      });
    });
  };
}
