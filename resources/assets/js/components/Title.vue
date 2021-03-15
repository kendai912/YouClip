<template>
  <div class="container--small">
    <HighlightHeader />

    <div class="highlight-body" ref="highlightBody" style="height: auto;">
      <v-card class="pa-2 ma-0 mt-2" elevation="0">
        <v-container class="ma-0 pa-0" fluid>
          <v-form ref="form">
            <v-row class="ma-0 mb-8 pa-2 pb-4">
              <v-col class="ma-0 pa-0">
                <v-text-field
                  v-model="playlistName"
                  v-bind:rules="rules"
                  type="text"
                  name="playlistName"
                  label="まとめのタイトルを入力"
                  hide-details
                  class="playlistNameInputBox"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="ma-0 mb-8 pa-2 pb-4">
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

            <v-row class="ma-0 mb-8 pa-2 pb-4">
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

            <v-row class="ma-0 mb-8 pa-2">
              <v-col class="ma-0 pa-0 text-center">
                <v-card class="text-left pa-0 ma-0 mb-2 my-grey" elevation="0"
                  >(任意)ハイライトの説明</v-card
                >
                <v-textarea v-model="description" outlined></v-textarea>
              </v-col>
            </v-row>
          </v-form>

          <v-row class="ma-0 pa-2 justify-center">
            <v-btn
              width="100%"
              height="45px"
              color="red lighten-1"
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
import { mapState, mapGetters, mapMutations } from "vuex";
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
          text: "音楽",
          value: "Music",
        },
        {
          text: "語学",
          value: "Language",
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
      newPlaylistId: "playlist/newPlaylistId",
      myPlaylistToSave: "tagging/myPlaylistToSave",
      currentCategory: "playlist/currentCategory",
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
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言をセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "まとめのタイトルを入力"
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
          "まとめを保存するには、ログインしてください。(入力データは保持されます)"
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

    //プレイリストのカテゴリーを取得しセット
    await this.$store.dispatch(
      "playlist/getCurrentCategory",
      this.myPlaylistToSave
    );

    if (this.currentCategory == "Music") {
      this.playlistCategory = "Music";
    } else if (this.currentCategory == "Gaming") {
      this.playlistCategory = "Game";
    }
  },
  beforeDestroy() {
    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
