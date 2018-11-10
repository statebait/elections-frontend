import {
  CHECK_AUTH,
  LOGIN_START,
  VOTER_LOGIN,
  ADMIN_LOGIN,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/actions";

const INITIAL_STATE = {
  token: "",
  message: "",
  error: { error: false, message: "" },
  loading: false,
  isAuthenticated: false,
  isAdmin: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_AUTH:
      if (action.payload === "Success") {
        return { ...state, isAuthenticated: true };
      } else if (action.payload === "Failed") {
        return { ...state, isAuthenticated: false };
      } else {
        return { ...state };
      }
    case LOGIN_START:
      return {
        ...state,
        message: "",
        isAdmin: false,
        token: "",
        loading: true,
        isAuthenticated: false
      };
    case VOTER_LOGIN:
      sessionStorage.setItem("TOKEN", action.payload.token);
      return {
        ...state,
        message: action.payload.message,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true
      };
    case ADMIN_LOGIN:
      sessionStorage.setItem("TOKEN", action.payload.token);
      return {
        ...state,
        message: action.payload.message,
        isAdmin: true,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: {
          error: true,
          message: action.payload
        }
      };
    case LOGOUT:
      sessionStorage.removeItem("TOKEN");
      return { ...state, isAuthenticated: false, token: "" };
    default:
      return state;
  }
}
