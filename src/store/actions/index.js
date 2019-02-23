import axios from "axios";
import { reset } from "redux-form";
import * as actions from "./actions";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

export function checkAuth() {
  const token = sessionStorage.getItem("TOKEN");
  if (token === null) {
    return dispatch => {
      dispatch({
        type: actions.CHECK_AUTH,
        payload: "Failed"
      });
    };
  } else {
    const request = axios({
      method: "get",
      url: `${API_URL}verifytoken`,
      headers: { "x-access-token": token }
    });
    return dispatch => {
      request
        .then(data => {
          dispatch({
            type: actions.CHECK_AUTH,
            payload: "Success"
          });
        })
        .catch(err => {
          dispatch({
            type: actions.CHECK_AUTH,
            payload: "Failed"
          });
        });
    };
  }
}

export function logIn(values) {
  const request = axios.post(`${API_URL}login`, values);

  return dispatch => {
    dispatch({
      type: actions.LOGIN_START
    });
    request
      .then(data => {
        if (data.data.admin === true) {
          dispatch({ type: actions.ADMIN_LOGIN, payload: data.data });
        } else {
          dispatch({ type: actions.VOTER_LOGIN, payload: data.data });
          dispatch({
            type: actions.STORE_POLL,
            payload: data
          });
          dispatch({
            type: actions.DISPLAY_POLL
          });
          dispatch({
            type: actions.ASYNC_STORE,
            payload: values
          });
        }
      })
      .catch(err => {
        dispatch({ type: actions.LOGIN_FAIL, payload: err.response.data });
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

export function voteStore(voteDetail) {
  return dispatch => {
    dispatch({
      type: actions.VOTE_STORE,
      payload: voteDetail
    });
    dispatch(reset("votepoll"));
    dispatch({ type: actions.DISPLAY_POLL });
  };
}

export function goBack() {
  return dispatch => {
    dispatch({
      type: actions.GO_BACK
    });
    dispatch(reset("votepoll"));
    dispatch({ type: actions.DISPLAY_POLL });
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
        payload: data.data
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

export function storeError(error) {
  return dispatch => {
    dispatch({
      type: actions.STORE_ERROR,
      payload: error
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

export const getStats = token => {
  const request = axios({
    method: "get",
    headers: { "x-access-token": token },
    url: `${API_URL}result/stats`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: actions.GET_STATS,
        payload: data.data
      });
    });
  };
};

export const deleteCandidate = (id, token) => {
  const request = axios({
    method: "delete",
    headers: { "x-access-token": token },
    url: `${API_URL}candidate/${id}`
  });

  return dispatch => {
    request.then(data => {
      console.log(data);
      dispatch({
        type: actions.DELETE_CANDIDATE,
        payload: data.data
      });
    });
  };
};

export const deleteCommittee = (id, token) => {
  const request = axios({
    method: "delete",
    headers: { "x-access-token": token },
    url: `${API_URL}committee/${id}`
  });

  return dispatch => {
    request.then(data => {
      dispatch({
        type: actions.DELETE_COMMITTEE,
        payload: data.data
      });
    });
  };
};
