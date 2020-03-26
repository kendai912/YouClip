/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import "./bootstrap";
import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const createApp = async () => {
  await store.dispatch("auth/currentUser");

  new Vue({
    el: "#app",
    router, // ルーティングの定義を読み込む
    vuetify: new Vuetify(),
    store,
    icons: {
      iconfont: "fa mdi"
    },
    components: { App }, // ルートコンポーネントの使用を宣言する
    template: "<App />" // ルートコンポーネントを描画する
  });
};
createApp();

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
