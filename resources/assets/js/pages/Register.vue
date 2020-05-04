<template>
  <div class="container--small">
    <div>
      <a href="/api/auth/google">
        <i class="fab fa-google"></i>
      </a>
      <a href="/api/auth/facebook">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="/api/auth/twitter">
        <i class="fab fa-twitter"></i>
      </a>
    </div>

    <form class="form" @submit.prevent="register">
      <div v-if="registerErrors" class="errors">
        <div v-if="registerErrors" class="errors">
          <ul v-if="registerErrors.name">
            <li v-for="msg in registerErrors.name" v-bind:key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrors.email">
            <li v-for="msg in registerErrors.email" v-bind:key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrors.password">
            <li v-for="msg in registerErrors.password" v-bind:key="msg">{{ msg }}</li>
          </ul>
        </div>
      </div>
      <label for="username">Name</label>
      <input type="text" class="form__item" id="username" v-model="registerForm.name" />
      <label for="email">Email</label>
      <input type="text" class="form__item" id="email" v-model="registerForm.email" />
      <label for="password">Password</label>
      <input type="password" class="form__item" id="password" v-model="registerForm.password" />
      <label for="password-confirmation">Password (confirm)</label>
      <input
        type="password"
        class="form__item"
        id="password-confirmation"
        v-model="registerForm.password_confirmation"
      />
      <div class="form__button">
        <button type="submit" class="button button--inverse">register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      tab: 1,
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
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
    },
    async register() {
      //authストアのregisterアクションを呼び出す
      await this.$store.dispatch("auth/register", this.registerForm);

      if (this.apiStatus) {
        //トップページに移動する
        this.$router.push("/");
      }
    },
    clearError() {
      this.$store.commit("auth/setLoginErrorMessages", null);
      this.$store.commit("auth/setRegisterErrorMessages", null);
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus,
      loginErrors: state => state.auth.loginErrorMessages,
      registerErrors: state => state.auth.registerErrorMessages
    })
  },
  created() {
    //ナビバーを表示
    this.$store.commit("navbar/setShowNavbar", true);

    //エラーを初期化
    this.clearError();
  }
};
</script>
