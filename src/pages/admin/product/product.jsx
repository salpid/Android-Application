import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

import './product.less'

/*
商品路由
*/

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin/product' component={ProductHome} exact />
        <Route path='/admin/product/addupdate' component={ProductAddUpdate} />
        <Route path='/admin/product/detail' component={ProductDetail} />
      </Switch>
    )
  }
}
