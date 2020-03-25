import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import memoryUtils from "../../utils/memoryUtils";

import LeftNav from "../../components/admin/left-nav/left-nav";
import Header from "../../components/admin/header/header";

import Home from "../../pages/admin/home/home";
import Product from "../../pages/admin/product/product";
import Category from "../../pages/admin/category/category";
import Role from "../../pages/admin/role/role";
import User from "../../pages/admin/user/user";
import Bar from "../../pages/admin/charts/bar";
import Line from "../../pages/admin/charts/line";
import Pie from "../../pages/admin/charts/pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;

    // // 如果内存中没有存储user, 即当前未登录
    // if (!user || !user._id) {
    //   // 自动跳转到登录界面(在render()中)
    //   return <Redirect to='/login' />
    // }

    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Hello {user.username}</Header>
          <Content style={{ margin: 20, backgroundColor: "white" }}>
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/category" component={Category} />
              <Route path="/admin/product" component={Product} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>
            推荐使用谷歌浏览器
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
