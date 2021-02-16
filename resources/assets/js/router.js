import Vue from "vue";
import VueRouter from "vue-router";

// ページコンポーネントをインポートする
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
// import Result from "./pages/Result.vue";
// import Highlight from "./pages/Highlight.vue";
// import Watch from "./pages/Watch.vue";
// import Mypage from "./pages/Mypage.vue";
// import MyFollow from "./pages/MyFollow.vue";
import UserGuide from "./pages/UserGuide.vue";
import SystemError from "./pages/errors/SystemError.vue";
import ForbiddenError from "./pages/errors/ForbiddenError.vue";
import PrivacyPolicy from "./pages/PrivacyPolicy.vue";
import TermsOfService from "./pages/TermsOfService.vue";
import DeleteAccount from "./pages/DeleteAccount.vue";
// import EditMyPlaylist from "./pages/EditMyPlaylist.vue";

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
  // {
  //   path: "/result",
  //   component: Result,
  // },
  {
    path: "/result",
    name: "result",
    component: (resolve) => {
      require.ensure(
        ["./pages/Result.vue"],
        () => {
          resolve(require("./pages/Result.vue"));
        },
        "js/result"
      );
    },
  },
  // {
  //   path: "/youtube",
  //   component: Highlight,
  // },
  {
    path: "/youtube",
    name: "youtube",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/youtube"
      );
    },
  },
  // {
  //   path: "/youtube/scene",
  //   component: Highlight,
  // },
  {
    path: "/youtube/scene",
    name: "youtube_scene",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/youtube_scene"
      );
    },
  },
  // {
  //   path: "/youtube/confirm",
  //   component: Highlight,
  // },
  {
    path: "/youtube/confirm",
    name: "youtube_confirm",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/youtube_confirm"
      );
    },
  },
  // {
  //   path: "/highlight/scenelist",
  //   component: Highlight,
  // },
  {
    path: "/highlight/scenelist",
    name: "highlight_scenelist",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight_scenelist"
      );
    },
  },
  // {
  //   path: "/highlight/title",
  //   component: Highlight,
  // },
  {
    path: "/highlight/title",
    name: "highlight_title",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight_title"
      );
    },
  },
  // {
  //   path: "/highlight/complete",
  //   component: Highlight,
  // },
  {
    path: "/highlight/complete",
    name: "highlight_complete",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight_complete"
      );
    },
  },
  // {
  //   path: "/add",
  //   component: Highlight,
  // },
  {
    path: "/add",
    name: "add",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/add"
      );
    },
  },
  // {
  //   path: "/add/search",
  //   component: Highlight,
  // },
  {
    path: "/add/search",
    name: "add_search",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/add_search"
      );
    },
  },
  // {
  //   path: "/add/scene",
  //   component: Highlight,
  // },
  {
    path: "/add/scene",
    name: "add_scene",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/add_scene"
      );
    },
  },
  // {
  //   path: "/add/confirm",
  //   component: Highlight,
  // },
  {
    path: "/add/confirm",
    name: "add_confirm",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/add_confirm"
      );
    },
  },
  // {
  //   path: "/edit/scene",
  //   component: Highlight,
  // },
  {
    path: "/edit/scene",
    name: "edit_scene",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/edit_scene"
      );
    },
  },
  // {
  //   path: "/edit/confirm",
  //   component: Highlight,
  // },
  {
    path: "/edit/confirm",
    name: "edit_confirm",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/edit_confirm"
      );
    },
  },
  // {
  //   path: "/watch",
  //   component: Watch,
  // },
  {
    path: "/watch",
    name: "watch",
    component: (resolve) => {
      require.ensure(
        ["./pages/Watch.vue"],
        () => {
          resolve(require("./pages/Watch.vue"));
        },
        "js/watch"
      );
    },
  },
  // {
  //   path: "/mypage",
  //   component: Mypage,
  // },
  {
    path: "/mypage",
    name: "mypage",
    component: (resolve) => {
      require.ensure(
        ["./pages/Mypage.vue"],
        () => {
          resolve(require("./pages/Mypage.vue"));
        },
        "js/mypage"
      );
    },
  },
  // {
  //   path: "/myfollow",
  //   component: MyFollow,
  // },
  // {
  //   path: "/editmyplaylist",
  //   component: EditMyPlaylist,
  // },
  {
    path: "/editmyplaylist",
    name: "editmyplaylist",
    component: (resolve) => {
      require.ensure(
        ["./pages/EditMyPlaylist.vue"],
        () => {
          resolve(require("./pages/EditMyPlaylist.vue"));
        },
        "js/editmyplaylist"
      );
    },
  },
  {
    path: "/userguide",
    component: UserGuide,
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
  { path: "*", redirect: "/" },
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
