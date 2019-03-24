//Auth Actions
export const CHECK_AUTH = "check_auth";
export const LOGIN_START = "login_start";
export const VOTER_LOGIN = "voter_login";
export const ADMIN_LOGIN = "admin_login";
export const LOGIN_FAIL = "login_fail";
export const LOGOUT = "logout";

//Poll Actions
export const DISPLAY_POLL = "display_poll";
export const ASYNC_STORE = "async_store";
export const STORE_POLL = "store_poll";
export const VOTE_STORE = "vote_store";
export const GO_BACK = "go_back";
export const FINAL_SUBMIT = "final_submit";
export const STORE_ERROR = "store_error";

//Admin Actions
export const SEND_CANDIDATE_START = "send_candidate_start";
export const SEND_CANDIDATE_END = "send_candidate_end";
export const SEND_COMMITTEE_START = "send_committee_start";
export const SEND_COMMITTEE_END = "send_committee_end";
export const FETCH_CANDIDATES = "fetch_candidates";
export const FETCH_COMMITTEES = "fetch_committees";
export const DELETE_CANDIDATE = "delete_candidate";
export const DELETE_CANDIDATE_ERROR = "delete_candidate_error";
export const DELETE_COMMITTEE = "delete_committee";
export const DELETE_COMMITTEE_ERROR = "delete_committee_error";
export const GET_RESULT = "get_result";
export const GET_STATS = "get_stats";
