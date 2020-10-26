import React, { Component } from "react";

export default class Cart extends Component {
  render() {
    const {
      cart,
      closeCartWindow,
      cart_window,
      removeFromCart,
      incrementInCart,
      decrementInCart,
      makePurchase,
      cart_purchase_notification,
    } = this.props;

    let styles = {
      enable: {
        visibility: "visible",
        opacity: 1,
        zIndex: 2,
      },

      disable: {
        visibility: "hidden",
        opacity: 0,
      },

      show_notification: {
        visibility: "visible",
        width: "50%",
        height: "25%",
        position: "absolute",
        backgroundColor: "#f5f5f5",
        color: "#0088a9",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      hide_notification: {
        visibility: "hidden",
      },
    };

    function hideNotification() {
      setTimeout(() => {
        document.querySelector("#buyNotif").style = styles.hide_notification;
      }, 5000);
    }

    function listener(e) {
      if (e.target !== this) return;
      let func = async () => {
        closeCartWindow();
      };
      func().then(() => removeListener());
    }

    function addListener() {
      document.querySelector("#cart").addEventListener("click", listener);
    }

    function removeListener() {
      document.querySelector("#cart").removeEventListener("click", listener);
    }

    if (cart_window) {
      addListener();
    }

    let container = cart_window ? (
      <div className='overlay' id='cart' style={styles.enable}>
        <div className='popup-cart'>
          <div
            id='close-cart'
            onClick={() => {
              closeCartWindow();
              removeListener();
            }}
          >
            <i className='fa fa-times fa-2x'></i>
          </div>
          <div
            style={
              cart_purchase_notification
                ? styles.show_notification
                : styles.hide_notification
            }
            onClick={() => hideNotification()}
          >
            <h1>Your purchase has been confirmed!</h1>
          </div>
          {cart.map((item) => (
            <div className='cart-card' key={item.product_id}>
              <div className='cart-card_info'>
                <img src={item.description.img} alt={item.description.model} />
                <p>{`${item.description.brand} ${item.description.model}`}</p>
                <p>{`$${item.description.price * item.amount}`}</p>
              </div>
              <div className='cart-card_actions'>
                <i
                  className='fa fa-minus fa-lg'
                  onClick={() => decrementInCart({ product: item.product_id })}
                ></i>
                <p>{item.amount}</p>
                <i
                  className='fa fa-plus fa-lg'
                  onClick={() => incrementInCart({ product: item.product_id })}
                ></i>
                <i
                  className='fa fa-trash fa-lg'
                  onClick={() => removeFromCart({ product: item.product_id })}
                ></i>
              </div>
              <button
                className='button'
                onClick={() => makePurchase({ product: item.product_id })}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className='overlay' id='cart' style={styles.disable}></div>
    );

    return <>{container}</>;
  }
}
