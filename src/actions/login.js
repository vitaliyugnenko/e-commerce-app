import { USR_UPDATE } from "./goods";

export const LOG_OPEN_WINDOW = "LOG_OPEN_WINDOW";
export const LOG_CLOSE_WINDOW = "LOG_CLOSE_WINDOW";
export const LOG_NEW_CONDITION = "LOG_NEW_CONDITION";
export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_ERROR = "LOG_OUT_ERROR";

const axios = require("axios");

export const openLoginWindow = () => ({
  type: LOG_OPEN_WINDOW,
});

export const closeLoginWindow = () => ({
  type: LOG_CLOSE_WINDOW,
});

export const newLog = (login) => (dispatch) => {
  if (!login.login.trim().length > 0 || !login.password.trim().length > 0) {
    dispatch({
      type: "LOG_NEW_CONDITION",
      payload: {
        type: "error",
        message: "Please enter login and password!",
      },
    });
  } else {
    axios
      .post(
        "http://192.168.0.106:1338/log",
        {
          login: login.login,
          password: login.password,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        dispatch({
          type: "LOG_NEW_CONDITION",
          payload: {
            type: "success",
            message: "You are now logged in!",
          },
          login: response.data.login,
          cart: response.data.cart,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "LOG_NEW_CONDITION",
          payload: {
            type: "error",
            message: "Incorrect username or password!",
          },
          cart: [],
        });
      });
  }
};

export function LogOut() {
  return (dispatch) => {
    return axios
      .get("http://192.168.0.106:1338/logout", { withCredentials: true })
      .then(function (response) {
        dispatch({
          type: LOG_OUT,
          user: "",
        });
      })
      .then(function () {
        dispatch({
          type: USR_UPDATE,
        });
      })
      .catch(function (error) {
        dispatch({
          type: LOG_OUT_ERROR,
          payload: "error",
        });
      });
  };
}
