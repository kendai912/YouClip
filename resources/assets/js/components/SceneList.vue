<template>
  <div class="container--small">
    <HighlightHeader />

    <div class="highlight-body" ref="highlightBody" style="height: auto;">
      <div class="highlight-body-upper">
        <v-card class="pa-2 pb-0 ma-0" elevation="0">
          <div>切り抜いた場面一覧</div>
          <div>(以下がまとめとして連続再生されます)</div>
        </v-card>
        <SceneTagItem
          v-bind:showAddNewSceneComponent="showAddNewSceneComponent"
        />
      </div>

      <v-sheet tile class="ma-0 pa-0 " width="100%">
        <v-container class="ma-0 pa-2 pt-6">
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="100%"
              height="45px"
              color="red lighten-2"
              class="white--text"
              v-on:click="moveToYTvideoSelectPage"
              style="font-size: 14px; "
              >続けて他の動画の場面を追加</v-btn
            >
          </v-row>
          <v-row
            class="ma-0 pa-0 justify-center"
            align="center"
            style="height: 40px;"
          >
            <v-col class="ma-0 pa-0">
              <div
                style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"
              ></div>
            </v-col>
            <v-col class="ma-0 pa-0 text-center" cols="4">
              <span>または</span>
            </v-col>
            <v-col class="ma-0 pa-0">
              <div
                style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"
              ></div>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="100%"
              height="45px"
              outlined
              color="red lighten-2"
              class="white--text"
              v-on:click="openTitleSettingPage"
              style="font-size: 14px;"
              >まとめのタイトル入力へ</v-btn
            >
          </v-row>
        </v-container>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import SceneTagItem from "../components/SceneTagItem.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    SceneTagItem,
  },
  data() {
    return {
      showAddNewSceneComponent: false,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      newPlaylistId: "playlist/newPlaylistId",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      youtubeId: "youtube/youtubeId",
      tagDataArray: "youtube/tagDataArray",
      myPlaylistToSave: "tagging/myPlaylistToSave",
    }),
  },
  watch: {
    myPlaylistToSave() {
      this.loadSceneList();
    },
  },
  methods: {
    ...mapMutations({}),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言をセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "切り抜いた場面からまとめを作成"
      );

      //load new creating playlist ID
      await this.$store.dispatch("playlist/getNewPlaylistId");
      if (!this.newPlaylistId) {
        this.$router
          .push({
            path: "/highlight",
          })
          .catch((err) => {});
      } else {
        //set new creating playlist ID
        this.$store.commit("tagging/setMyPlaylistToSave", this.newPlaylistId);

        //load scenelist
        await this.loadSceneList();
      }
    },
    //切り抜いた場面一覧を取得
    async loadSceneList() {
      await this.$store.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        this.myPlaylistToSave
      );

      let mediaItems = [];
      this.playlistAndTagVideoData
        ? this.putTagVideoIntoMediaItems(
            mediaItems,
            this.playlistAndTagVideoData.tagVideoData
          )
        : "";
      this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);
    },
    //YouTube動画検索ページを表示
    moveToYTvideoSelectPage() {
      this.$router
        .push({
          path: "/highlight",
        })
        .catch((err) => {});
    },
    //まとめのタイトル入力画面を表示
    openTitleSettingPage() {
      this.$router
        .push({
          path: "/youtube/title",
        })
        .catch((err) => {});
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
  },
  async mounted() {
    await this.initialize();

    //headerの戻るアイコンを表示
    this.$store.commit("highlightHeader/setShowBackIcon", true);
  },
  beforeDestroy() {
    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
