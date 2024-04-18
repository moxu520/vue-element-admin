import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";
// import enLang from "element-ui/lib/locale/lang/en"; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "./icons"; // icon
import "./permission"; // permission control
import "./utils/error-log"; // error log

import * as filters from "./filters"; // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 *
 *
 * 如果你不想使用模拟服务器
 * 你想使用 MockJs 来模拟 api
 * 你可以执行：mockXHR()
 *
 * 目前生产环境会使用MockJs，
 * 上线前请先删除！ ！ ！
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size (设置 element-ui 默认大小)
  // locale: enLang, // 如果使用中文，无需设置，请删除
});

// register global utility filters  (注册全局实用程序过滤器)
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 这个设置的作用是，当 Vue.js 在启动时，是否产生生产提示。
// 如果设置为 true(默认值为 true)，则在 Vue 启动时会生成关于你是否在生产模式下运行 Vue 的提示。
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App), // render: (h) => h(App)：这是一个渲染函数，用以渲染 Vue 实例要显示的内容，h 是创建元素的别名，App 是一个 Vue 组件（通常在另一个文件中定义，然后在这里引入），这里相当于告诉 Vue 实例要显示 App 组件的内容。这是 Vue.js 的模板编译器的底层工作原理，它会将您的模板编译成此类渲染函数。
});
