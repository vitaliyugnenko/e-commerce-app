import React, { Component } from "react";

export default class LogForm extends Component {
  render() {
    const {
      Log_window,
      Log_newLog,
      Log_condition,
      Log_closeLogWindow,
      Reg_openRegWindow,
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

    let timeout = null;

    let status_message;

    if (Log_condition.type === "success") {
      status_message = (
        <div className='success_message'>
          <h1>Success!</h1>
          <h2>{Log_condition.message}</h2>
        </div>
      );
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        Log_closeLogWindow();
        removeListener();
      }, 1500);
    } else if (Log_condition.type === "error") {
      status_message = (
        <div className='error_message'>
          <h1>Error!</h1>
          <h2>{Log_condition.message}</h2>
        </div>
      );
    }

    function addListener() {
      document.querySelector("#login").addEventListener("click", closeLogWin);
    }

    function removeListener() {
      document
        .querySelector("#login")
        .removeEventListener("click", closeLogWin);
    }

    function closeLogWin(e) {
      if (e.target.id === "login") {
        Log_closeLogWindow();
        removeListener();
      }
    }

    if (Log_window) {
      addListener();
    }

    let overlay = Log_window ? (
      <div className='overlay' id='login' style={styles.enable}>
        <div className='popup'>
          <form
            className='login-form'
            onSubmit={(e) => {
              e.preventDefault();
              Log_newLog({
                login: document.getElementById("log_input_login").value,
                password: document.getElementById("log_input_password").value,
              });
              removeListener();
              document.getElementById("log_input_login").value = "";
              document.getElementById("log_input_password").value = "";
            }}
          >
            <input id='log_input_login' type='text' placeholder='username' />
            <input
              id='log_input_password'
              type='password'
              placeholder='password'
            />
            <button className='button' type='submit'>
              Log In
            </button>
            <div className='popup_newUser'>
              <span>Are you new?</span>
              <a
                href='# '
                onClick={() => {
                  Reg_openRegWindow();
                  removeListener();
                }}
              >
                Sign Up
              </a>
            </div>
          </form>

          {status_message}
        </div>
      </div>
    ) : (
      <div className='overlay' id='login' style={styles.disable}>
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
