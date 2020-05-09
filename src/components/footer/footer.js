import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <ul>
          <li>
            <a href='#!'>Your Benefits</a>
          </li>
          <li>
            <a href='#!'>Payment Options</a>
          </li>
          <li>
            <a href='#!'>Shipping Options</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href='#!'>e-Gift Cards</a>
          </li>
          <li>
            <a href='#!'>Return Policy</a>
          </li>
          <li>
            <a href='#!'>FAQs</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href='#!'>About</a>
          </li>
          <li>
            <a href='#!'>Contact Info</a>
          </li>
          <li>
            <a href='#!'>Career</a>
          </li>
        </ul>
      </footer>
    );
  }
}
