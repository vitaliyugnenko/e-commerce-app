import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_IN_CART,
  DECREMENT_IN_CART,
  CLEAR_CART,
  CART_OPEN_WINDOW,
  CART_CLOSE_WINDOW,
  PURCHASE,
  PROCESSING_NEW_GOOD,
  HIDE_PURCHASE_NOTIFICATION,
} from "../actions/cart";
import { NEW_TOPS } from "../actions/goods";
import { LOG_NEW_CONDITION } from "../actions/login";

const initialState = {
  cart: [],
  purchase_button: true,
  processing_card: "",
  cart_window: false,
  cart_purchase_notification: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_OPEN_WINDOW:
      return {
        ...state,
        cart_window: true,
      };
    case CART_CLOSE_WINDOW:
      return {
        ...state,
        cart_window: false,
      };
    case LOG_NEW_CONDITION:
      return {
        ...state,
        cart: action.cart,
      };
    case NEW_TOPS:
      return {
        ...state,
        cart: action.data.user_cart,
      };
    case PROCESSING_NEW_GOOD:
      return {
        ...state,
        purchase_button: false,
        processing_card: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
        purchase_button: true,
        processing_card: "",
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case INCREMENT_IN_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case DECREMENT_IN_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
      };
    case PURCHASE:
      return {
        ...state,
        cart_purchase_notification: true,
        cart: action.payload,
      };
    case HIDE_PURCHASE_NOTIFICATION:
      return {
        ...state,
        cart_purchase_notification: false,
      };
    default:
      return state;
  }
};
