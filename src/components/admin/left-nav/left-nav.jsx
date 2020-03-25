import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import "./left-nav.less";
import menuList from "../../../config/menuConfig";
import memoryUtils from "../../../utils/memoryUtils";

const { SubMenu } = Menu;

class LeftNav extends Component {
  hasAuth = item => {
    const key = item.key;
    const menus = memoryUtils.user.role.menus;
    const username = memoryUtils.user.username;
    if (username === "admin" || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.child) {
      return !!item.child.find(child => menus.indexOf(child.key) !== -1);
    }
    return false;
  };

  getMenuNodes = menuList => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.child) {
          pre.push(
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          // 查找与当前路由匹配的子Item
          const cItem = item.child.find(cItem => path.indexOf(cItem.key) === 0);
          if (cItem) {
            this.openKey = item.key;
            // console.log(this.openKey);
          }
          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.child)}
            </SubMenu>
          );
        }
      }
      return pre;
    }, []);
  };

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    let path = this.props.location.pathname;
    const openKey = this.openKey;

    if (path.indexOf("/admin/product") === 0) {
      path = "/admin/product";
    }

    return (
      <div className="left-nav">
        <Link to="/">
          {/* <img src={logo} alt="logo" />
          <h1>后台管理系统</h1> */}
          <h1>后台管理系统</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
