import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'

import LinkButton from '../../../components/admin/link-button/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory, reqDeleteCategory } from '../../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

/*
商品分类路由页面
*/
export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一类分类列表数组
    subCategorys: [], // 二级分类列表数组
    parentId: '0', // 当前需要显示的分类列表的id
    parentName: '',
    showStatus: 0,
  }

  initCols = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
            <LinkButton onClick={() => this.deletCategory(category)}>删除</LinkButton>
          </span>
        )
      },
    ];
  }

  getCategorys = async (parentId) => { // 获取分类列表函数
    console.log('进入getCategorys()')
    this.setState({ loading: true }) // 在发请求前，显示loading
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId) // 发异步ajax请求，获取数据
    this.setState({ loading: false }) // 在请求完成后，隐藏loading
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({ categorys }) // 更新一级状态
      } else {
        this.setState({ subCategorys: categorys }) // 更新一级状态
      }
    } else {
      message.error('获取分类列表失败了')
    }
  }

  showCategorys = () => {
    console.log('进入showCategorys()')
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: [],
    })
  }

  showSubCategorys = (category) => {
    console.log('进入showSubCategorys()')
    this.setState({
      parentId: category._id,
      parentName: category.name,
    }, () => {
      this.getCategorys()// 显示指定一级分类的二级列表
    })
  }

  deletCategory = (category) => {
    Modal.confirm({
      content: '确定删除吗?',
      onOk: async () => {
        const _id = category
        const result = await reqDeleteCategory(_id)
        console.log(_id)
        if (result.status === 0) {
          this.getCategorys()
        }
      },
    })
  }

  showAdd = () => {
    console.log('进入showAdd()')
    this.setState({
      showStatus: 1,
    })
  }

  showUpdate = (category) => {
    // console.log('进入showUpdate()')
    this.category = category // 保存分类对象
    console.log(category)
    this.setState({
      showStatus: 2,
    }) //更新状态
  }

  addCategory = () => {
    console.log('进入addCategory()')
    this.form.validateFields(
      async (err, values) => {
        if (!err) {
          // 1. 隐藏确认框
          this.setState({ showStatus: 0 })
          // 2. 准备发送数据
          const { parentId, categoryName } = values
          // 3. 发送数据
          this.form.resetFields() // 清除已经输入的数据
          const result = await reqAddCategory(categoryName, parentId)
          if (result.status === 0) {
            console.log(`parentId:${parentId}, categoryName:${categoryName}`)
            if (parentId === this.state.parentId) {
              this.getCategorys() // 刷新当前分类列表
            } else if (parentId === '0') {
              this.getCategorys('0')
            }
          }
        }
      }
    )
  }

  updateCategory = () => {
    console.log('进入updateCategory()')
    // 0. 表单验证
    this.form.validateFields(
      async (err, values) => {
        if (!err) {
          // 1. 隐藏打开的确认框
          this.setState({
            showStatus: 0,
          })
          // 2. 准备数据
          const categoryId = this.category._id // 读取准备发送的数据
          const { categoryName } = values
          // 3. 发送修改数据的请求
          this.form.resetFields() // 清除输入的数据
          const result = await reqUpdateCategory({ categoryId, categoryName })
          if (result.status === 0) {
            console.log(`_id:${categoryId}, categoryName:${categoryName}`)
            // 3. 如果发送成功, 重新显示列表
            this.getCategorys()
          }
        }
      })
  }

  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0,
    })
  }

  componentWillMount() {
    this.initCols() // 为第一次render准备数据
  }

  componentDidMount() {
    this.getCategorys() // 执行异步ajax请求, 获取一级列表
  }

  render() {

    const { loading, categorys, parentId, subCategorys, parentName, showStatus } = this.state
    const category = this.category || {} // 读取指定的分类
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>
    ) // 定义左侧标题

    const extra = (
      <div>
        <Button type='primary' onClick={this.showAdd}>
          <Icon type='plus' />
          <span>添加</span>
        </Button>
      </div>
    )  // 定义右侧添加按钮

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          bordered
          loading={loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={
              (form) => { this.form = form }
            } />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={
              (form) => { this.form = form }
            } />
        </Modal>
      </Card>
    )
  }
}
