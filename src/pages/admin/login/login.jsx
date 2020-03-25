import React, { Component } from "react";
import { Form, Icon, Input, Button, message, PageHeader } from "antd";

// import "./login.less";
import { reqLogin } from "../../../api/index";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";

/* 登录后台管理的路由组件 */

class Login extends Component {
  goBack = () => {};
  handleSubmit = e => {
    // 阻止事件的默认行为
    e.preventDefault();
    // 得到form对象
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('提交登录的Ajax请求', values)
        // 请求登录
        const { username, password } = values;
        const result = await reqLogin(username, password);
        // console.log('请求成功了', response)
        // {status: 0, data: xxx} {status:1, msg: 'error'}
        if (result.status === 0) {
          // 登录成功
          message.success("登陆成功");
          // 保存用户信息
          const user = result.data;
          console.log(user);
          memoryUtils.user = user; // 保存在内存中
          console.log(memoryUtils.user);
          storageUtils.saveUser(user); // 保存在local中
          // 跳转到管理页面
          this.props.history.replace("/admin");
        } else {
          // 登陆失败
          message.error("用户名或密码有误");
        }
      } else {
        console.log("校验失败");
      }
    });
  };

  /*对密码进行验证*/

  validatorPwd = (rule, value, callback) => {
    if (!value) {
      callback("密码不能为空!");
    } else if (value.length < 4) {
      callback("密码长度不能小于4位");
    } else if (value.length > 12) {
      callback("密码长度不能大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是字母、数字或下划线");
    } else {
      callback();
    }
  };

  render() {
    // 如果用户已经登录, 自动跳转到管理界面
    // const user = memoryUtils.user;
    // if (user && user._id) {
    //   return <Redirect to="/home" />;
    // }

    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <React.Fragment>
        <div className="reg-nav">
          <PageHeader
            className="site-page-header"
            onBack={this.goBack}
            title="返回"
          />
        </div>
        <div className="login-wrapper box">
          <section>
            <span className='login-title'>请登录</span>
              <Form onSubmit={this.handleSubmit} className="login-box">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入用户名! "
                      },
                      { min: 4, message: "用户名至少4位" },
                      { max: 12, message: "用户名最多12位" },
                      {
                        pattern: /^[a-zA-Z0-9_]+$/,
                        message: "用户名必须是字母、数字或下划线"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="用户名"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const WrapLogin = Form.create()(Login);
export default WrapLogin;
