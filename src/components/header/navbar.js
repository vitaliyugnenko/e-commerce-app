import React, { Component } from "react";
import DropdownMenu from "./dropdown";

export default class Header extends Component {
  render() {
    const {
      Home,
      Log_openLogWindow,
      logged_as,
      LogOut,
      user,
      cart,
      openCartWindow,
    } = this.props;

    let cartContainer =
      logged_as || user ? (
        <li className='cart_icon' onClick={() => openCartWindow()}>
          <i className='fa fa-shopping-cart fa-lg'></i>
          <span className='badge'>
            {" "}
            {cart.reduce((accum, current) => accum + current.amount, 0) ||
              0}{" "}
          </span>
        </li>
      ) : (
        <li></li>
      );

    const toggleActiveNavbar = () => {
      if (document.querySelector(".navbar").classList.contains("active")) {
        document.querySelector(".navbar").classList.toggle("active");
        document.querySelector(".navbar").classList.contains("active")
          ? (document.body.style.position = "fixed")
          : (document.body.style.position = "");
      }
    };

    return (
      <header>
        <img className='logo' src='logo.svg' alt='logo' />
        <nav>
          <ul className='navbar'>
            <li
              onClick={() => {
                Home();
                toggleActiveNavbar();
              }}
            >
              <a href='# '>HOME</a>
            </li>
            <li onClick={() => toggleActiveNavbar()}>
              <a href='# '>SUPPORT</a>
            </li>
            <li onClick={() => toggleActiveNavbar()}>
              <a href='# '>CONTACT</a>
            </li>
            {cartContainer}
            <DropdownMenu
              Log_openLogWindow={Log_openLogWindow}
              LogOut={LogOut}
              logged_as={logged_as}
              user={user}
              openCartWindow={openCartWindow}
            />
          </ul>
        </nav>
        <div
          className='hamburger'
          onClick={() => {
            document.querySelector(".navbar").classList.toggle("active");
            document.querySelector(".navbar").classList.contains("active")
              ? (document.body.style.position = "fixed")
              : (document.body.style.position = "");
          }}
        >
          <span className='line'></span>
          <span className='line'></span>
          <span className='line'></span>
        </div>
      </header>
    );
  }
}
