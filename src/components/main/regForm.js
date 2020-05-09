import React, { Component } from "react";

export default class RegForm extends Component {
  render() {
    const {
      Reg_window,
      Reg_newReg,
      Reg_condition,
      Reg_closeRegWindow,
      Log_openLogWindow,
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
    };

    let status_message;

    function addListener() {
      document
        .querySelector("#registration")
        .addEventListener("click", closeRegWin);
    }

    function removeListener() {
      document
        .querySelector("#registration")
        .removeEventListener("click", closeRegWin);
    }

    function closeRegWin(e) {
      if (e.target.id === "registration") {
        Reg_closeRegWindow();
        removeListener();
      }
    }

    if (Reg_window) {
      addListener();
    }

    if (Reg_condition.type === "success") {
      status_message = (
        <div className='success_message'>
          <h1>{Reg_condition.message}</h1>
          <h2>Please Login</h2>
        </div>
      );

      let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(Reg_closeRegWindow());
        }, 1500);
      });

      promise.then(function (data) {
        Log_openLogWindow();
        removeListener();
      });
    } else if (Reg_condition.type === "error") {
      status_message = (
        <div className='error_message'>
          <h1>Error!</h1>
          <h2>{Reg_condition.message}</h2>
        </div>
      );
    }

    let overlay = Reg_window ? (
      <div className='overlay' id='registration' style={styles.enable}>
        <div className='popup'>
          <form
            className='login-form'
            onSubmit={(e) => {
              e.preventDefault();
              Reg_newReg({
                userLogin: document.getElementById("reg_input_login").value,
                userPassword: document.getElementById("reg_input_password")
                  .value,
              });
              removeListener();
              document.getElementById("reg_input_login").value = "";
              document.getElementById("reg_input_password").value = "";
            }}
          >
            <input id='reg_input_login' type='text' placeholder='username' />
            <input
              id='reg_input_password'
              type='password'
              placeholder='password'
            />
            <button className='button' type='submit'>
              Register Account
            </button>
          </form>
          {status_message}
        </div>
      </div>
    ) : (
      <div className='overlay' id='registration' style={styles.disable}>
        <div className='popup'>
          <form className='login-form'>
            <input type='text' placeholder='username' />
            <input type='password' placeholder='password' />
            <button className='button'>Log In</button>
          </form>
        </div>
      </div>
    );

    return <div>{overlay}</div>;
  }
}
