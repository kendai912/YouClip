<template>
  <v-dialog v-model="showPlaylistDeleteModal" max-width="360">
    <v-card class="ma-0 pa-0">
      <v-btn icon dark small v-on:click="closePlaylistDeleteModal">
        <v-icon color="grey darken-1">mdi-close</v-icon>
      </v-btn>
      <v-card-title class="title-2 py-2">プレイリストを削除</v-card-title>
      <v-card-subtitle class="subtitle-1 py-3"
        >{{
          playlistName
        }}を削除してもよろしいですか？<br />(削除すると元に戻すことはできません。)</v-card-subtitle
      >
      <v-divider class="mx-6"></v-divider>
      <v-container class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          <v-col class="mx-6 py-3 px-0 text-right">
            <a style="color: grey" v-on:click="cancel">キャンセル</a
            >&nbsp;&nbsp;
            <a style="color: black" v-on:click="deletePlaylist">削除</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "PlaylistDeleteModal",
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
  props: {},
  computed: {
    ...mapGetters({
      playlistId: "playlistDeleteModal/playlistId",
      playlistName: "playlistDeleteModal/playlistName",
    }),
    showPlaylistDeleteModal: {
      get() {
        return this.$store.getters[
          "playlistDeleteModal/showPlaylistDeleteModal"
        ];
      },
      set() {
        return this.$store.commit(
          "playlistDeleteModal/closePlaylistDeleteModal"
        );
      },
    },
  },
  methods: {
    ...mapMutations({
      closePlaylistDeleteModal: "playlistDeleteModal/closePlaylistDeleteModal",
    }),
    cancel() {
      this.closePlaylistDeleteModal();
    },
    //プレイリストの削除
    async deletePlaylist() {
      //プレイリストを削除
      await this.$store.dispatch("playlistDeleteModal/deletePlaylist");

      //プレイリスト削除完了のトーストを表示
      this.$store.commit("snackbar/setText", "プレイリストを削除しました");
      this.$store.commit("snackbar/seVertical", false);
      this.$store.commit("snackbar/setSnackbar", true);
      this.$store.commit("snackbar/setTimeout", 5000);

      //モーダルを閉じる
      this.closePlaylistDeleteModal();

      //前のページに遷移
      this.$router.go(-1);
    },
  },
  created() {},
};
</script>
