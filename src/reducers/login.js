import {
  LOG_OPEN_WINDOW,
  LOG_CLOSE_WINDOW,
  LOG_NEW_CONDITION,
  LOG_OUT,
} from "../actions/login";

const initialState = {
  condition: {},
  log_window: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_OPEN_WINDOW:
      return {
        ...state,
        log_window: true,
      };
    case LOG_CLOSE_WINDOW:
      return {
        ...state,
        condition: {},
        log_window: false,
      };
    case LOG_NEW_CONDITION:
      return {
        ...state,
        condition: action.payload,
        logged_as: action.login,
      };
    case LOG_OUT:
      return {
        ...state,
        condition: {},
        logged_as: "",
      };
    default:
      return state;
  }
};
