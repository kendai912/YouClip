<template>
  <div class="container--small">
    <HighlightHeader />

    <div class="highlight-body" ref="highlightBody" style="height: auto;">
      <div
        v-bind:class="isIOS ? 'iosHighlightBodyUpper' : 'highlightBodyUpper'"
      >
        <v-card class="pa-2 pb-0 ma-0 mt-2" elevation="0">
          <div>{{ $t("SceneList.clippedSceneList") }}</div>
          <div>{{ $t("SceneList.followingsArePlayedContinuously") }}</div>
        </v-card>
        <SceneTagItem
          v-bind:showAddNewSceneComponent="showAddNewSceneComponent"
          v-bind:key="resetKey"
        />
      </div>

      <v-sheet tile class="ma-0 pa-0 " width="100%">
        <v-container class="ma-0 pa-2 pt-6">
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="100%"
              height="45px"
              color="primary darken-2"
              outlined
              class="white--text"
              v-on:click="openAddNewSceneModal"
              style="font-size: 14px; "
              >{{ $t("SceneList.addNewScene") }}</v-btn
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
              <span>{{ $t("SceneList.or") }}</span>
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
              color="primary darken-2"
              class="white--text"
              to="/highlight/title"
              style="font-size: 14px;"
              >{{ $t("SceneList.EnterTitle") }}</v-btn
            >
          </v-row>
        </v-container>
      </v-sheet>
    </div>
    <AddNewSceneModal v-if="showAddNewSceneModal" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import SceneTagItem from "../components/SceneTagItem.vue";
import AddNewSceneModal from "../components/AddNewSceneModal.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    SceneTagItem,
    AddNewSceneModal,
  },
  data() {
    return {
      showAddNewSceneComponent: false,
      isIOS: false,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      newPlaylistId: "playlist/newPlaylistId",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      resetKey: "playlist/resetKey",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      youtubeId: "youtube/youtubeId",
      tagDataArray: "youtube/tagDataArray",
      myPlaylistToSave: "tagging/myPlaylistToSave",
      showAddNewSceneModal: "addNewSceneModal/showAddNewSceneModal",
    }),
  },
  watch: {
    myPlaylistToSave() {
      this.loadSceneList();
    },
  },
  methods: {
    ...mapMutations({
      openAddNewSceneModal: "addNewSceneModal/openAddNewSceneModal",
      setStep: "highlightHeader/setStep",
    }),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言とステップをセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        this.$t("SceneList.methods.confirmClippedScene")
      );
      this.setStep(4);

      //load new creating playlist ID
      await this.$store.dispatch("playlist/getNewPlaylistId");
      if (!this.newPlaylistId) {
        this.$router
          .push({
            path: "/youtube",
          })
          .catch((err) => {});
      } else {
        //set new creating playlist ID
        this.$store.commit("tagging/setMyPlaylistToSave", this.newPlaylistId);
        this.$store.commit("watch/setPlaylistId", this.newPlaylistId); // for scene order change by dragging

        //load scenelist
        await this.loadSceneList();
      }

      this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
    },
    //切り抜いた場面一覧を取得
    async loadSceneList() {
      await this.$store.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        this.myPlaylistToSave
      );
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
    playlistAndTagVideoData() {
      let mediaItems = [];
      this.playlistAndTagVideoData
        ? this.putTagVideoIntoMediaItems(
            mediaItems,
            this.playlistAndTagVideoData.tagVideoData
          )
        : "";
      this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);
    },
  },
  async mounted() {
    await this.initialize();

    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
