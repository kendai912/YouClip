/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from "vue";
import router from "./router.js";
import App from "./App.vue";

new Vue({
  el: "#app",
  router, // ルーティングの定義を読み込む
  components: { App }, // ルートコンポーネントの使用を宣言する
  template: "<App />" // ルートコンポーネントを描画する
});

// require("./bootstrap");

// window.Vue = require("vue");

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component(
//   "example-component",
//   require("./components/ExampleComponent.vue")
// );

// const app = new Vue({
//   el: "#app"
// });
