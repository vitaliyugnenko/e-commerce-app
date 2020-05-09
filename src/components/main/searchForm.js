import React, { Component } from "react";

export default class SearchForm extends Component {
  handlesearch = this.props.handlesearch;

  render() {
    const { SearchAction } = this.props;

    let timeout = null;

    return (
      <form className='search-form'>
        <input
          type='text'
          className='search-form-input'
          placeholder='search'
          onKeyDown={e => {
            if (e.keyCode === 13) e.preventDefault();
          }}
          onChange={(e, data) => {
            e.preventDefault();
            clearTimeout(timeout);
            timeout = setTimeout(
              SearchAction.bind(this, { search: e.target.value }),
              1000
            );
          }}
          onBlur={e => (e.target.value = "")}
        />
        <button type='submit' onClick={e => e.preventDefault()}>
          <i className='fa fa-search'></i>
        </button>
      </form>
    );
  }
}
