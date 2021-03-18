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
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import colors from "vuetify/lib/util/colors";
import lodash from "lodash";
import VueGtag from "vue-gtag";
import VueMeta from "vue-meta";
import VueTour from "vue-tour";

require("vue-tour/dist/vue-tour.css");

Vue.use(Vuetify);
Vue.use(
  VueGtag,
  {
    config: { id: "UA-11415493-3" },
  },
  router
);
Vue.use(VueMeta);
Vue.use(VueTour);

Vue.prototype._ = lodash;

const opts = {};

const createApp = async () => {
  await store.dispatch("auth/currentUser");

  new Vue({
    el: "#app",
    router, // ルーティングの定義を読み込む
    vuetify: new Vuetify({
      theme: {
        themes: {
          light: {
            primary: colors.green,
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
          },
        },
      },
    }),
    store,
    icons: {
      iconfont: "fa mdi md",
    },
    components: { App }, // ルートコンポーネントの使用を宣言する
    template: "<App />", // ルートコンポーネントを描画する
    render: (h) => h(App),
  });
};
export default new Vuetify(opts);
createApp();
