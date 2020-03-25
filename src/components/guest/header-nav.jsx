import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class HeaderNav extends Component {
  render() {
    return (
      <div className="header-guest">
        <div className="grid">
          <div className="start">
            <NavLink to="/">首页</NavLink>
          </div>
          <div className="end">
            <NavLink to="/login">登录</NavLink>
            <NavLink to="/register">注册</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
