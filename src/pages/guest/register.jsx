import React, { Component } from "react";
import { PageHeader } from "antd";

/* 用户注册页面 */

class Register extends Component {
  goBack = () => {};
  render() {
    return (
      <React.Fragment>
        <div className="reg-nav">
          <PageHeader
            className="site-page-header"
            onBack={this.goBack}
            title="返回"
          />
        </div>
        <div className="reg-wrapper">
          <form action="" className="box reg-box">

            <div className="field">
              <label className="label" htmlFor="">
                用户名
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="">
                密码
              </label>
              <div className="control">
                <input className="input" type="text" placeholder="请输入密码" />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="">
                电话
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="请输入电话"
                />
              </div>
            </div>

            <div className="control">
              <button className="button is-fullwidth is-primary">注册</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
