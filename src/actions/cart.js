export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_IN_CART = "INCREMENT_IN_CART";
export const DECREMENT_IN_CART = "DECREMENT_IN_CART";
export const CLEAR_CART = "CLEAR_CART";
export const CART_OPEN_WINDOW = "CART_OPEN_WINDOW";
export const CART_CLOSE_WINDOW = "CART_CLOSE_WINDOW";
export const PURCHASE = "PURCHASE";
export const PROCESSING_NEW_GOOD = "PROCESSING_NEW_GOOD";
export const HIDE_PURCHASE_NOTIFICATION = "HIDE_PURCHASE_NOTIFICATION";

const axios = require("axios");

export const openCartWindow = () => ({
  type: CART_OPEN_WINDOW,
});

export const closeCartWindow = () => ({
  type: CART_CLOSE_WINDOW,
});

export function addToCart(data) {
  return (dispatch) => {
    dispatch({
      type: PROCESSING_NEW_GOOD,
      payload: data,
    });
    return axios
      .post("http://192.168.0.106:1338/add-to-cart", data, {
        withCredentials: true,
      })
      .then(function (response) {
        return new Promise((resolve, reject) =>
          setTimeout(() => resolve(response), 1000)
        );
      })
      .then(function (response) {
        dispatch({
          type: ADD_TO_CART,
          payload: response.data,
        });
      });
  };
}

export const removeFromCart = (data) => (dispatch) => {
  axios
    .post("http://192.168.0.106:1338/remove-from-cart", data, {
      withCredentials: true,
    })
    .then(function (response) {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: response.data,
      });
    });
};

export const incrementInCart = (data) => (dispatch) => {
  axios
    .post("http://192.168.0.106:1338/increment-in-cart", data, {
      withCredentials: true,
    })
    .then(function (response) {
      dispatch({
        type: INCREMENT_IN_CART,
        payload: response.data,
      });
    });
};

export const decrementInCart = (data) => (dispatch) => {
  axios
    .post("http://192.168.0.106:1338/decrement-in-cart", data, {
      withCredentials: true,
    })
    .then(function (response) {
      dispatch({
        type: DECREMENT_IN_CART,
        payload: response.data,
      });
    });
};

export const makePurchase = (data) => (dispatch) => {
  axios
    .post("http://192.168.0.106:1338/purchase", data, { withCredentials: true })
    .then(function (response) {
      dispatch({
        type: PURCHASE,
        payload: response.data,
      });
    })
    .then(() =>
      setTimeout(() => dispatch({ type: HIDE_PURCHASE_NOTIFICATION }), 2000)
    );
};
