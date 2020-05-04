<template>
  <div class="container--small">
    <v-sheet tile class="mx-auto py-3 px-2" align="center" justify="center" max-width="400px">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" align="center" justify="center" style="height: 40px;">
          <v-col class="ma-0 pa-0">
            <v-card-text class="text-center">連携済みアカウントで新規登録</v-card-text>
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
            <v-card-text class="ma-0 pa-0">名前・メールアドレス・パスワードで新規登録</v-card-text>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="registerForm.name"
              v-bind:rules="nameRules"
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
              v-bind:append-icon="passwordConfirmationField ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:rules="[passwordRules.required, passwordRules.min]"
              v-bind:type="passwordConfirmationField ? 'text' : 'password'"
              label="Password (確認)"
              hint="6文字以上で入力下さい"
              @click:append="passwordConfirmationField = !passwordConfirmationField"
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
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      nameRules: [
        v => !!v || "必須項目です",
        v => v.length <= 10 || "名前は10文字以下で記入下さい"
      ],
      emailRules: [
        v => !!v || "必須項目です",
        v => /.+@.+\..+/.test(v) || "無効なメールアドレスです"
      ],
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters"
      },
      passwordField: false,
      passwordConfirmationField: false,
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async register() {
      //authストアのregisterアクションを呼び出す
      await this.$store.dispatch("auth/register", this.registerForm);

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
