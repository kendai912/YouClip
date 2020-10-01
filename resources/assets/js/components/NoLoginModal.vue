<template>
  <v-dialog v-model="showLoginModal" max-width="360">
    <v-card>
      <v-btn icon dark small v-on:click="closeLoginModal">
        <v-icon color="grey darken-1">mdi-close</v-icon>
      </v-btn>
      <v-card-title class="subtitle-1 py-0">{{ messageWhenNotLogined }}</v-card-title>
      <v-row class="ma-0">
        <v-col class="mx-6 px-0">
          <v-btn width="100%" color="green lighten-1" class="white--text" v-on:click="openLoginPage" style="font-size: 14px;">ログイン</v-btn>
          <div class="mt-3 text-center" style="color: #757575; font-size: 14px;">
            アカウントをお持ちでないですか?
            <!-- <v-btn color="green" class="ma-0 pa-0" height="100%" text v-on:click="openRegisterPage">登録する</v-btn> -->
            <a href="javascript:void(0)" color="green" v-on:click="openRegisterPage">登録する</a>
          </div>
        </v-col>
      </v-row>
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
    },
    openRegisterPage() {
      this.$router.push({
        path: "/register"
      }).catch(err => {});
    }
  },
  created() {}
};
</script>