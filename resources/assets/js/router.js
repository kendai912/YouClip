import Vue from "vue";
import VueRouter from "vue-router";

// ページコンポーネントをインポートする
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Result from "./pages/Result.vue";
import Highlight from "./pages/Highlight.vue";
import YTresult from "./pages/YTresult.vue";
import Tagging from "./pages/Tagging.vue";
import Watch from "./pages/Watch.vue";
import Mypage from "./pages/Mypage.vue";
import MyFollow from "./pages/MyFollow.vue";
import SystemError from "./pages/errors/System.vue";
import ForbiddenError from "./pages/errors/ForbiddenError.vue";
import PrivacyPolicy from "./pages/PrivacyPolicy.vue";
import TermsOfService from "./pages/TermsOfService.vue";
import DeleteAccount from "./pages/DeleteAccount.vue";
import EditMyPlaylist from "./pages/EditMyPlaylist.vue";

import store from "./store";

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter);

// パスとコンポーネントのマッピング
const routes = [
  {
    path: "/",
    component: Home,
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
    },
  },
  {
    path: "/register",
    component: Register,
    beforeEnter(to, from, next) {
      if (store.getters["auth/check"]) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/result",
    component: Result,
  },
  {
    path: "/highlight",
    component: Highlight,
  },
  // {
  //   path: "/tagging",
  //   component: Tagging,
  // },
  {
    path: "/YTresult",
    component: YTresult,
  },
  {
    path: "/youtube/highlight",
    component: Highlight,
  },
  {
    path: "/youtube/confirm",
    component: Highlight,
  },
  {
    path: "/youtube/scenelist",
    component: Highlight,
  },
  {
    path: "/youtube/title",
    component: Highlight,
  },
  {
    path: "/youtube/complete",
    component: Highlight,
  },
  {
    path: "/add",
    component: Highlight,
  },
  {
    path: "/add/search",
    component: Highlight,
  },
  {
    path: "/add/highlight",
    component: Highlight,
  },
  {
    path: "/add/confirm",
    component: Highlight,
  },
  {
    path: "/edit/highlight",
    component: Highlight,
  },
  {
    path: "/edit/confirm",
    component: Highlight,
  },
  {
    path: "/watch",
    component: Watch,
  },
  {
    path: "/mypage",
    component: Mypage,
  },
  {
    path: "/myfollow",
    component: MyFollow,
  },
  {
    path: "/editmyplaylist",
    component: EditMyPlaylist,
  },
  {
    path: "/PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/TermsOfService",
    component: TermsOfService,
  },
  {
    path: "/DeleteAccount",
    component: DeleteAccount,
  },
  {
    path: "/500",
    component: SystemError,
  },
  {
    path: "/403",
    component: ForbiddenError,
  },
  { path: "*", component: ForbiddenError },
];

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve, reject) => {
        setTimeOut(() => {
          resolve(savedPosition);
        });
      });
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router;
