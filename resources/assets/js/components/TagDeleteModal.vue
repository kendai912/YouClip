<template>
  <v-dialog v-model="showTagDeleteModal" max-width="360">
    <v-card class="ma-0 pa-0">
      <v-btn icon dark small v-on:click="closeTagDeleteModal">
        <v-icon color="grey darken-1">mdi-close</v-icon>
      </v-btn>
      <v-card-title class="title-2 py-2">場面を削除</v-card-title>
      <v-card-subtitle class="subtitle-1 py-3"
        >{{ tagName }}
        {{
          sceneListofPlaylist[tagIndex]
            ? sceneListofPlaylist[tagIndex].start
            : ""
        }}-{{
          sceneListofPlaylist[tagIndex]
            ? sceneListofPlaylist[tagIndex].end
            : ""
        }}の場面を削除してもよろしいですか？<br />(削除すると元に戻すことはできません。)</v-card-subtitle
      >
      <v-divider class="mx-6"></v-divider>
      <v-container class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 py-3 px-0 text-right">
            <a style="color: grey" v-on:click="cancel">キャンセル</a
            >&nbsp;&nbsp;
            <a style="color: black" v-on:click="deleteTag">削除</a>
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
    //プレイリストの削除
    async deleteTag() {
      //プレイリストを削除
      await this.$store.dispatch("tagDeleteModal/deleteTag").then((res) => {
        if (res) {
          //プレイリスト削除完了のトーストを表示
          this.$store.commit(
            "snackbar/setText",
            "切り抜きまとめを削除しました"
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
