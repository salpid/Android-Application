/*
包含应用中所有接口请求函数的模块
*/
import ajax from "./myajax";
const base = "";
// 登录
export const reqLogin = (username, password) =>
  ajax(base + "/login", { username, password }, "POST");
// // 添加用户
// export const reqAddUser = username =>
//   ajax(base + "/manage/user/add", username, "POST");
// 获取用户列表
export const reqUserList = () => ajax(base + "/manage/user/list");

/*
分类管理
*/
// 获取分类列表
export const reqCategorys = parentId =>
  ajax(base + "/manage/category/list", { parentId });
// 添加商品分类
export const reqAddCategory = (categoryName, parentId) =>
  ajax(base + "/manage/category/add", { categoryName, parentId }, "POST");
// 删除商品分类
export const reqDeleteCategory = _id =>
  ajax(base + "/manage/category/delete", _id, "POST");
// 更新商品分类
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(base + "/manage/category/update", { categoryId, categoryName }, "POST");

/*
商品管理
*/
// 查询商品
export const reqProducts = (pageNum, pageSize) =>
  ajax(base + "/manage/product/list", { pageNum, pageSize });
// 修改或添加商品信息
export const reqChangeProduct = product =>
  ajax(
    base + "/manage/product/" + (product._id ? "update" : "add"),
    product,
    "POST"
  );
// 删除商品
export const reqDeleteProduct = _id =>
  ajax(base + "/manage/product/delete", _id, "POST");
// 删除图片
export const reqDeleteImg = name =>
  ajax(base + "/manage/img/delete", { name }, "POST");
// 搜索商品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType
}) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName
  });
export const reqCategory = categoryId =>
  ajax(base + "/manage/category/info", { categoryId });
// 商品上下架
export const reqUpdateStatus = (productId, status) =>
  ajax(base + "/manage/product/updateStatus", { productId, status }, "POST");

/*
权限管理
*/
// 获取角色列表
export const reqRoles = () => ajax(base + "/manage/role/list");
// 添加角色
export const reqAddRole = roleName =>
  ajax(base + "/manage/role/add", { roleName }, "POST");
// 设置权限
export const reqUpdateRole = role =>
  ajax(base + "/manage/role/update", role, "POST");

/*
用户管理
*/
export const reqAddUser = ({ username, password, phone, email, role_id }) =>
  ajax(
    base + "/manage/user/add",
    { username, password, phone, email, role_id },
    "POST"
  );
