import React, { Component } from "react";
import { Button, Card, Table, Modal, Icon, message } from "antd";
import dayjs from "dayjs";

import { PAGE_SIZE } from "../../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../../api";
import AddForm from "./add-form";
import AuthForm from "./authform";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";

export default class Role extends Component {
  state = {
    roles: [], // 角色列表数组
    role: {}, // 被选中的角色
    isShowAdd: false,
    isShowAuth: false
  };

  constructor(props) {
    super(props);
    this.auth = React.createRef();
  }

  initColumn = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
        width: "20%"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "25%",
        render: create_time => {
          return dayjs(create_time).format("YYYY年MM月DD日 HH:mm");
        }
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        key: "auth_time",
        width: "25%",
        render: auth_time => {
          return auth_time && dayjs(auth_time).format("YYYY年MM月DD日 HH:mm");
        }
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
        key: "auth_name",
        width: "15%"
      },
      {
        title: "操作",
        key: "operate",
        width: "15%",
        align: "center",
        render: () => (
          <Button
            type="link"
            onClick={() => {
              this.setState({ isShowAuth: true });
            }}
          >
            设置权限
          </Button>
        )
      }
    ];
  };

  getRoles = async () => {
    const res = await reqRoles();
    if (res.status === 0) {
      const roles = res.data;
      this.setState({
        roles
      });
    }
  };

  onRow = role => {
    return {
      onClick: e => {
        // console.log("row onClick:", role);
        // alert("ok");
        this.setState({
          role
        });
      }
    };
  };

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        this.setState({
          isShowAdd: false
        });
        // 收集输入数据
        const { roleName } = values;
        this.form.resetFields();
        // 请求添加
        const result = await reqAddRole(roleName);
        // 根据结果提示/更新列表显示
        if (result.status === 0) {
          const role = result.data;
          this.setState(state => ({
            roles: [...state.roles, role]
          }));
          message.success("添加角色成功");
        } else {
          message.warning("添加角色失败");
        }
      }
    });
  };

  updateRole = async () => {
    const role = this.state.role;
    const menus = this.auth.current.getMenus();
    role.menus = menus;
    role.auth_name = memoryUtils.user.username;
    role.auth_time = Date.now();
    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      if (role._id === memoryUtils.user.role_id) {
        message.success("权限更改，请重新登陆");
        memoryUtils.user = {};
        storageUtils.removeUser();
        this.props.history.replace("/login");
      } else {
        message.success("设置权限成功");
        this.setState({ roles: [...this.state.roles] });
      }
    } else {
      message.warning("错误");
    }
    this.setState({ isShowAuth: false });
  };

  componentWillMount() {
    this.initColumn();
  }

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state; // 取出状态里的数据

    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          <Icon type="plus" /> 新增角色
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        {/* 角色列表 */}
        <Table
          onRow={this.onRow}
          rowKey="_id"
          bordered
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        {/* 新增角色弹窗 */}
        <Modal
          title="新增角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false
            });
            this.form.resetFields();
          }}
        >
          <AddForm
            setForm={form => {
              this.form = form;
            }}
          />
        </Modal>
        {/* 设置角色权限 */}
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              isShowAuth: false
            });
          }}
          okText="确认"
          cancelText="取消"
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    );
  }
}
