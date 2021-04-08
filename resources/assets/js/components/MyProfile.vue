<template>
  <v-container class="pa-0 body-color">
    <v-card class="mx-auto" tile flat>
      <v-row align="center" justify="end" class="ma-0 pa-2">
        <v-btn v-on:click="logout" elevation="0" color="white">
          <v-icon>mdi-logout</v-icon>
          ログアウト
        </v-btn>
      </v-row>
      <v-row align="center" justify="center" class="ma-0 pa-2">
        <v-avatar class="profile" size="100">
          <v-img
            v-bind:src="avatarStoragePath + avatar"
            alt="profile pic"
          ></v-img>
        </v-avatar>
      </v-row>
      <v-row align="center" justify="center" class="ma-0 pt-0 pb-2">
        <span class="fz-16">
          {{ username }}
        </span>
      </v-row>
      <v-row class="ma-0 pt-4 pb-4 px-2">
        <v-btn width="100%" color="white"
          ><span class="fz-14">プロフィールを編集</span></v-btn
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data: () => ({}),
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      username: "auth/username",
      avatar: "auth/avatar",
    }),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    },
  },
};
</script>
