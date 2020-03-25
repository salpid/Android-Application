import React, { Component } from "react";

import HeaderNav from "../../components/guest/header-nav";
import BooksWall from "../../components/guest/bookswall";

/* 根的子路由组件 */

export default class Main extends Component {
  render() {
    return (
      <div className='main'>
        <HeaderNav />
        <BooksWall />
      </div>
    );
  }
}
