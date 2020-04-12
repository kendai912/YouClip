<template>
  <v-sheet class="text-center" height="450px">
    <div>
      <span v-on:click="returnToTimeControl">
        <i class="fas fa-chevron-left"></i>
      </span>
      <span>シーンにタグ付け</span>
    </div>
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
        solo
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            color="blue"
            close
            v-on:click="select"
            v-on:click:close="remove(item)"
          >
            <v-icon left>mdi-label</v-icon>
            <strong>{{ item }}</strong>&nbsp;
          </v-chip>
        </template>
      </v-combobox>
    </v-form>
    <div>
      <v-btn class="mt-6" text color="error" v-on:click="submit">
        <span v-if="isEditting">更新</span>
        <span v-else>完了</span>
      </v-btn>
    </div>
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
            } else {
              //新規の場合
              self.$store.dispatch("tagging/storeSceneTags");
              self.$emit("taggingSucceed");
            }
            //シーンタグの入力フォームであるcomboboxのリストに入力した値を追加
            // self.$store.commit("tagging/setItemsList", self.tags);
          }
        });
      } else {
        //未ログインの場合
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
      this.tags = this.$store.getters["tagging/tags"];

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
    // this.items = this.itemsList;
  }
};
</script>
