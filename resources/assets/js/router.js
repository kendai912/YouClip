import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

// ページコンポーネントをインポートする
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Home from "./pages/Home.vue";

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
    name: "home",
    component: (resolve) => {
      require.ensure(
        ["./pages/Home.vue"],
        () => {
          resolve(require("./pages/Home.vue"));
        },
        "js/home"
      );
    },
  },
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
  {
    path: "/youtube",
    name: "youtube",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/youtube/scene",
    name: "youtube_scene",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/youtube/confirm",
    name: "youtube_confirm",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/highlight/scenelist",
    name: "highlight_scenelist",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/highlight/title",
    name: "highlight_title",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/highlight/complete",
    name: "highlight_complete",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/add",
    name: "add",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/add/search",
    name: "add_search",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/add/scene",
    name: "add_scene",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/add/confirm",
    name: "add_confirm",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/edit/scene",
    name: "edit_scene",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
  {
    path: "/edit/confirm",
    name: "edit_confirm",
    component: (resolve) => {
      require.ensure(
        ["./pages/Highlight.vue"],
        () => {
          resolve(require("./pages/Highlight.vue"));
        },
        "js/highlight"
      );
    },
  },
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
    name: "userguide",
    component: (resolve) => {
      require.ensure(
        ["./pages/UserGuide.vue"],
        () => {
          resolve(require("./pages/UserGuide.vue"));
        },
        "js/userguide"
      );
    },
  },
  {
    path: "/privacyPolicy",
    name: "privacyPolicy",
    component: (resolve) => {
      require.ensure(
        ["./pages/PrivacyPolicy.vue"],
        () => {
          resolve(require("./pages/PrivacyPolicy.vue"));
        },
        "js/privacyPolicy"
      );
    },
  },
  {
    path: "/termsOfService",
    name: "termsOfService",
    component: (resolve) => {
      require.ensure(
        ["./pages/TermsOfService.vue"],
        () => {
          resolve(require("./pages/TermsOfService.vue"));
        },
        "js/termsOfService"
      );
    },
  },
  {
    path: "/deleteAccount",
    name: "deleteAccount",
    component: (resolve) => {
      require.ensure(
        ["./pages/DeleteAccount.vue"],
        () => {
          resolve(require("./pages/DeleteAccount.vue"));
        },
        "js/deleteAccount"
      );
    },
  },
  {
    path: "/500",
    name: "systemError",
    component: (resolve) => {
      require.ensure(
        ["./pages/errors/SystemError.vue"],
        () => {
          resolve(require("./pages/errors/SystemError.vue"));
        },
        "js/systemError"
      );
    },
  },
  {
    path: "/403",
    name: "forbiddenError",
    component: (resolve) => {
      require.ensure(
        ["./pages/errors/ForbiddenError.vue"],
        () => {
          resolve(require("./pages/errors/ForbiddenError.vue"));
        },
        "js/forbiddenError"
      );
    },
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
