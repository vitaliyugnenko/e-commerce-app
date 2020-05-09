import {
  GET_TOP_REQUEST,
  NEW_TOPS,
  GET_PHONE_REQUEST,
  GET_PHONE,
  SORT_REQUEST,
  LOW_TO_HIGH,
  HIGH_TO_LOW,
  BRAND,
  GET_SEARCH_REQUEST,
  SEARCH_VALUE,
  NEW_SEARCH,
  RESET_MIX,
  USR_UPDATE
} from "../actions/goods";

import {
  REMOVE_FROM_CART,
  INCREMENT_IN_CART,
  DECREMENT_IN_CART
} from "../actions/cart";

import {
  LOG_NEW_CONDITION
} from "../actions/login"

const initialState = {
  loading: false,
  goods: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_SEARCH:
      return {
        ...state,
        loading: action.loading,
        goods: action.payload,
        mix: action.mix,
        sort: null,
        user: action.user
      };

    case NEW_TOPS:
      return {
        ...state,
        loading: action.loading,
        goods: action.data.payload,
        mix: action.mix,
        sort: null,
        user: action.user
      };

    case GET_PHONE:
      return {
        ...state,
        loading: action.loading,
        goods: action.payload,
        mix: action.mix,
        sort: null,
        user: action.user
      };

    case LOW_TO_HIGH:
      return {
        ...state,
        sort: LOW_TO_HIGH
      };

    case HIGH_TO_LOW:
      return {
        ...state,
        sort: HIGH_TO_LOW
      };

    case BRAND:
      return {
        ...state,
        sort: BRAND
      };

    case SORT_REQUEST:
      return {
        ...state,
        sort: null,
        mix: false
      };

    case SEARCH_VALUE:
      return {
        ...state,
        mix: action.mix
      };

    case GET_TOP_REQUEST:
    case GET_PHONE_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        val: action.val
      };

    case GET_SEARCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: action.error
      };

    case RESET_MIX:
      return {
        ...state,
        mix: false
      };

    case USR_UPDATE:
      return {
        ...state,
        user: ""
      };

    case REMOVE_FROM_CART:
      return {
        ...state
      };

    case INCREMENT_IN_CART:
      return {
        ...state
      };

    case DECREMENT_IN_CART:
      return {
        ...state
      };

    case LOG_NEW_CONDITION:
      return {
        ...state,
        user: action.login
      }  

    default:
      return state;
  }
};
