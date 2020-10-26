import React, { Component } from "react";

export default class DropdownMenu extends Component {
  render() {
    const {
      Log_openLogWindow,
      LogOut,
      logged_as,
      user,
      openCartWindow,
    } = this.props;

    let log_btn =
      logged_as || user ? (
        <li className='dropdown_menu'>
          <button className='dropdown_btn'>
            {logged_as || user} <i className='fa fa-caret-down'></i>
          </button>
          <ul className='log_menu'>
            <li className='log_menu-item'>
              <a href='# '>Settings</a>
            </li>
            <li className='log_menu-item' onClick={() => openCartWindow()}>
              <a href='# '>Cart</a>
            </li>
            <li className='log_menu-item' onClick={() => LogOut()}>
              <a href='# '>Log Out</a>
            </li>
          </ul>
        </li>
      ) : (
        <li className='dropdown_menu'>
          <button className='dropdown_btn' onClick={() => Log_openLogWindow()}>
            LOG IN
          </button>
        </li>
      );
    return <>{log_btn}</>;
  }
}
