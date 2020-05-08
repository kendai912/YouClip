<template>
  <v-dialog v-model="showLoginModal" max-width="290">
    <v-card>
      <v-card-title class="subtitle-1">{{ messageWhenNotLogined }}</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text v-on:click="closeLoginModal">キャンセル</v-btn>
        <v-btn class="my-login-font-color" v-on:click="openLoginPage" text>ログイン</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters({
      messageWhenNotLogined: "noLoginModal/messageWhenNotLogined"
    }),
    showLoginModal: {
      get() {
        return this.$store.getters["noLoginModal/showLoginModal"];
      },
      set() {
        return this.$store.commit("noLoginModal/closeLoginModal");
      }
    }
  },
  methods: {
    ...mapMutations({
      closeLoginModal: "noLoginModal/closeLoginModal"
    }),
    openLoginPage() {
      //ログインページを表示
      this.$router
        .push({
          path: "/login"
        })
        .catch(err => {});
    }
  },
  created() {}
};
</script>