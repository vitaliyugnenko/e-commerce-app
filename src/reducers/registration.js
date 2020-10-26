import {
  REG_NEW_CONDITION,
  REG_OPEN_WINDOW,
  REG_CLOSE_WINDOW,
} from "../actions/registration";

const initialState = {
  condition: {},
  reg_window: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REG_OPEN_WINDOW:
      return {
        ...state,
        reg_window: true,
        condition: {},
      };
    case REG_CLOSE_WINDOW:
      return {
        condition: {},
        reg_window: false,
      };
    case REG_NEW_CONDITION:
      return {
        ...state,
        condition: action.payload,
      };
    default:
      return state;
  }
};
