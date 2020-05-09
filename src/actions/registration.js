import { LOG_CLOSE_WINDOW } from "./login";

export const REG_NEW_CONDITION = "REG_NEW_CONDITION";
export const REG_OPEN_WINDOW = "REG_OPEN_WINDOW";
export const REG_CLOSE_WINDOW = "REG_CLOSE_WINDOW";

const axios = require("axios");

export const openRegWindow = () => (dispatch) => {
  dispatch({
    type: LOG_CLOSE_WINDOW,
  });
  dispatch({
    type: REG_OPEN_WINDOW,
  });
};

export const closeRegWindow = () => ({
  type: REG_CLOSE_WINDOW,
});

export const newReg = (reg) => (dispatch) => {
  if (!reg.userLogin.trim().length > 0 || !reg.userPassword.trim().length > 0) {
    dispatch({
      type: REG_NEW_CONDITION,
      payload: {
        type: "error",
        message: "Please enter login and password!",
      },
    });
  } else {
    axios
      .post("http://192.168.0.106:1338/reg", {
        login: reg.userLogin,
        password: reg.userPassword,
      })
      .then(function (response) {
        dispatch({
          type: REG_NEW_CONDITION,
          payload: {
            type: "success",
            message: "User Registration Successful!",
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: REG_NEW_CONDITION,
          payload: {
            type: "error",
            message: "Username already taken!",
          },
        });
      });
  }
};
