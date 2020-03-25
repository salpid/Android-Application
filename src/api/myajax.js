/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化: 统一处理请求?
  在外层包一个自己创建的promise对象
  请求出错时,不reject(error), 而是显示错误提示
2. 优化: 异步得到的不是response, 而是response.data
*/
import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
                                      // 形参默认值
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(url, { params: data });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        message.error();
      });
  });
}
