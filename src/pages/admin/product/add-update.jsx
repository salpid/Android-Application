import React from "react";
import { Card, Icon, Form, Input, Cascader, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";

import LinkButton from "../../../components/admin/link-button/link-button";
import { reqCategorys, reqChangeProduct } from "../../../api";
import PictursWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";

class ProductAddUpdate extends React.Component {
  state = {
    options: []
  };

  constructor(props) {
    super(props);
    this.pw = React.createRef();
    this.editor = React.createRef();
  }

  initOptions = async categorys => {
    // 根据获取的商品分类数组categorys[] 生成选项卡的数组 options[]
    const options = categorys.map(c => ({
      value: c._id, // 一级分类的id
      label: c.name, // 一级分类名
      isLeaf: false
    }));

    const { isUpdate, product } = this;
    const { pCategoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      const subCategorys = await this.getCategorys(pCategoryId);
      //获取二级下拉列表
      const cOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      const targetOption = options.find(option => option.value === pCategoryId);
      // 关联一级下拉项
      targetOption.children = cOptions;
    }

    // 渲染
    this.setState({
      options
    });
  };

  getCategorys = async parentId => {
    // 异步获取商品分类
    const res = await reqCategorys(parentId); // 获取一级 or 二级分类列表
    if (res.status === 0) {
      const categorys = res.data;
      // console.log("getCategorys():", categorys);
      if (parentId === "0") {
        // 若为一级列表, 生成options
        this.initOptions(categorys);
      } else {
        // 返回Promise二级列表
        return categorys;
      }
    }
  };

  loadData = async selectedOptions => {
    // 获得被选中的选项
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    // 根据1级分类，异步获取2级分类列表
    const subCategorys = await this.getCategorys(targetOption.value);
    targetOption.loading = false;

    if (subCategorys && subCategorys.length > 0) {
      // 生产二级选项
      const cOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      targetOption.children = cOptions;
    } else {
      // 若不是叶子
      targetOption.isLeaf = true;
    }

    this.setState({
      options: [...this.state.options]
    });
  };

  submit = () => {
    // 收集表单数据
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const { name, desc, price, categoryIds } = values;
        let pCategoryId, categoryId;
        if (categoryIds.length === 1) {
          pCategoryId = "0";
          categoryId = categoryIds[0];
        } else {
          pCategoryId = categoryIds[0];
          categoryId = categoryIds[1];
        }
        const imgs = this.pw.current.getImgs();
        const detail = this.editor.current.getDetail();
        const product = {
          name,
          desc,
          price,
          imgs,
          detail,
          pCategoryId,
          categoryId
        };
        if (this.isUpdate) {
          product._id = this.product._id;
        }
        // console.log(product);
        const result = await reqChangeProduct(product);
        // console.log(result);
        if (result.status === 0) {
          message.success(`${this.isUpdate ? "更新" : "添加"}商品成功`);
          this.props.history.goBack();
        } else {
          message.error(`${this.isUpdate ? "更新" : "添加"}商品失败`);
        }
      }
    });
  };

  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback();
    } else {
      callback("价格必须大于0");
    }
  };

  componentWillMount() {
    const product = this.props.location.state;
    // console.log("准备数据：", product);
    this.isUpdate = !!product;
    this.product = product || {};
  }

  componentDidMount() {
    this.getCategorys("0");
  }

  render() {
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId, imgs, detail } = product;
    console.log("detail:", detail);
    const categoryIds = [];
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }
    const { getFieldDecorator } = this.props.form;
    // console.log("isUpdate/product", isUpdate, product);
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{ fontSize: 20 }} />
        </LinkButton>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    };
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Form.Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: product.name,
              rules: [{ required: true, message: "必须输入商品名称" }]
            })(<Input placeholder="请输入商品名称" />)}
          </Form.Item>

          <Form.Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: product.desc,
              rules: [{ required: true, message: "必须输入商品名称" }]
            })(
              <TextArea
                placeholder="请输入商品描述"
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            )}
          </Form.Item>

          <Form.Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: product.price,
              rules: [
                { required: true, message: "必须输入商品名称" },
                { validator: this.validatePrice }
              ]
            })(
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonAfter="元"
              />
            )}
          </Form.Item>

          <Form.Item label="商品分类">
            {getFieldDecorator("categoryIds", {
              initialValue: categoryIds,
              rules: [{ required: true, message: "必须指定商品分类" }]
            })(
              <Cascader
                options={this.state.options} // 需要显示的列表数据
                loadData={this.loadData} // 选择列表的下一级列表
                changeOnSelect
                placeholder="请指定商品分类"
              />
            )}
          </Form.Item>

          <Form.Item label="商品图片">
            <PictursWall ref={this.pw} imgs={imgs} />
          </Form.Item>

          <Form.Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.editor} detail={detail} />
          </Form.Item>

          <Button type="primary" onClick={this.submit}>
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate);
