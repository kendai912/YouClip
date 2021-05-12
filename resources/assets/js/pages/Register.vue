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
              連携済みアカウントで新規登録
            </h2>
          </v-col>
        </v-row>
        <v-row class="mb-4 pa-0" align="center">
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
        <v-row class="my-2 pa-0" align="center" style="height: 40px;">
          <v-col class="ma-0 pa-0">
            <h2
              style="font-size: 1rem !important; font-weight: normal !important;"
            >
              名前・メールアドレス・パスワードで新規登録
            </h2>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="registerForm.name"
              v-bind:rules="nameRules"
              v-on:keydown.enter="register"
              label="Name"
              class="ma-0 pa-0"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="registerForm.email"
              v-bind:rules="emailRules"
              v-on:keydown.enter="register"
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
              v-model="registerForm.password"
              v-bind:append-icon="passwordField ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:rules="[passwordRules.required, passwordRules.min]"
              v-bind:type="passwordField ? 'text' : 'password'"
              v-on:keydown.enter="register"
              label="Password"
              hint="6文字以上で入力下さい"
              @click:append="passwordField = !passwordField"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="registerForm.password_confirmation"
              v-bind:append-icon="
                passwordConfirmationField ? 'mdi-eye' : 'mdi-eye-off'
              "
              v-bind:rules="[passwordRules.required, passwordRules.min]"
              v-bind:type="passwordConfirmationField ? 'text' : 'password'"
              v-on:keydown.enter="register"
              label="Password (確認)"
              hint="6文字以上で入力下さい"
              @click:append="
                passwordConfirmationField = !passwordConfirmationField
              "
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0 text-right" align="center">
          <v-col class="ma-0 pa-0">
            <v-btn v-on:click="register" color="primary">新規登録</v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-list v-if="registerErrors" dense>
              <v-list-item-group v-model="registerErrors">
                <v-list-item
                  v-for="(nameErrorItem, nameErrorIndex) in registerErrors.name"
                  v-bind:key="nameErrorItem + nameErrorIndex"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="red--text"
                      v-text="nameErrorItem"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(emailErrorItem,
                  emailErrorIndex) in registerErrors.email"
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
                  passwordErrorIndex) in registerErrors.password"
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
      title: "新規登録 - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの新規登録ページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きを見ることも可能です。",
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
          content: "新規登録 - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの新規登録ページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。",
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
      nameRules: [
        (v) => !!v || "必須項目です",
        (v) => v.length <= 10 || "名前は10文字以下で記入下さい",
      ],
      emailRules: [
        (v) => !!v || "必須項目です",
        (v) => /.+@.+\..+/.test(v) || "無効なメールアドレスです",
      ],
      passwordRules: {
        required: (value) => !!value || "必須項目です.",
        min: (v) => v.length >= 6 || "パスワードは6文字以上で入力下さい",
      },
      passwordField: false,
      passwordConfirmationField: false,
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
    async register() {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      //authストアのregisterアクションを呼び出す
      await this.$store.dispatch("auth/register", this.registerForm);

      if (this.apiStatus) {
        //元いたページに移動する
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
      registerErrors: (state) => state.auth.registerErrorMessages,
    }),
  },
  created() {
    //ナビバーを表示
    this.$store.commit("navbar/setShowNavbar", true);

    this.clearError();
  },
};
</script>
