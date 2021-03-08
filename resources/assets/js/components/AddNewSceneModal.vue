<template>
  <v-dialog v-model="showAddNewSceneModal" max-width="360">
    <v-card>
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 mt-6 pa-0">
            <v-btn
              width="100%"
              color="red lighten-1"
              outlined
              class="white--text"
              v-on:click="moveToYThighlightPage"
              style="font-size: 16px;"
              ><span style="font-weight: bold; ">続けて他の</span
              >場面を切り抜く</v-btn
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
              color="red lighten-1"
              outlined
              class="white--text"
              v-on:click="moveToSearchNewYTvideo"
              style="font-size: 16px;"
              ><span style="font-weight: bold; ">新しい動画の</span
              >場面を追加</v-btn
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
      youtubeId: "ytPlayer/youtubeId",
    }),
    showAddNewSceneModal: {
      get() {
        return this.$store.getters["addNewSceneModal/showAddNewSceneModal"];
      },
      set() {
        return this.$store.commit("addNewSceneModal/closeAddNewSceneModal");
      },
    },
  },
  methods: {
    ...mapMutations({
      closeAddNewSceneModal: "addNewSceneModal/closeAddNewSceneModal",
    }),
    moveToYThighlightPage() {
      //close scene tagging complete modal
      this.$store.commit("addNewSceneModal/closeAddNewSceneModal");

      //直前のYouTube動画ハイライトページを表示
      this.$router
        .push({
          path: "/youtube/scene",
          query: {
            v: this.youtubeId,
          },
        })
        .catch((err) => {});
    },
    moveToSearchNewYTvideo() {
      //close scene tagging complete modal
      this.$store.commit("addNewSceneModal/closeAddNewSceneModal");

      //YouTube動画の検索ページへ
      this.$router
        .push({
          path: "/youtube",
          query: { return: true },
        })
        .catch((err) => {});
    },
    openSceneListPage() {
      //close scene tagging complete modal
      this.$store.commit("addNewSceneModal/closeAddNewSceneModal");

      //切り抜いた場面一覧ページを表示
      this.$router
        .push({
          path: "/highlight/scenelist",
        })
        .catch((err) => {});
    },
  },
  created() {},
};
</script>
