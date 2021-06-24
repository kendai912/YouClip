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
                  v-bind:label="$t('Title.enterTitle')"
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
                  v-bind:label="$t('Title.privacySetting')"
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
                  v-bind:label="$t('Title.selectCategory')"
                  hide-details
                  dense
                  class="playlistCategoryBox"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-6 pa-2">
              <v-col class="ma-0 pa-0 text-center">
                <v-row class="ma-0 pa-0">
                  <v-card
                    class="text-left pa-0 pt-1 ma-0 mb-2 my-grey"
                    elevation="0"
                    >{{ $t("Title.optionalThumbnailSetting")
                    }}<v-card-subtitle class="pa-0 ma-0"
                      >{{ $t("Title.selectEyeCatchingScene") }}(<span
                        style="font-weight: bold;"
                        >{{ $t("Title.ableToInsertText") }}</span
                      >)</v-card-subtitle
                    >
                  </v-card>
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-2" cols="5">
                    <div style="position: relative;">
                      <v-img
                        class="align-end rounded"
                        max-height="266.66px"
                        v-bind:src="thumbStoragePath + thumbnail"
                        lazy-src="/storage/imgs/dummy-image.jpg"
                        alt="Custom thumbnail"
                        aspect-ratio="1.7777"
                        v-bind:key="resetKey"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </div>
                  </v-col>
                  <v-col align-self="center" class="ma-0 pa-2" cols="7">
                    <v-btn
                      rounded
                      color="primary"
                      outlined
                      v-on:click="selectCustomThumbnail"
                      >{{ $t("Title.selectCustomThumbnail") }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-6 pa-2">
              <v-col class="ma-0 pa-0 text-center">
                <v-card
                  class="text-left pa-0 ma-0 mb-2 my-grey"
                  elevation="0"
                  >{{ $t("Title.description") }}</v-card
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
              >{{ $t("Title.save") }}</v-btn
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
        { text: this.$t("Title.data.public"), value: "public" },
        {
          text: this.$t("Title.data.limited"),
          value: "limited",
        },
        {
          text: this.$t("Title.data.private"),
          value: "private",
        },
      ],
      playlistCategoryList: [
        { text: "VTuber", value: "VTuber" },
        {
          text: this.$t("Title.data.game"),
          value: "Game",
        },
        {
          text: this.$t("Title.data.sports"),
          value: "Sports",
        },
        {
          text: this.$t("Title.data.other"),
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
      resetKey: "playlist/resetKey",
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
        this.$t("Title.methods.enterTitleStep")
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

      this.loadPlaylistInput();
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
          this.$t("Title.methods.messageWhenNotLogined")
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
      let playlistInputData = {
        playlistId: this.myPlaylistToSave,
        playlistName: this.playlistName,
        privacySetting: this.privacySetting,
        playlistCategory: this.playlistCategory,
        description: this.description,
      };
      window.sessionStorage.setItem(
        "playlistInputData",
        JSON.stringify(playlistInputData)
      );

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
    loadPlaylistInput() {
      let playlistInputData = JSON.parse(
        window.sessionStorage.getItem("playlistInputData")
      );
      if (
        playlistInputData &&
        playlistInputData.playlistId == this.myPlaylistToSave
      ) {
        this.playlistName = playlistInputData.playlistName;
        this.privacySetting = playlistInputData.privacySetting;
        this.playlistCategory = playlistInputData.playlistCategory;
        this.description = playlistInputData.description;
      }
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
  },
  async created() {
    await this.initialize();

    //highlightHeaderを設定
    this.$store.commit("highlightHeader/setShowSteps", true);
    this.$store.commit("highlightHeader/setShowBackIcon", true);

    //プレイリストのカテゴリーを取得しセット
    await this.$store.dispatch(
      "playlist/getCurrentCategory",
      this.myPlaylistToSave
    );

    //サムネイルを取得
    await this.getThumbnail(this.myPlaylistToSave);

    if (this.currentCategory == "Sports") {
      this.playlistCategory = "Sports";
    } else if (this.currentCategory == "Gaming") {
      this.playlistCategory = "Game";
    }
  },
};
</script>
