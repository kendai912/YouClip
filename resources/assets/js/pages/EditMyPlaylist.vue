<template>
  <div class="container--small">
    <div>
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
              label="タイトル"
              v-on:keydown.enter="saveTitle"
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
              label="プライバシー設定"
              prepend-icon="mdi-earth"
              :append-icon="isEditPrivacy ? 'fas fa-save' : 'mdi-pencil'"
              :readonly="!isEditPrivacy"
              @click:append="savePrivacy"
              hide-details
              ref="playlistSettings"
              class="scenePrivacySettingBox inner-outlined-icon"
            ></v-select>
          </v-col>
        </v-row>
        <!-- <v-row class="ma-0">
          <v-col class="pa-0 pt-2 text-center">
            <v-text-field
              v-model="playlistEditMode"
              :append-icon="isEditEditMode ? 'fas fa-save' : 'mdi-pencil'"
              :rules="[rules.required]"
              :readonly="!isEditEditMode"
              type="text"
              name="playlistEditMode"
              label="編集設定"
              v-on:keydown.enter="saveEditMode"
              @click:append="saveEditMode"
              hide-details
              ref="playlistEditMode"
              class="playlistEditModeInputBox inner-outlined-icon"
            ></v-text-field>
          </v-col>
        </v-row> -->
        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 align-bottom" align-self="end">
            <v-card elevation="0">
              <v-card-subtitle class="pa-0 ma-0 subtitle-1 my-grey">
                <span>{{ totalDuration }}</span
                ><span style="font-size:8px;"
                  >&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span
                >
                <span>{{ playCount ? playCount : 0 }}回視聴</span
                ><span style="font-size:8px;"
                  >&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span
                >
                <span>最終更新日: {{ lastUpdatedAt }}</span>
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
              <v-card-title class="pa-0 pl-2 ma-0 subtitle-1 my-grey"
                >場面の並び替え(ドラッグ＆ドロップ)</v-card-title
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <SceneTagItem
        v-bind:showAddNewSceneComponent="showAddNewSceneComponent"
        v-bind:key="resetKey"
      />
      <PlaylistDeleteModal v-if="showPlaylistDeleteModal" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import SceneTagItem from "../components/SceneTagItem.vue";
import PlaylistDeleteModal from "../components/PlaylistDeleteModal.vue";

export default {
  metaInfo() {
    return {
      title: "作成したまとめの編集 - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipの作成したまとめ編集ページです。作成したまとめの開始・終了時間やタグを変更・修正出来ます。新たな場面も切り抜いて追加可能です。",
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
          content: "https://youclip.jp" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: "作成したまとめの編集 - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipの作成したまとめ編集ページです。作成したまとめの開始・終了時間やタグを変更・修正出来ます。新たな場面も切り抜いて追加可能です。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.jp" + this.$route.path },
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
      isEditEditMode: false,
      isTitleFocused: false,
      showAddNewSceneComponent: true,
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
      privacy: "",
      playCount: 0,
      sceneCount: 0,
      totalDuration: "",
      lastUpdatedAt: "",
    };
  },
  props: {},
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      resetKey: "playlist/resetKey",
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
    playlistEditMode: {
      // todo get/set EditMode
      get() {
        //return this.$store.state.watch.privacySetting;
        return "誰でも編集可能";
      },
      set(val) {
        //this.$store.commit("watch/setEditMode", val);
      },
    },
  },
  methods: {
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
        this.$nextTick(() => this.$refs.playlistSettings.focus());
      } else {
        this.isEditPrivacy = false;
        this.$nextTick(() => this.$refs.playlistSettings.blur());
        var playlist = {
          playlist_id: this.playlistAndTagVideoData.playlist_id,
          privacySetting: this.privacySetting,
        };
        await this.$store.dispatch("playlist/updatePlaylistPrivacy", playlist);
      }
    },
    async saveEditMode() {
      if (!this.isEditEditMode) {
        this.isEditEditMode = true;
        this.$nextTick(() => this.$refs.playlistEditMode.focus());
      } else {
        this.isEditEditMode = false;
        this.$nextTick(() => this.$refs.playlistEditMode.blur());
        // todo - save EditMode
      }
    },
    openPlaylistDeleteModal(playlistId, playlistName) {
      this.$store.commit("playlistDeleteModal/setPlaylistId", playlistId);
      this.$store.commit("playlistDeleteModal/setPlaylistName", playlistName);
      this.$store.commit("playlistDeleteModal/openPlaylistDeleteModal");
    },
    convertToKanjiTime(s) {
      let units = ["秒", "分"];
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
    }
  },
};
</script>
