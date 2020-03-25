import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/admin/login/login";
import Admin from "./pages/admin";
import Main from "./pages/guest";
import Register from "./pages/guest/register";

/* 根组件（父路由） */

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
          <Redirect to="main" />
        </Switch>
      </BrowserRouter>
    );
  }
}
