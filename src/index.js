import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

// 读取local中的user保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

/* 网上书城项目的入口文件 */

ReactDOM.render(<App />, document.getElementById("root"));
