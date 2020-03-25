import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Select,
  message
} from "antd";
import dayjs from "dayjs";

import { reqUserList, reqAddUser } from "../../../api";

class User extends Component {
  state = {
    visible: false,
    userList: [],
    roleList: []
  };

  getUserList = async () => {
    const result = await reqUserList();
    const { status, data, msg } = result;
    if (status === 0) {
      console.log(data);
      this.setState({ userList: data.users });
      this.setState({ roleList: data.roles });
    } else {
      message.warning(msg);
    }
  };
  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await reqAddUser(values);
        const { status, msg } = result;
        if (status === 0) {
          message.success("新增成功");
          this.getUserList();
        } else {
          message.warning("新增失败", msg);
        }
      }
    });
    this.setState({
      visible: false
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
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
  componentDidMount() {
    this.getUserList();
  }
  render() {
    const title = (
      <Button type="primary" onClick={() => this.setState({ visible: true })}>
        <Icon type="plus" />
        创建用户
      </Button>
    );
    const { userList, visible } = this.state;
    const columns = [
      {
        title: "角色名",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "15%",
        render: create_time => {
          return dayjs(create_time).format("YYYY年MM月DD日 HH:mm");
        }
      },
      {
        title: "所属权限",
        dataIndex: "role_id",
        key: "role_id",
        render: role_id => {
          const result = this.state.roleList.find(item => {
            return item.id === role_id;
          });
          if (result) return result.name;
          else return "";
        }
      },
      {
        title: "操作",
        key: "operate",
        width: "15%",
        align: "center",
        render: item => (
          <div>
            <Button type="link">修改</Button>
            <Button type="link">删除</Button>
          </div>
        )
      }
    ];
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <Card title={title}>
        <Table bordered rowKey="_id" dataSource={userList} columns={columns} />
        <Modal
          title="添加用户"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="用户名">
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
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    validator: this.validatePwd
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="手机号码">
              {getFieldDecorator("phone", {
                rules: [{ required: true }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator("email", { rules: [{ required: true }] })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="权限">
              {getFieldDecorator("role_id", {
                rules: [{ required: true, message: "必须选择一个角色" }]
              })(
                <Select>
                  <Select.Option value="">请选择一个角色</Select.Option>
                  {this.state.roleList.map(item => {
                    return (
                      <Select.Option key={item._id} value={item._id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}

const DecoratorUser = Form.create()(User);
export default DecoratorUser;
