import Vue from "vue";
import VueRouter from "vue-router";

// ページコンポーネントをインポートする
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Search from "./pages/Search.vue";
import Result from "./pages/Result.vue";
import Tagging from "./pages/Tagging.vue";
import Mypage from "./pages/Mypage.vue";
import SystemError from "./pages/errors/System.vue";

import store from "./store";

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter);

// パスとコンポーネントのマッピング
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters["auth/check"]) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/home",
    redirect: "/"
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/result",
    component: Result
  },
  {
    path: "/tagging",
    component: Tagging
  },
  {
    path: "/mypage",
    component: Mypage
  },
  {
    path: "/500",
    component: SystemError
  }
];

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: "history",
  routes
});

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router;
