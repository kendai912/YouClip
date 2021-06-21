<template>
  <v-dialog v-model="showTagDeleteModal" max-width="360">
    <v-card class="ma-0 pa-0">
      <v-btn icon dark small v-on:click="closeTagDeleteModal">
        <v-icon color="grey darken-1">mdi-close</v-icon>
      </v-btn>
      <v-card-title class="title-2 py-2">{{
        $t("TagDeleteModal.deleteScene")
      }}</v-card-title>
      <v-card-subtitle
        class="subtitle-1 py-3"
        v-html="$t('TagDeleteModal.areYouSureToDelete')"
      ></v-card-subtitle>
      <v-divider class="mx-6"></v-divider>
      <v-container class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 py-3 px-0 text-right">
            <a style="color: grey" v-on:click="cancel">{{
              $t("TagDeleteModal.cancel")
            }}</a
            >&nbsp;&nbsp;
            <a style="color: black" v-on:click="deleteTag">{{
              $t("TagDeleteModal.delete")
            }}</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "TagDeleteModal",
  data() {
    return {
      beforeLoginUrl: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.beforeLoginUrl = from;
    });
  },
  computed: {
    ...mapGetters({
      tagId: "tagDeleteModal/tagId",
      tagName: "tagDeleteModal/tagName",
      tagIndex: "tagDeleteModal/tagIndex",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
    }),
    showTagDeleteModal: {
      get() {
        return this.$store.getters["tagDeleteModal/showTagDeleteModal"];
      },
      set() {
        return this.$store.commit("tagDeleteModal/closeTagDeleteModal");
      },
    },
  },
  methods: {
    ...mapMutations({
      closeTagDeleteModal: "tagDeleteModal/closeTagDeleteModal",
      setSceneListofPlaylist: "playlist/setSceneListofPlaylist",
    }),
    cancel() {
      this.closeTagDeleteModal();
    },
    //シーンの削除
    async deleteTag() {
      //シーンを削除
      await this.$store.dispatch("tagDeleteModal/deleteTag").then((res) => {
        if (res) {
          //削除完了のトーストを表示
          this.$store.commit(
            "snackbar/setText",
            this.$t("TagDeleteModal.finishedDeleting")
          );
          this.$store.commit("snackbar/seVertical", false);
          this.$store.commit("snackbar/setSnackbar", true);
          this.$store.commit("snackbar/setTimeout", 5000);

          let tags = this.sceneListofPlaylist;

          //前のページに遷移
          this.setSceneListofPlaylist(tags.splice(this.tagIndex, 1));
        }
      });

      //モーダルを閉じる
      this.closeTagDeleteModal();
    },
  },
  created() {},
};
</script>
