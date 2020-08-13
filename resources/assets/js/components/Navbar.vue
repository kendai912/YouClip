<template>
  <v-app-bar color="white" dense>
    <v-toolbar-items>
      <router-link to="/">
        <img
          src="../storage/logos/youclip_logo.png"
          style="position: absolute; height: 58%; top: 21%; left: 16px; object-fit: contain;"
        />
      </router-link>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <div>
      <v-menu v-if="isLogin" offset-y>
        <template v-slot:activator="{ on }">
          <i v-on="on" class="fas fa-user-circle fa-2x" style="color:darkgreen;"></i>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="button button--link" v-on:click="logout">ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <i v-on="on" class="fas fa-user-circle fa-2x" style="color:grey;"></i>
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
