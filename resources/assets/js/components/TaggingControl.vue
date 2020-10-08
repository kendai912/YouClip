<template>
  <v-sheet height="240" tile class="text-center">
    <v-sheet tile class="ma-0 pa-1">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <span>シーンにタグ付け</span>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="ma-0 pa-0">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row class="mt-2 mx-0 mb-0 px-1">
          <v-col class="ma-0 pa-0">
            <v-form ref="form" class="ma-0 pa-0">
              <v-combobox
                v-model="tags"
                v-bind:items="tagItems"
                v-bind:rules="tagsRules"
                required
                validate-on-blur
                chips
                clearable
                label="シーンタグを入力"
                multiple
                flat
                dense
                small-chips
                class="sceneTagInputBox"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    v-on:click="select"
                    v-on:click:close="remove(item)"
                    close
                    class="ma-2"
                    small
                    color="blue lighten-2"
                    text-color="white"
                  >
                    <v-avatar left>
                      <i class="fas fa-tag my-grey"></i>
                    </v-avatar>
                    {{ item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-form>
          </v-col>
        </v-row>

        <v-row class="mt-0 mx-0 mb-4 px-1">
          <v-col class="pa-0 pt-1 text-center">
            <v-select
              v-model="privacySetting"
              :items="privacySettingList"
              label="シーンのプライバシー設定"
              prepend-icon="mdi-earth"
              hide-details
              dense
              class="scenePrivacySettingBox"
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="!isEditting" class="ma-0 px-1">
          <v-col class="pa-0 pt-1 text-center">
            <v-select
              v-model="myPlaylistToSave"
              :items="myPlaylistItems"
              label="保存先プレイリスト"
              hide-details
              dense
              class="sceneMyPlaylistToSaveBox"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet tile class="ma-0 pa-0 bottom-position" width="100%">
      <v-container class="ma-0 pa-0" fluid>
        <v-row align="center" class="ma-0 pa-0">
          <v-col class="text-left pa-1 ma-0">
            <i
              v-on:click="returnToTimeControl"
              class="fas fa-arrow-left fa-2x my-grey"
            ></i>
          </v-col>
          <v-col class="text-right pa-1 ma-0">
            <div>
              <v-icon x-large v-on:click="submit" color="error"
                >check_circle</v-icon
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <NoLoginModal v-if="showLoginModal" />
    <CreateNewPlaylistModal v-if="showCreateNewPlaylistModal" />
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NoLoginModal from "../components/NoLoginModal.vue";
import CreateNewPlaylistModal from "../components/CreateNewPlaylistModal.vue";
import myMixin from "../util";

export default {
  components: {
    NoLoginModal,
    CreateNewPlaylistModal,
  },
  props: {
    player: Object,
  },
  data() {
    return {
      sheet: true,
      tags: [],
      tagItems: [],
      tagsRules: [(v) => !!v || "シーンタグを入力して下さい"],
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
      isEditPrivacy: false,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentTime: "youtube/currentTime",
      videoData: "youtube/videoData",
      newVideoData: "youtube/newVideoData",
      isReady: "youtube/isReady",
      isNew: "youtube/isNew",
      isLogin: "auth/check",
      showLoginModal: "noLoginModal/showLoginModal",
      tagHistories: "tagging/tagHistories",
      isEditting: "tagging/isEditting",
      isKeep: "tagging/isKeep",
      showCreateNewPlaylistModal: "tagging/showCreateNewPlaylistModal",
    }),
    privacySetting: {
      get() {
        return this.$store.getters["tagging/privacySetting"];
      },
      set(val) {
        return this.$store.commit("tagging/setPrivacySetting", val);
      },
    },
    myPlaylistToSave: {
      get() {
        return this.$store.getters["tagging/myPlaylistToSave"];
      },
      set(val) {
        return this.$store.commit("tagging/setMyPlaylistToSave", val);
      },
    },
    myPlaylistItems() {
      let items = [{ text: "選択なし", value: "none" }];

      if (this.isLogin) {
        //ユーザーがログイン済の場合、自分のプレイリストをセレクトボックスの項目に追加
        this.$store.getters["playlist/myCreatedPlaylist"].forEach(
          (playlist) => {
            items.push({
              text: playlist.playlistName,
              value: playlist.id,
            });
          }
        );
      }

      items.push({
        text: "＋ プレイリスト新規作成",
        value: "new",
      });

      return items;
    },
  },
  watch: {
    myPlaylistToSave: function (newPlaylist, oldPlaylist) {
      // プレイリスト新規作成の場合は、プレイリスト作成モーダルを表示
      if (newPlaylist == "new") {
        if (this.isLogin) {
          this.$store.commit("tagging/openCreateNewPlaylistModal");
        } else {
          //未ログインの場合は、入力中データを一時保存しログインモーダルを表示
          localStorage.setItem("sceneTags", JSON.stringify(this.tags));
          localStorage.setItem(
            "privacySetting",
            JSON.stringify(this.privacySetting)
          );
          this.$store.commit("noLoginModal/openLoginModal");
          this.$store.commit(
            "noLoginModal/setMessageWhenNotLogined",
            "プレイリストを作成するには、ログインしてください。(入力データは保持されます)"
          );
        }
      }
    },
  },
  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    submit() {
      if (this.isLogin) {
        //ログイン済の場合
        let self = this;
        setTimeout(async function () {
          if (self.$refs.form.validate()) {
            if (self.isEditting) {
              //編集の場合
              //入力済データ(除く、保存先プレイリスト)をセット
              self.$store.commit("tagging/setTags", self.tags);
              self.$store.commit(
                "tagging/setPrivacySetting",
                self.privacySetting
              );

              //更新完了トースト表示
              self.$emit("updateSucceed");

              //シーンタグ付けコンポーネントを非表示にし再生画面に戻る
              self.$store.commit("tagging/setShowSceneTagControl", false);

              //データを更新
              await self.$store.dispatch("tagging/updateSceneTags");

              //リロード
              window.location.reload();
            } else {
              //新規の場合
              //入力済データをセット
              self.$store.commit("tagging/setTags", self.tags);
              self.$store.commit(
                "tagging/setPrivacySetting",
                self.privacySetting
              );
              self.$store.commit(
                "tagging/setMyPlaylistToSave",
                self.myPlaylistToSave
              );

              //登録完了トースト表示
              self.$emit("taggingSucceed");

              //データを登録
              self.$store.dispatch("tagging/storeSceneTags");
            }

            // 入力フォームをクリア(プライバシー設定と保存先プレイリストは初期値をセット)
            self.$store.commit("tagging/setTags", "");
            self.$store.commit("tagging/setStart", "");
            self.$store.commit("tagging/setEnd", "");
            self.$store.commit("tagging/setPrivacySetting", "public");
            self.$store.commit("tagging/setMyPlaylistToSave", "none");

            //画面下部のシーンの遷移モードを変更(true:右スライド, false:左スライド)
            self.$store.commit("tagging/setControlTransitNext", false);

            //TimeControlのシートへ戻る
            self.$store.commit("tagging/setShowTaggingControl", "TimeControl");
          }
        });
      } else {
        //未ログインの場合、入力中データを一時保存しログインモーダルを表示
        localStorage.setItem("sceneTags", JSON.stringify(this.tags));
        localStorage.setItem(
          "privacySetting",
          JSON.stringify(this.privacySetting)
        );
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "このシーンにタグ付けするには、ログインしてください。(入力データは保持されます)"
        );
      }
    },
    returnToTimeControl() {
      this.$store.commit("tagging/setIsKeep", true);
      //入力中のシーンタグを保存
      this.$store.commit("tagging/setTags", this.tags);
      this.$store.commit("tagging/setPrivacySetting", this.privacySetting);
      this.$store.commit("tagging/setMyPlaylistToSave", this.myPlaylistToSave);

      //画面下部のシーンの遷移モードを変更(true:右スライド, false:左スライド)
      this.$store.commit("tagging/setControlTransitNext", false);

      //TimeControlのシートへ戻る
      this.$store.commit("tagging/setShowTaggingControl", "TimeControl");
    },
    setTagItems() {
      let tagItemsArray;
      this.tagHistories.forEach((tagHistory) => {
        tagItemsArray = tagHistory.split(/::/);
        this.tagItems.push(...tagItemsArray);
      });
    },
    async initialize() {
      //戻るボタンから表示された際の既入力値のセット
      this.$store.commit("noLoginModal/closeLoginModal");
      if (localStorage.getItem("sceneTags")) {
        this.tags = JSON.parse(localStorage.getItem("sceneTags"));
        this.privacySetting = JSON.parse(
          localStorage.getItem("privacySetting")
        );
      } else {
        this.tags = this.$store.getters["tagging/tags"];
        this.privacySetting = this.$store.getters["tagging/privacySetting"];
      }
      if (this.isLogin) {
        //シーンタグアイテムに使うシーンタグ履歴をロード
        await this.$store.dispatch("tagging/getTagHistories");
        //スペース区切りで配列に変換しシーンタグアイテムにセット
        this.setTagItems();
      }
      localStorage.removeItem("startTime");
      localStorage.removeItem("endTime");
      localStorage.removeItem("sceneTags");
      localStorage.removeItem("privacySetting");
      localStorage.removeItem("showTaggingControl");
    },
  },
  created() {
    this.initialize();
  },
};
</script>
