import React, { Component } from "react";
import SideMenu from "./sideMenu";
import Card from "./card";
import LogForm from "./logForm";
import RegForm from "./regForm";
import Cart from "./cart";

export default class Main extends Component {
  render() {
    const {
      Goods,
      user,
      loading,
      mix,
      GetPhone,
      GetTops,
      SortGoods,
      Log_window,
      SearchAction,
      Log_newLog,
      Log_condition,
      Log_openLogWindow,
      Log_closeLogWindow,
      Reg_condition,
      Reg_newReg,
      Reg_window,
      Reg_openRegWindow,
      Reg_closeRegWindow,
      addToCart,
      removeFromCart,
      incrementInCart,
      decrementInCart,
      cart,
      purchase_button,
      processing_card,
      closeCartWindow,
      cart_window,
      cart_purchase_notification,
      makePurchase,
    } = this.props;

    return (
      <section className='main'>
        <SideMenu
          SortGoods={SortGoods}
          SearchAction={SearchAction}
          GetPhone={GetPhone}
        />
        <Card
          GetTops={GetTops}
          Goods={Goods}
          user={user}
          loading={loading}
          mix={mix}
          addToCart={addToCart}
          purchase_button={purchase_button}
          processing_card={processing_card}
        />
        <LogForm
          Log_closeLogWindow={Log_closeLogWindow}
          Reg_openRegWindow={Reg_openRegWindow}
          Log_window={Log_window}
          Log_newLog={Log_newLog}
          Log_condition={Log_condition}
        />
        <RegForm
          Log_openLogWindow={Log_openLogWindow}
          Reg_closeRegWindow={Reg_closeRegWindow}
          Reg_window={Reg_window}
          Reg_condition={Reg_condition}
          Reg_newReg={Reg_newReg}
        />
        <Cart
          cart={cart}
          closeCartWindow={closeCartWindow}
          cart_window={cart_window}
          removeFromCart={removeFromCart}
          incrementInCart={incrementInCart}
          decrementInCart={decrementInCart}
          makePurchase={makePurchase}
          cart_purchase_notification={cart_purchase_notification}
        />
      </section>
    );
  }
}
