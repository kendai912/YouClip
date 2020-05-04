<template>
  <div class="container--small">
    <ul class="tab">
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 1 }"
        v-on:click="tab = 1"
      >Login</li>
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 2 }"
        v-on:click="tab = 2"
      >Register</li>
    </ul>

    <div class="panel" v-show="tab === 1">
      <div>
        <a href="/api/auth/google">
          <i class="fab fa-google"></i>
        </a>
        <a href="/api/auth/facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="/api/auth/twitter">
          <i class="fab fa-twitter"></i>
        </a>
      </div>

      <form class="form" v-on:submit.prevent="login">
        <div v-if="loginErrors" class="errors">
          <ul v-if="loginErrors.email">
            <li v-for="msg in loginErrors.email" v-bind:key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="loginErrors.password">
            <li v-for="msg in loginErrors.password" v-bind:key="msg">{{ msg }}</li>
          </ul>
        </div>
        <label for="login-email">Email</label>
        <input type="text" class="form__item" id="login-email" v-model="loginForm.email" />
        <label for="login-password">Password</label>
        <input type="password" class="form__item" id="login-password" v-model="loginForm.password" />
        <div class="form__button">
          <button type="submit" class="button button--inverse">login</button>
        </div>
      </form>
    </div>

    <div class="panel" v-show="tab === 2">
      <div>
        <a href="/api/auth/google">
          <i class="fab fa-google"></i>
        </a>
        <a href="/api/auth/facebook">
          <i class="fab fa-facebook-f"></i>
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
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //エラーを初期化
    this.clearError();
  }
};
</script>
