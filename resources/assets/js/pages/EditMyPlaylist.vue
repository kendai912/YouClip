<template>
  <div class="container--small">
    <div v-if="sceneListofPlaylistIsReady">
      <v-card class="mx-auto pa-2 align-center" max-width="420" tile flat>
        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 text-center">
            <v-text-field
              v-model="playlistTitle"
              :append-icon="isEditTitle ? 'fas fa-save' : 'mdi-pencil'"
              :rules="[rules.required]"
              :readonly="!isEditTitle"
              type="text"
              name="playlistTitle"
              v-bind:label="$t('EditMyPlaylist.playlistTitle')"
              v-on:keydown.enter="saveTitle"
              @click="toggleIsEditTitle"
              @click:append="saveTitle"
              hide-details
              ref="playlistTitle"
              class="playlistTitleInputBox inner-outlined-icon"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 text-center">
            <v-select
              v-model="playlistPrivacySetting"
              :items="privacySettingList"
              v-bind:label="$t('EditMyPlaylist.privacySetting')"
              prepend-icon="mdi-earth"
              :append-icon="isEditPrivacy ? 'fas fa-save' : 'mdi-pencil'"
              @click="toggleIsEditPrivacy"
              @click:append="savePrivacy"
              hide-details
              ref="playlistPrivacy"
              class="scenePrivacySettingBox inner-outlined-icon"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 text-center">
            <v-select
              v-model="playlistCategory"
              :items="playlistCategoryList"
              v-bind:label="$t('EditMyPlaylist.playlistCategory')"
              :append-icon="isEditCategory ? 'fas fa-save' : 'mdi-pencil'"
              @click="toggleIsEditCategory"
              @click:append="saveCategory"
              hide-details
              ref="playlistCategory"
              class="playlistCategoryBox inner-outlined-icon"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="pa-0 pt-3 text-center">
            <v-row class="ma-0 pa-0">
              <v-card class="text-left pa-0 ma-0 my-grey" elevation="0">{{
                $t("EditMyPlaylist.thumbnail")
              }}</v-card>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-2 py-0 pt-1">
                <div style="position: relative;">
                  <v-img
                    class="align-end rounded"
                    max-height="266.66px"
                    v-bind:src="thumbStoragePath + thumbnail"
                    aspect-ratio="1.7777"
                  >
                  </v-img>
                </div>
              </v-col>
              <v-col align-self="center" class="ma-0 pa-2">
                <v-btn
                  rounded
                  color="primary"
                  outlined
                  v-on:click="changeThumbnail"
                  >{{ $t("EditMyPlaylist.changeThumbnail") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 align-bottom" align-self="end">
            <v-card elevation="0">
              <v-card-subtitle class="pa-0 ma-0 subtitle-1 my-grey">
                <span>{{ totalDuration }}</span
                ><span style="font-size:8px;"
                  >&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span
                >
                <span
                  >{{ playCount ? playCount : 0
                  }}{{ $t("EditMyPlaylist.views") }}</span
                ><span style="font-size:8px;"
                  >&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span
                >
                <span
                  >{{ $t("EditMyPlaylist.createdAt") }}{{ lastUpdatedAt }}</span
                >
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col class="pa-0 pt-2 text-right" cols="auto">
            <span
              ><v-icon
                v-on:click="openPlaylistDeleteModal(playlistId, playlistName)"
                class="my-grey outlined-icon"
                >mdi-delete</v-icon
              ></span
            >
          </v-col>
        </v-row>
        <v-row class="mt-2 ma-0">
          <v-col class="pa-0 pt-2 text-left" cols="auto">
            <span
              ><v-icon
                v-on:click="openPlaylistDeleteModal(playlistId, playlistName)"
                class="my-grey"
                >mdi-sort-variant</v-icon
              ></span
            >
          </v-col>
          <v-col class="pa-0 pt-2 align-bottom" align-self="end">
            <v-card elevation="0">
              <v-card-title class="pa-0 pl-2 ma-0 subtitle-1 my-grey">{{
                $t("EditMyPlaylist.sort")
              }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <SceneTagItem
        v-bind:showAddNewSceneComponent="showAddNewSceneComponent"
      />
      <PlaylistDeleteModal v-if="showPlaylistDeleteModal" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import myMixin from "../util";
import SceneTagItem from "../components/SceneTagItem.vue";
import PlaylistDeleteModal from "../components/PlaylistDeleteModal.vue";

export default {
  metaInfo() {
    return {
      title: this.$t("EditMyPlaylist.title"),
      meta: [
        {
          name: "description",
          content: this.$t("EditMyPlaylist.MetaInfo.description"),
        },
        {
          property: "og:site_name",
          content: "YouClip",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://youclip.app" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: "作成した切り抜きまとめの編集 - YouClip",
        },
        {
          property: "og:description",
          content: this.$t("EditMyPlaylist.MetaInfo.description"),
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.app" + this.$route.path },
        {
          rel: "alternate",
          hreflang: "en",
          href: "https://youclip.app" + this.$route.path + "?hl=en",
        },
        {
          rel: "alternate",
          hreflang: "ja",
          href: "https://youclip.app" + this.$route.path + "?hl=ja",
        },
      ],
    };
  },
  components: {
    SceneTagItem,
    PlaylistDeleteModal,
  },
  data() {
    return {
      playlistId: "",
      isEditTitle: false,
      isEditPrivacy: false,
      isEditCategory: false,
      showAddNewSceneComponent: true,
      privacySettingList: [
        { text: this.$t("EditMyPlaylist.data.public"), value: "public" },
        {
          text: this.$t("EditMyPlaylist.data.limited"),
          value: "limited",
        },
        {
          text: this.$t("EditMyPlaylist.data.private"),
          value: "private",
        },
      ],
      playlistCategoryList: [
        { text: "VTuber", value: "VTuber" },
        {
          text: this.$t("EditMyPlaylist.data.game"),
          value: "Game",
        },
        {
          text: this.$t("EditMyPlaylist.data.sports"),
          value: "Sports",
        },
        {
          text: this.$t("EditMyPlaylist.data.other"),
          value: "Other",
        },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
      privacy: "",
      playCount: 0,
      sceneCount: 0,
      totalDuration: "",
      lastUpdatedAt: "",
      sceneListofPlaylistIsReady: false,
    };
  },
  props: {},
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      resetKey: "playlist/resetKey",
      thumbnail: "playlist/thumbnail",
      playlistName: "watch/playlistName",
      privacySetting: "watch/privacySetting",
      showPlaylistDeleteModal: "playlistDeleteModal/showPlaylistDeleteModal",
    }),
    playlistTitle: {
      get() {
        return this.$store.state.watch.playlistName;
      },
      set(val) {
        this.$store.commit("watch/setPlaylistName", val);
      },
    },
    playlistPrivacySetting: {
      get() {
        return this.$store.state.watch.privacySetting;
      },
      set(val) {
        this.$store.commit("watch/setPrivacySetting", val);
      },
    },
    playlistCategory: {
      get() {
        return this.$store.state.watch.playlistCategory;
      },
      set(val) {
        this.$store.commit("watch/setPlaylistCategory", val);
      },
    },
  },
  watch: {
    resetKey() {
      let mediaItems = [];
      this.putTagVideoIntoMediaItems(
        mediaItems,
        this.playlistAndTagVideoData.tagVideoData
      );
      this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);
    },
  },
  methods: {
    ...mapActions({
      getThumbnail: "playlist/getThumbnail",
    }),
    toggleIsEditTitle() {
      this.isEditTitle = true;
    },
    toggleIsEditPrivacy() {
      this.isEditPrivacy = true;
    },
    toggleIsEditCategory() {
      this.isEditCategory = true;
    },
    async saveTitle() {
      if (!this.isEditTitle) {
        this.isEditTitle = true;
        this.$nextTick(() => this.$refs.playlistTitle.focus());
      } else {
        this.isEditTitle = false;
        this.$nextTick(() => this.$refs.playlistTitle.blur());
        var playlist = {
          playlist_id: this.playlistAndTagVideoData.playlist_id,
          playlistName: this.playlistName,
        };
        await this.$store.dispatch("playlist/updatePlaylistTitle", playlist);
      }
    },
    async savePrivacy() {
      if (!this.isEditPrivacy) {
        this.isEditPrivacy = true;
        this.$nextTick(() => this.$refs.playlistPrivacy.focus());
      } else {
        this.isEditPrivacy = false;
        this.$nextTick(() => this.$refs.playlistPrivacy.blur());
        var playlist = {
          playlist_id: this.playlistAndTagVideoData.playlist_id,
          privacySetting: this.privacySetting,
        };
        await this.$store.dispatch("playlist/updatePlaylistPrivacy", playlist);
      }
    },
    async saveCategory() {
      if (!this.isEditCategory) {
        this.isEditCategory = true;
        this.$nextTick(() => this.$refs.playlistCategory.focus());
      } else {
        this.isEditCategory = false;
        this.$nextTick(() => this.$refs.playlistCategory.blur());
        var playlist = {
          playlist_id: this.playlistAndTagVideoData.playlist_id,
          playlistCategory: this.playlistCategory,
        };
        await this.$store.dispatch("playlist/updatePlaylistCategory", playlist);
      }
    },
    openPlaylistDeleteModal(playlistId, playlistName) {
      this.$store.commit("playlistDeleteModal/setPlaylistId", playlistId);
      this.$store.commit("playlistDeleteModal/setPlaylistName", playlistName);
      this.$store.commit("playlistDeleteModal/openPlaylistDeleteModal");
    },
    convertToKanjiTime(s) {
      let units = [
        this.$t("EditMyPlaylist.second"),
        this.$t("EditMyPlaylist.minute"),
      ];
      var ext = units[0];
      var retStr = "";
      for (var i = 0; i < units.length; i += 1) {
        if (parseInt(s) >= 60) {
          let v = parseInt(s) % 60;
          s = parseInt(s) / 60;
          ext = units[i];
          retStr = `${v}` + ext + retStr;
        } else {
          s = parseInt(s);
          return `${s}` + units[i] + retStr;
        }
      }

      s = parseInt(s);
      return `${s}時間` + retStr;
    },
    changeThumbnail() {
      this.$router
        .push({
          path: "/edit/thumbnail",
          query: {
            playlist: this.playlistId,
            index: 0,
          },
        })
        .catch((err) => {});
    },
  },
  async created() {
    if (this.$route.query.playlist) {
      //特定シーン再生の場合
      //URLのクエリパラメータからプレイリストIDとインデックスを取得
      this.playlistId = this.$route.query.playlist;

      //プレイリストおよび動画・タグデータを取得
      await this.$store.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        this.playlistId
      );

      //プレイリストIDとプレイリスト名、プライバシー設定をwatchストアに格納
      this.$store.commit("watch/setPlaylistId", this.playlistId);
      this.$store.commit(
        "watch/setPlaylistName",
        this.playlistAndTagVideoData.playlistName
      );
      this.$store.commit(
        "watch/setPrivacySetting",
        this.playlistAndTagVideoData.privacySetting
      );
      this.$store.commit(
        "watch/setPlaylistCategory",
        this.playlistAndTagVideoData.playlistCategory
      );

      //視聴回数・合計時間・最終更新日の情報を格納
      this.playCount = this.playlistAndTagVideoData.play_count;
      this.sceneCount = this.playlistAndTagVideoData.tagVideoData.length;
      //this.totalDuration = this.playlistAndTagVideoData.playlist_total_duration;
      this.totalDuration = this.getTotalDuration(
        this.playlistAndTagVideoData.tagVideoData
      );
      this.lastUpdatedAt = this.convertToYMD(
        this.playlistAndTagVideoData.playlist_updated_at
      );

      let mediaItems = [];
      this.putTagVideoIntoMediaItems(
        mediaItems,
        this.playlistAndTagVideoData.tagVideoData
      );
      this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);
      this.sceneListofPlaylistIsReady = true;

      //デフォルトのサムネイルを取得
      this.getThumbnail(this.playlistId);
    }
  },
};
</script>
