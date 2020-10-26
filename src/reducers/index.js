import { combineReducers } from "redux";
import login from "./login";
import registration from "./registration";
import goods from "./goods";
import cart from "./cart";

export default combineReducers({
  login,
  registration,
  goods,
  cart
});
