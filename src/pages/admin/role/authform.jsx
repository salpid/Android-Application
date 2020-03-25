import React, { Component } from "react";
import { Form, Tree, Input } from "antd";
import PropTypes from "prop-types";

import menuList from "../../../config/menuConfig";

const Item = Form.Item;
const { TreeNode } = Tree;

class AuthForm extends Component {
  static propTypes = { role: PropTypes.object }; // 接受当前选中的role

  constructor(props) {
    super(props);
    const { menus } = this.props.role;
    this.state = {
      checkedKeys: menus
    };
  }

  getMenus = () => this.state.checkedKeys;

  getTreeNodes = menuList => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.child ? this.getTreeNodes(item.child) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };

  onCheck = checkedKeys => {
    // console.log("onCheck", checkedKeys);
    this.setState({ checkedKeys });
  };

  componentWillMount() {
    // 钩子函数，首次渲染之前
    this.treeNodes = this.getTreeNodes(menuList);
  }

  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus;
    this.setState({ checkedKeys: menus });
  }

  render() {
    console.log("AuthForm");
    const { role } = this.props;
    const { checkedKeys } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    };

    return (
      <div>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

export default AuthForm;
