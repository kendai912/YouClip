<template>
  <v-app-bar color="white" dense>
    <v-toolbar-title>
      <router-link class="navbar__brand" to="/">YouClip</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="navbar__menu">
      <div v-if="isLogin" class="navbar__item">
        <v-btn v-on:click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </v-btn>
      </div>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <i v-on="on" class="fas fa-user-circle fa-2x" style="color:darkgreen;"></i>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <router-link class="button button--link" to="/login">ログイン</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link class="button button--link" to="/register">新規登録</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapGetters({
      username: "auth/username"
    }),
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: "auth/check"
    })
  },
  created() {}
};
</script>
