<template>
  <v-dialog v-model="showConfirmationModal" max-width="360" persistent>
    <v-card>
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 mt-6 pa-0 text-center"
            >{{ start }}-{{ end }}の場面を切り抜きました！
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 px-0 pb-0">
            <v-btn
              width="100%"
              color="red lighten-2"
              class="white--text"
              v-on:click="moveToYThighlightPage"
              style="font-size: 16px;"
              >続けて他の場面を切り抜く</v-btn
            >
          </v-col>
        </v-row>

        <v-row
          class="mx-6 pa-0"
          align="center"
          justify="center"
          style="height: 40px;"
        >
          <v-col class="ma-0 pa-0">
            <div
              style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"
            ></div>
          </v-col>
          <v-col class="ma-0 pa-0 text-center" cols="3">
            <span>または</span>
          </v-col>
          <v-col class="ma-0 pa-0">
            <div
              style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"
            ></div>
          </v-col>
        </v-row>

        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 mb-6 pa-0">
            <v-btn
              width="100%"
              outlined
              color="red lighten-2"
              class="white--text"
              v-on:click="openSceneListPage"
              style="font-size: 16px;"
              >切り抜いた場面一覧へ</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
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
      start: "tagging/start",
      end: "tagging/end",
    }),
    showConfirmationModal: {
      get() {
        return this.$store.getters["confirmationModal/showConfirmationModal"];
      },
      set() {
        return this.$store.commit("confirmationModal/closeConfirmationModal");
      },
    },
  },
  methods: {
    ...mapMutations({
      closeConfirmationModal: "confirmationModal/closeConfirmationModal",
    }),
    moveToYThighlightPage() {
      //一つ前のYouTube動画ハイライトページを表示
      this.$router.go(-1);
    },
    openSceneListPage() {
      //切り抜いた場面一覧ページを表示
      this.$router
        .push({
          path: "/youtube/scenelist",
        })
        .catch((err) => {});
    },
  },
  created() {},
};
</script>
