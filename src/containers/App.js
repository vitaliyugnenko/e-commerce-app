import { connect } from "react-redux";
import App from "../components/App";
import * as Login from "../actions/login";
import * as Reg from "../actions/registration";
import * as Cart from "../actions/cart";
import {
  SearchAction,
  GetPhone,
  GetTops,
  SortGoods,
  SearchVal,
  Home,
} from "../actions/goods";

let Log_openLogWindow = Login.openLoginWindow;
let Log_closeLogWindow = Login.closeLoginWindow;
let Log_newLog = Login.newLog;
let LogOut = Login.LogOut;

let Reg_openRegWindow = Reg.openRegWindow;
let Reg_closeRegWindow = Reg.closeRegWindow;
let Reg_newReg = Reg.newReg;

let addToCart = Cart.addToCart;
let removeFromCart = Cart.removeFromCart;
let incrementInCart = Cart.incrementInCart;
let decrementInCart = Cart.decrementInCart;
let openCartWindow = Cart.openCartWindow;
let closeCartWindow = Cart.closeCartWindow;
let makePurchase = Cart.makePurchase;

const mapStateToProps = ({ login, registration, goods, cart }) => {
  return {
    Log_condition: login.condition,
    logged_in: login.logged_in,
    logged_as: login.logged_as,
    Log_window: login.log_window,

    Reg_condition: registration.condition,
    Reg_window: registration.reg_window,

    Goods: goods.goods,
    loading: goods.loading,
    mix: goods.mix,
    sort: goods.sort,
    user: goods.user,

    cart: cart.cart,
    purchase_button: cart.purchase_button,
    processing_card: cart.processing_card,
    cart_window: cart.cart_window,
    cart_purchase_notification: cart.cart_purchase_notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Log_openLogWindow: () => {
      dispatch(Log_openLogWindow());
    },

    Log_closeLogWindow: () => {
      dispatch(Log_closeLogWindow());
    },

    Log_newLog: (login) => {
      dispatch(Log_newLog(login));
    },

    LogOut: (data) => {
      dispatch(LogOut());
    },

    Reg_openRegWindow: () => {
      dispatch(Reg_openRegWindow());
    },

    Reg_closeRegWindow: () => {
      dispatch(Reg_closeRegWindow());
    },

    Reg_newReg: (login) => {
      dispatch(Reg_newReg(login));
    },

    SearchAction: (data) => {
      dispatch(SearchAction(data));
    },

    GetPhone: (data) => {
      dispatch(GetPhone(data));
    },

    GetTops: () => {
      dispatch(GetTops());
    },

    SortGoods: (data) => {
      dispatch(SortGoods(data));
    },

    SearchVal: (data) => {
      dispatch(SearchVal(data));
    },

    Home: () => {
      dispatch(Home());
    },

    addToCart: (data) => {
      dispatch(addToCart(data));
    },

    removeFromCart: (data) => {
      dispatch(removeFromCart(data));
    },

    incrementInCart: (data) => {
      dispatch(incrementInCart(data));
    },

    decrementInCart: (data) => {
      dispatch(decrementInCart(data));
    },

    openCartWindow: () => {
      dispatch(openCartWindow());
    },

    closeCartWindow: () => {
      dispatch(closeCartWindow());
    },

    makePurchase: (data) => {
      dispatch(makePurchase(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
