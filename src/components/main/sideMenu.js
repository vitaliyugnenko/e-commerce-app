import React, { Component } from "react";
import SearchForm from "./searchForm";

export default class SideMenu extends Component {
  render() {
    const { SortGoods, SearchAction, GetPhone } = this.props;
    return (
      <div className='side_menu'>
        <h1 className="sortBy">Sort by</h1>
        <ul className="sortBy">
          <li onClick={(e, data) => SortGoods({ data: "LOW_TO_HIGH" })}>
            Lowest Price
          </li>
          <li onClick={(e, data) => SortGoods({ data: "HIGH_TO_LOW" })}>
            Highest Price
          </li>
          <li onClick={(e, data) => SortGoods({ data: "BRAND" })}>Brand</li>
        </ul>
        <h1 className="category">Category</h1>
        <ul className="category">
          <li onClick={(e, data) => GetPhone({ data: e.target.innerHTML })}>
            Samsung
          </li>
          <li onClick={(e, data) => GetPhone({ data: e.target.innerHTML })}>
            Xiaomi
          </li>
          <li onClick={(e, data) => GetPhone({ data: e.target.innerHTML })}>
            Apple
          </li>
          <li onClick={(e, data) => GetPhone({ data: e.target.innerHTML })}>
            HUAWEI
          </li>
          <li onClick={(e, data) => GetPhone({ data: e.target.innerHTML })}>
            OnePlus
          </li>
          <li onClick={(e, data) => GetPhone({ data: e.target.innerHTML })}>
            Google
          </li>
        </ul>
        <SearchForm SearchAction={SearchAction} />
      </div>
    );
  }
}
