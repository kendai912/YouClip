<template>
  <div class="container--small">
    <HighlightHeader />

    <div class="highlight-body" ref="highlightBody" style="height: auto;">
      <v-card class="pa-2 ma-0 mt-2" elevation="0">
        <v-container class="ma-0 pa-0" fluid>
          <v-row class="ma-0 mb-4 pa-2">
            <v-col class="ma-0 pa-0">
              <v-text-field
                v-model="playlistTitle"
                v-bind:rules="[rules.required]"
                type="text"
                name="playlistTitle"
                label="まとめのタイトルを入力"
                hide-details
                ref="playlistTitle"
                class="playlistTitleInputBox"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="ma-0 mb-2 pa-2">
            <v-col class="ma-0 pa-0 text-center">
              <v-select
                v-model="privacySetting"
                v-bind:items="privacySettingList"
                label="シーンのプライバシー設定"
                prepend-icon="mdi-earth"
                hide-details
                dense
                class="scenePrivacySettingBox"
              ></v-select>
            </v-col>
          </v-row>

          <v-row class="ma-0 px-1">
            <v-col class="pa-0 pt-1 text-center"> </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
  },
  data() {
    return {
      playlistTitle: null,
      privacySettingList: [
        { text: "公開", value: "public" },
        {
          text: "限定公開",
          value: "limited",
        },
        {
          text: "非公開",
          value: "private",
        },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
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
    privacySetting: {
      get() {
        return this.$store.getters["tagging/privacySetting"];
      },
      set(val) {
        return this.$store.commit("tagging/setPrivacySetting", val);
      },
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
        "まとめのタイトルを入力"
      );

      //load new creating playlist ID
      await this.$store.dispatch("playlist/getNewPlaylistId");
      if (!this.newPlaylistId) {
        this.$router
          .push({
            path: "/highlight",
          })
          .catch((err) => {});
      }

      //set new creating playlist ID
      this.$store.commit("tagging/setMyPlaylistToSave", this.newPlaylistId);
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
