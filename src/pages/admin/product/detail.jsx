import React from "react";
import { Card, Icon, List } from "antd";
import Item from "antd/lib/list/Item";

import LinkButton from "../../../components/admin/link-button/link-button";
import { IMG_URL } from "../../../utils/constants";
import { reqCategory } from "../../../api";

export default class ProductDetail extends React.Component {
  state = {
    cName1: "",
    cName2: ""
  };

  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      // 一级分类下的商品
      const res = await reqCategory(categoryId);
      const cName1 = res.data.name;
      this.setState({ cName1 });
    } else {
      // 二级分类下的商品

      // const res1 = await reqCategory(pCategoryId);
      // const res2 = await reqCategory(categoryId);
      // const cName1 = res1.data.name;
      // const cName2 = res2.data.name;

      const res = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId)
      ]);
      const cName1 = res[0].data.name;
      const cName2 = res[1].data.name;
      this.setState({
        cName1,
        cName2
      });
    }
  }

  render() {
    const title = (
      <span>
        <LinkButton>
          <Icon
            type="arrow-left"
            style={{ marginRight: 8, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>商品详情</span>
      </span>
    );

    // 读取商品数据
    const {
      _id,
      name,
      desc,
      price,
      imgs,
      detail
    } = this.props.location.state.product;

    const { cName1, cName2 } = this.state;

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品id：</span>
            <span>{_id}</span>
          </Item>
          <Item>
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </Item>
          <span>
            <span className="left">商品描述：</span>
            <span>{desc}</span>
          </span>
          <Item>
            <span className="left">商品价格：</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="left">所属分类：</span>
            <span>
              {cName1}
              {cName2 ? "-->" + cName2 : null}
            </span>
          </Item>
          <Item>
            <span className="left">商品图片：</span>
            <span>
              {imgs.map(img => (
                <img
                  className="product-img"
                  key={img}
                  src={IMG_URL + img}
                  alt="img"
                />
              ))}
            </span>
          </Item>
          <Item>
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
