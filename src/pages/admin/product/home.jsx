import React from "react";
import { Card, Select, Input, Button, Icon, Table, message, Modal } from "antd";

import LinkButton from "../../../components/admin/link-button/link-button";
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateStatus,
  reqDeleteProduct
} from "../../../api";
import { PAGE_SIZE } from "../../../utils/constants";

export default class ProductHome extends React.Component {
  state = {
    products: [],
    total: 0,
    loding: false,
    searchName: "",
    searchType: "productName"
  };

  initCols = () => {
    this.cols = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        width: 100,
        dataIndex: "price",
        render: price => "￥" + price
      },
      {
        title: "状态",
        width: 100,
        // dataIndex: "status",
        render: product => {
          const { status, _id } = product;
          // console.log(product);
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </span>
          );
        }
      },
      {
        title: "操作",
        width: 100,
        render: product => {
          const url = "/admin/product/detail";
          return (
            <span>
              <LinkButton
                onClick={() => this.props.history.push(url, { product })}
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/admin/product/addupdate", product)
                }
              >
                修改
              </LinkButton>
              <LinkButton onClick={() => this.deleteProduct(product)}>
                删除
              </LinkButton>
            </span>
          );
        }
      }
    ];
  };

  getProducts = async pageNum => {
    this.pageNum = pageNum;
    this.setState({ loding: true });
    const { searchName, searchType } = this.state;
    console.log("searchName/Type is : ", searchName, searchType);
    let result;
    if (searchName) {
      console.log("ok");
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      });
      console.log("请求搜索商品数据1：", result);
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);
      console.log("请求搜索商品数据2：", result);
    }
    this.setState({ loding: false });
    if (result.status === 0) {
      // 若成功，更新列表
      const { total, list } = result.data;
      this.setState({
        total,
        products: list
      });
    }
  };

  updateStatus = async (productId, status) => {
    // console.log("更新前的status：", status);
    const res = await reqUpdateStatus(productId, status);
    if (res.status === 0) {
      message.success("更新成功");
      // console.log("更新后的status：", status);
      this.getProducts(this.pageNum);
    }
  };

  deleteProduct = product => {
    Modal.confirm({
      content: "确定删除吗?",
      onOk: async () => {
        const _id = product;
        const result = await reqDeleteProduct(_id);
        console.log(_id);
        if (result.status === 0) {
          this.getProducts(this.pageNum);
        }
      }
    });
  };

  componentWillMount() {
    this.initCols();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, searchName, searchType } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value =>
            this.setState({
              searchType: value
            })
          }
        >
          <Select.Option value="productName">按名称搜索</Select.Option>
          <Select.Option value="productDesc">按描述搜索</Select.Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 150, margin: "0 15px" }}
          value={searchName}
          onChange={e =>
            this.setState({
              searchName: e.target.value
            })
          }
        />
        <Button
          type="primary"
          onClick={() => {
            this.getProducts(1);
          }}
        >
          搜索
        </Button>
      </span>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/admin/product/addupdate")}
      >
        <Icon type="plus" />
        添加商品
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          dataSource={products}
          columns={this.cols}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            onChange: this.getProducts,
            showQuickJumper: true
          }}
        />
      </Card>
    );
  }
}
