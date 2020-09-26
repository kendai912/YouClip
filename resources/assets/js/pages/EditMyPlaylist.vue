<template>
  <div class="container--small">
    <div>
      <v-card class="mx-auto pa-2" max-width="420" tile flat color="rgb(245, 245, 245)">
        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 text-center">
            <v-text-field
              v-model="playlistTitle"
              :append-icon="isEditTitle ? 'fas fa-save' : 'mdi-pen'"
              :rules="[rules.required]"
              :readonly="!isEditTitle"
              type="text"
              name="playlistTitle"
              label="タイトル"
              v-on:keydown.enter="saveTitle"
              @click:append="saveTitle"
              hide-details
              ref="playlistTitle"
            ></v-text-field>
            <!-- <v-select
              v-model="playlistPrivacySetting"
              :items="privacySettingList"
            >
            </v-select>-->
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0 pt-2 text-center">
            <v-select
              v-model="playlistPrivacySetting"
              :items="privacySettingList"
              label="プレイリスト"
              prepend-icon="mdi-earth"
              :append-icon="isEditPrivacy ? 'fas fa-save' : 'mdi-pen'"
              :readonly="!isEditPrivacy"
              @click:append="savePrivacy"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0 pt-2">
            <v-text-field
              ref="testelement"
              value="ddddddddddddd"
              style="width:0; height:0;"
              hide-details
            ></v-text-field>
            <div class="grey--text text--darken-3">
              <span>{{ sceneCount }}シーン</span><span style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
              <span>{{ playCount ? playCount : 0 }}回視聴</span><span style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
              <span>最終更新日: {{ lastUpdatedAt }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <SceneTagItem v-bind:mediaItems="sceneListofPlaylist" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import SceneTagItem from "../components/SceneTagItem.vue";
import myMixin from "../util";

export default {
  components: {
    SceneTagItem,
  },
  data() {
    return {
      playlistId: "",
      isEditTitle: false,
      isEditPrivacy: false,
      isTitleFocused: false,
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
      lastUpdatedAt: "",
    };
  },
  props: {},
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      playlistName: "watch/playlistName",
      privacySetting: "watch/privacySetting",
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
  },
  methods: {
    async saveTitle() {
      if (!this.isEditTitle) {
        this.isEditTitle = true;
      } else {
        this.isEditTitle = false;
        this.$refs.testelement.focus();
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
      } else {
        this.isEditPrivacy = false;
        this.$refs.testelement.focus();
        var playlist = {
          playlist_id: this.playlistAndTagVideoData.playlist_id,
          privacySetting: this.privacySetting,
        };
        await this.$store.dispatch("playlist/updatePlaylistPrivacy", playlist);
      }
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

      //プレイリストIDとプレイリスト名をwatchストアに格納
      this.$store.commit("watch/setPlaylistId", this.playlistId);
      this.$store.commit(
        "watch/setPlaylistName",
        this.playlistAndTagVideoData.playlistName
      );
      this.$store.commit(
        "watch/setPrivacySetting",
        this.playlistAndTagVideoData.privacySetting
      );
      this.playCount = this.playlistAndTagVideoData.play_count;
      this.sceneCount = this.playlistAndTagVideoData.tagVideoData.length;
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
