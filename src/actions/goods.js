export const GET_TOP_REQUEST = "GET_TOP_REQUEST";
export const NEW_TOPS = "NEW_TOPS";
export const GET_PHONE_REQUEST = "GET_PHONE_REQUEST";
export const GET_PHONE = "GET_PHONE";
export const SORT_REQUEST = "SORT_REQUEST";
export const LOW_TO_HIGH = "LOW_TO_HIGH";
export const HIGH_TO_LOW = "HIGH_TO_LOW";
export const BRAND = "BRAND";
export const GET_SEARCH_REQUEST = "GET_SEARCH_REQUEST";
export const SEARCH_VALUE = "SEARCH_VALUE";
export const NEW_SEARCH = "NEW_SEARCH";
export const RESET_MIX = "RESET_MIX";
export const USR_UPDATE = "USR_UPDATE";

const axios = require("axios");

export function SearchVal({ data }) {
  return dispatch => {
    dispatch({
      type: SEARCH_VALUE,
      mix: false
    });
  };
}

export function SortGoods({ data }) {
  return dispatch => {
    dispatch({
      type: SORT_REQUEST
    });
    dispatch({
      type: data
    });
  };
}

export function Home() {
  return dispatch => {
    dispatch({
      type: GET_TOP_REQUEST,
      loading: true
    });
    return axios
      .get("http://192.168.0.106:1338/top", { withCredentials: true })
      .then(function(response) {
        dispatch({
          type: NEW_TOPS,
          loading: false,
          data: response.data,
          mix: true,
          user: response.data.log
        });
        dispatch({
          type: RESET_MIX
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function GetTops() {
  return dispatch => {
    dispatch({
      type: GET_TOP_REQUEST,
      loading: true
    });
    return axios
      .get("http://192.168.0.106:1338/top", { withCredentials: true })
      .then(function(response) {
        dispatch({
          type: NEW_TOPS,
          loading: false,
          data: response.data,
          mix: true,
          user: response.data.log
        });
        dispatch({
          type: RESET_MIX
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function GetPhone({ data }) {
  return dispatch => {
    dispatch({
      type: GET_PHONE_REQUEST,
      loading: true
    });
    return axios
      .get(`http://192.168.0.106:1338/phone/${data}`, { withCredentials: true })
      .then(function(response) {
        dispatch({
          type: GET_PHONE,
          loading: false,
          payload: response.data.payload,
          mix: true,
          user: response.data.log
        });
        dispatch({
          type: RESET_MIX
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function SearchAction({ search }) {
  return dispatch => {
    if (search.length > 0) {
      let request = {
        data: search
      };
      dispatch({
        type: GET_SEARCH_REQUEST,
        loading: true
      });
      return axios
        .post("http://192.168.0.106:1338/search", request, {
          withCredentials: true
        })
        .then(function(response) {
          dispatch({
            type: NEW_SEARCH,
            loading: false,
            payload: response.data.payload,
            mix: true,
            user: response.data.log
          });
          dispatch({
            type: RESET_MIX
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      dispatch({
        type: GET_TOP_REQUEST,
        loading: true
      });
      return axios
        .get("http://192.168.0.106:1338/top", { withCredentials: true })
        .then(function(response) {
          dispatch({
            type: NEW_SEARCH,
            loading: false,
            payload: response.data.payload,
            mix: true,
            user: response.data.log
          });
          dispatch({
            type: RESET_MIX
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
}
