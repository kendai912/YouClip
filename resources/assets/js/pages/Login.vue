<template>
  <div class="container--small">
    <v-sheet tile class="mx-auto py-3 px-2" align="center" justify="center" max-width="400px">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" align="center" justify="center" style="height: 40px;">
          <v-col class="ma-0 pa-0">
            <v-card-text class="text-center">連携済みアカウントでログイン</v-card-text>
          </v-col>
        </v-row>
        <v-row class="mb-4 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <a href="/api/auth/google">
              <v-img width="44px" aspect-ratio="1" src="/storage/logos/google.png"></v-img>
            </a>
          </v-col>
          <v-col class="ma-0 pa-0">
            <a href="/api/auth/facebook">
              <v-img width="44px" aspect-ratio="1" src="/storage/logos/icon_facebook.svg"></v-img>
            </a>
          </v-col>
          <v-col class="ma-0 pa-0">
            <a href="/api/auth/twitter">
              <v-img width="44px" aspect-ratio="1" src="/storage/logos/icon_twitter.svg"></v-img>
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
            <v-card-text class="ma-0 pa-0">メールアドレス・パスワードでログイン</v-card-text>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="loginForm.email"
              v-bind:rules="emailRules"
              label="E-mail"
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
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      // authストアのloginアクションを呼び出す
      await this.$store.dispatch("auth/login", this.loginForm);

      if (this.apiStatus) {
        //トップページに移動する
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    })
  },
  created() {
    //ナビバーを表示
    this.$store.commit("navbar/setShowNavbar", true);
  }
};
</script>
