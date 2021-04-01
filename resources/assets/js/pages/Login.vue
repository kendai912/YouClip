<template>
  <div class="container--small">
    <v-sheet
      tile
      class="mx-auto py-3 px-2 body-color"
      align="center"
      justify="center"
      max-width="420px"
    >
      <v-container class="ma-0 pa-0" fluid>
        <v-row
          class="ma-0 pa-0"
          align="center"
          justify="center"
          style="height: 40px;"
        >
          <v-col class="ma-0 pa-0">
            <h2
              style="font-size: 1rem !important; font-weight: normal !important;"
            >
              連携済みアカウントでログイン
            </h2>
          </v-col>
        </v-row>
        <v-row class="mb-4 mx-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <a href="/api/auth/google">
              <v-img
                width="44px"
                aspect-ratio="1"
                alt="Google login"
                src="/storage/logos/google.png"
              ></v-img>
            </a>
          </v-col>
          <v-col class="ma-0 pa-0">
            <a href="/api/auth/facebook">
              <v-img
                width="44px"
                aspect-ratio="1"
                alt="Facebook login"
                src="/storage/logos/icon_facebook.svg"
              ></v-img>
            </a>
          </v-col>
          <v-col class="ma-0 pa-0">
            <a href="/api/auth/twitter">
              <v-img
                width="44px"
                aspect-ratio="1"
                alt="Twitter login"
                src="/storage/logos/icon_twitter.svg"
              ></v-img>
            </a>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row class="my-2 mx-0 pa-0" align="center" style="height: 40px;">
          <v-col class="ma-0 pa-0">
            <h2
              style="font-size: 1rem !important; font-weight: normal !important;"
            >
              メールアドレス・パスワードでログイン
            </h2>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="loginForm.email"
              v-bind:rules="emailRules"
              v-on:keydown.enter="login"
              label="Email"
              class="ma-0 pa-0"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="loginForm.password"
              v-on:keydown.enter="login"
              label="Password"
              type="password"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0 text-right" align="center">
          <v-col class="ma-0 pa-0">
            <v-btn v-on:click="login" color="primary">ログイン</v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-list v-if="loginErrors" dense>
              <v-list-item-group v-model="loginErrors">
                <v-list-item
                  v-for="(emailErrorItem, emailErrorIndex) in loginErrors.email"
                  v-bind:key="emailErrorItem + emailErrorIndex"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="red--text"
                      v-text="emailErrorItem"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(passwordErrorItem,
                  passwordErrorIndex) in loginErrors.password"
                  v-bind:key="passwordErrorItem + passwordErrorIndex"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="red--text"
                      v-text="passwordErrorItem"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  metaInfo() {
    return {
      title: "ログイン - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube動画の切り抜きまとめサイト、YouClipのログインページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きまとめを見ることも可能です。",
        },
        {
          property: "og:site_name",
          content: "YouClip",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://youclip.jp" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: "ログイン - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube動画の切り抜きまとめサイト、YouClipのログインページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きまとめを誰でも簡単に作ることが出来ます。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.jp" + this.$route.path },
      ],
    };
  },
  data() {
    return {
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      loginForm: {
        email: "",
        password: "",
      },
      beforeLoginUrl: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.beforeLoginUrl = from;
    });
  },
  methods: {
    async login() {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      // authストアのloginアクションを呼び出す
      await this.$store.dispatch("auth/login", this.loginForm);

      if (this.apiStatus) {
        //ログインモーダルを閉じて、元いたページに移動する
        this.$store.commit("noLoginModal/closeLoginModal");
        this.$router.push(this.beforeLoginUrl);
      }
    },
    clearError() {
      this.$store.commit("auth/setLoginErrorMessages", null);
      this.$store.commit("auth/setRegisterErrorMessages", null);
    },
  },
  computed: {
    ...mapState({
      apiStatus: (state) => state.auth.apiStatus,
      loginErrors: (state) => state.auth.loginErrorMessages,
    }),
  },
  created() {
    //ナビバーを表示
    this.$store.commit("navbar/setShowNavbar", true);

    this.clearError();
  },
};
</script>
