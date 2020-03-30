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
        v-bind:rules="tagsRules"
        v-on:input="onUpdate"
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
            @click="select"
            @click:close="remove(item)"
          >
            <v-icon left>mdi-label</v-icon>
            <strong>{{ item }}</strong>&nbsp;
            <span>(interest)</span>
          </v-chip>
        </template>
      </v-combobox>
    </v-form>
    <div>
      <v-btn class="mt-6" text color="error" v-on:click="submit">完了</v-btn>
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
      showLoginModal: "noLoginModal/showLoginModal"
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
            self.$store.commit("tagging/setTags", self.tags);
            self.$store.dispatch("tagging/storeSceneTags");
            self.$emit("taggingSucceed");
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
    initialize() {
      //戻るボタンから表示された際の既入力値のセット
      this.tags = this.$store.getters["tagging/tags"];
    },
    onUpdate($event) {
      this.tags = $event;
      this.$refs.form.validate();
    }
  },
  created() {
    this.initialize();
  }
};
</script>
