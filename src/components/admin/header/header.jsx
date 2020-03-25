import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import dayjs from 'dayjs'

import "./header.less";
import { formateDate } from "../../../utils/dateUtils";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";
import menuList from "../../../config/menuConfig";
import LinkButton from "../link-button/link-button";

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now())
  };
  /*
  第一次render()之后执行一次
  */
 
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };
  getTitle() {
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.child) {
        const cItem = item.child.find(cItem => path.indexOf(cItem.key) === 0);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  }

  logOut = () => {
    Modal.confirm({
      content: "确定退出吗?",
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      }
    });
  };

  componentDidMount() {
    this.getTime();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const timenow = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const username = memoryUtils.user.username;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logOut}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{timenow}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
