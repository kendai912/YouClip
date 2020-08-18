<template>
  <v-sheet height="240" tile class="text-center">
    <v-sheet tile class="ma-0 pa-1">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <span>シーンにタグ付け</span>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-divider></v-divider>

    <v-sheet tile class="ma-0 pa-1">
      <v-form ref="form">
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
    </v-sheet>

    <v-sheet tile class="ma-0 pa-0 bottom-position" width="100%">
      <v-container class="ma-0 pa-0" fluid>
        <v-row align="center" class="ma-0 pa-0">
          <v-col class="text-left ma-0">
            <i v-on:click="returnToTimeControl" class="fas fa-arrow-left fa-2x my-grey"></i>
          </v-col>
          <v-col class="text-right ma-0">
            <div>
              <v-icon x-large v-on:click="submit" color="error">check_circle</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <NoLoginModal v-if="showLoginModal" />
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NoLoginModal from "../components/NoLoginModal.vue";
import myMixin from "../util";

export default {
  components: {
    NoLoginModal
  },
  props: {
    player: Object
  },
  data() {
    return {
      sheet: true,
      tags: [],
      tagItems: [],
      tagsRules: [v => !!v || "シーンタグを入力して下さい"]
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
      isEditting: "tagging/isEditting"
    })
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
        setTimeout(function() {
          if (self.$refs.form.validate()) {
            //シーンタグをセットし保存＋トースト表示
            self.$store.commit("tagging/setTags", self.tags);
            if (self.isEditting) {
              //編集の場合
              self.$store.dispatch("tagging/updateSceneTags");
              self.$emit("updateSucceed");
              //シーンタグ付けコンポーネントを非表示にし再生画面に戻る
              self.$store.commit("tagging/setShowSceneTagControl", false);
            } else {
              //新規の場合
              self.$store.dispatch("tagging/storeSceneTags");
              self.$emit("taggingSucceed");
            }

            localStorage.removeItem('startTime');
            localStorage.removeItem('endTime');
            localStorage.removeItem('showTaggingControl');
            localStorage.removeItem('sceneTags');
            // //入力フォームをクリア
            self.$store.commit("tagging/setTags", "");
            self.$store.commit("tagging/setStart", "");
            self.$store.commit("tagging/setEnd", "");
            //画面下部のシーンの遷移モードを変更(true:右スライド, false:左スライド)
            self.$store.commit("tagging/setControlTransitNext", false);
            //TimeControlのシートへ戻る
            self.$store.commit("tagging/setShowTaggingControl", "TimeControl");

          }
        });
      } else {
        //未ログインの場合
        localStorage.setItem('sceneTags', JSON.stringify(this.tags));
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "このシーンにタグ付けするには、ログインしてください。"
        );
      }
    },
    returnToTimeControl() {
      //入力中のシーンタグを保存
      this.$store.commit("tagging/setTags", this.tags);

      //画面下部のシーンの遷移モードを変更(true:右スライド, false:左スライド)
      this.$store.commit("tagging/setControlTransitNext", false);

      //TimeControlのシートへ戻る
      this.$store.commit("tagging/setShowTaggingControl", "TimeControl");
    },
    setTagItems() {
      let tagItemsArray;
      this.tagHistories.forEach(tagHistory => {
        tagItemsArray = tagHistory.split(/[\s| |　]/);
        this.tagItems.push(...tagItemsArray);
      });
    },
    async initialize() {
      //戻るボタンから表示された際の既入力値のセット
      if (localStorage.getItem('sceneTags')) {
        this.tags = JSON.parse(localStorage.getItem('sceneTags'));
      } else {
        this.tags = this.$store.getters["tagging/tags"];
      }

      if (this.isLogin) {
        //シーンタグアイテムに使うシーンタグ履歴をロード
        await this.$store.dispatch("tagging/getTagHistories");
        //スペース区切りで配列に変換しシーンタグアイテムにセット
        this.setTagItems();
      }
    }
  },
  created() {
    this.initialize();
  }
};
</script>
