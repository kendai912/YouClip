<template>
  <div class="container--small">
    <HighlightHeader />

    <div class="highlight-body" ref="highlightBody" style="height: auto;">
      <v-card class="pa-2 ma-0" elevation="0">
        <v-container class="ma-0 pa-0" fluid>
          <v-form ref="form">
            <v-row class="ma-0 mb-6 pa-2 pb-4">
              <v-col class="ma-0 pa-0">
                <v-text-field
                  v-model="playlistName"
                  v-bind:rules="rules"
                  type="text"
                  name="playlistName"
                  label="切り抜きまとめのタイトルを入力"
                  hide-details
                  class="playlistNameInputBox"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-6 pa-2 pb-4">
              <v-col class="ma-0 pa-0 text-center">
                <v-select
                  v-model="privacySetting"
                  v-bind:items="privacySettingList"
                  label="プライバシー設定"
                  prepend-icon="mdi-earth"
                  hide-details
                  dense
                  class="scenePrivacySettingBox"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-6 pa-2 pb-4">
              <v-col class="ma-0 pa-0 text-center">
                <v-select
                  v-model="playlistCategory"
                  v-bind:items="playlistCategoryList"
                  v-bind:rules="rules"
                  label="カテゴリーを選択"
                  hide-details
                  dense
                  class="playlistCategoryBox"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-6 pa-2">
              <v-col class="ma-0 pa-0 text-center">
                <v-row class="ma-0 pa-0">
                  <v-card class="text-left pa-0 ma-0 mb-2 my-grey" elevation="0"
                    >(任意)サムネイル設定</v-card
                  >
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-2">
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
                      v-on:click="selectCustomThumbnail"
                      >好きな場面をサムネイルに選択</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-6 pa-2">
              <v-col class="ma-0 pa-0 text-center">
                <v-card class="text-left pa-0 ma-0 mb-2 my-grey" elevation="0"
                  >(任意)切り抜きまとめの説明</v-card
                >
                <v-textarea
                  rows="3"
                  v-model="description"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>

          <v-row class="ma-0 pa-2 justify-center">
            <v-btn
              width="100%"
              height="45px"
              color="primary darken-2"
              class="white--text ma-0 pa-0"
              v-on:click="updateAndMoveToCompletePage"
              style="font-size: 14px; "
              >保存する(あとからでも編集できます)</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
  },
  data() {
    return {
      playlistName: null,
      description: null,
      playlistCategory: null,
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
      playlistCategoryList: [
        { text: "VTuber", value: "VTuber" },
        {
          text: "ゲーム",
          value: "Game",
        },
        {
          text: "スポーツ",
          value: "Sports",
        },
        {
          text: "その他",
          value: "Other",
        },
      ],
      rules: [(value) => !!value || "Required"],
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      youtubeId: "youtube/youtubeId",
      myPlaylistToSave: "tagging/myPlaylistToSave",
      newPlaylistId: "playlist/newPlaylistId",
      currentCategory: "playlist/currentCategory",
      thumbnail: "playlist/thumbnail",
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
    ...mapMutations({
      setStep: "highlightHeader/setStep",
    }),
    ...mapActions({
      getThumbnail: "playlist/getThumbnail",
    }),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言をセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "切り抜きまとめのタイトルを入力"
      );
      this.setStep(5);

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
      }
    },
    moveToCompletePage() {
      this.$router
        .push({
          path: "/highlight/complete",
        })
        .catch((err) => {});
    },
    //タイトルを更新し完了画面を表示
    updateAndMoveToCompletePage() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "切り抜きまとめを保存するには、ログインしてください。(入力データは保持されます)"
        );
      } else {
        if (this.$refs.form.validate()) {
          //ログイン済の場合
          let self = this;
          setTimeout(async function() {
            //check if there is editing new playlist
            if (!self.myPlaylistToSave) {
              //redirect to YouTube video select page if illegal accesss
              this.$router
                .push({
                  path: "/youtube",
                })
                .catch((err) => {});
            }

            //update playlist title and settings
            let params = {
              newPlaylistId: self.myPlaylistToSave,
              playlistName: self.playlistName,
              privacySetting: self.privacySetting,
              playlistCategory: self.playlistCategory,
              description: self.description,
            };
            await self.$store.dispatch("playlist/updatePlaylist", params);

            //set the new playlist name for complete page
            self.$store.commit(
              "playlist/setNewPlaylistName",
              self.playlistName
            );

            //完了画面に遷移
            self.moveToCompletePage();
          });
        }
      }
    },
    selectCustomThumbnail() {
      this.$router
        .push({
          path: "/highlight/thumbnail",
          query: {
            playlist: this.myPlaylistToSave,
            index: 0,
          },
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

    //highlightHeaderを設定
    this.$store.commit("highlightHeader/setShowSteps", true);
    this.$store.commit("highlightHeader/setShowBackIcon", true);

    //プレイリストのカテゴリーを取得しセット
    await this.$store.dispatch(
      "playlist/getCurrentCategory",
      this.myPlaylistToSave
    );

    //デフォルトのサムネイルを取得
    await this.getThumbnail(this.myPlaylistToSave);

    if (this.currentCategory == "Sports") {
      this.playlistCategory = "Sports";
    } else if (this.currentCategory == "Gaming") {
      this.playlistCategory = "Game";
    }
  },
};
</script>
