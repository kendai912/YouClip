<template>
  <div class="text-center">
    <v-bottom-sheet v-model="showOtherActionModal">
      <v-list>
        <v-list-item v-for="tile in tiles" :key="tile.title" v-on:click="tapTile(tile.action)">
          <v-list-item-avatar>
            <i v-bind:class="tile.img"></i>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data: () => ({
    tiles: [
      { img: "fas fa-trash", title: "削除", action: "delete" },
      { img: "fas fa-pen", title: "編集", action: "edit" },
      { img: "fas fa-flag", title: "報告", action: "report" },
      { img: "fas fa-times", title: "キャンセル", action: "cancel" }
    ]
  }),
  props: {
    player: Object
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentYoutubeId: "watch/currentYoutubeId",
      startHis: "watch/start",
      endHis: "watch/end",
      currentTagId: "watch/currentTagId",
      currentTagNameArray: "watch/currentTagNameArray",
    }),
    startIs() {
      return this.formatToMinSec(this.startHis);
    },
    endIs() {
      return this.formatToMinSec(this.endHis);
    },
    showOtherActionModal: {
      get() {
        this.player.pauseVideo();
        return this.$store.getters["otherActionModal/showOtherActionModal"];
      },
      set() {
        this.player.playVideo();
        return this.$store.commit("otherActionModal/closeOtherActionModal");
      }
    }
  },
  methods: {
    ...mapMutations({
      closeOtherActionModal: "otherActionModal/closeOtherActionModal"
    }),
    async tapTile(action) {
      if (action == "delete") {
        //otherActionModalを閉じる
        this.closeOtherActionModal();
        this.$store.commit("tagging/setTagId", this.currentTagId);
        this.$store.dispatch("tagging/deleteTag");

        //シーンタグ削除完了のトーストを表示し遷移
        this.$emit("deleteSucceed");
      } else if (action == "edit") {
        //otherActionModalを閉じる
        this.closeOtherActionModal();

        //「編集」に必要なyoutubeデータをロード
        this.$store.commit("youtube/setYoutubeId", this.currentYoutubeId);
        await this.$store.dispatch("youtube/getVideo");
        await this.$store.dispatch("youtube/getTag");
        this.$store.commit("youtube/setIsReady", true);

        //編集モードフラグをセット
        this.$store.commit("tagging/setIsEditting", true);

        //編集前のタグID・開始時間・終了時間・シーンタグをセット
        this.$store.commit("tagging/setTagId", this.currentTagId);
        this.$store.commit("tagging/setStart", this.startIs);
        this.$store.commit("tagging/setEnd", this.endIs);
        this.$store.commit("tagging/setTags", this.currentTagNameArray);

        //シーンタグ付けコンポーネントを表示
        this.$store.commit("tagging/setShowSceneTagControl", true);
      } else if (action == "report") {
      } else if (action == "cancel") {
        this.closeOtherActionModal();
      }
    }
  },
  created() {}
};
</script>