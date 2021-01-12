<template>
  <v-dialog v-model="showCreateNewPlaylistModal" persistent max-width="400px">
    <v-sheet class="mx-auto">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-list class="pb-0" dense>
              <v-list-item-subtitle class="ma-0 pa-2 pb-3"
                >新規まとめを作成</v-list-item-subtitle
              >
              <v-list-item>
                <v-text-field
                  v-model="newPlaylistName"
                  label="新規まとめ名"
                  outlined
                  dense
                  style="font-size:80%;"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-select
                  v-model="privacySetting"
                  v-bind:items="privacySettingItems"
                  label="まとめのプライバシー設定"
                  outlined
                  dense
                  style="font-size:80%;"
                ></v-select>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-2">
          <v-col class="text-center ma-0 pa-0">
            <v-btn v-on:click="submitNewPlaylist" width="90px" color="primary"
              >完了</v-btn
            >
          </v-col>
          <v-col class="text-center ma-0 pa-0">
            <v-btn
              v-on:click="closeCreateNewPlaylistModal"
              width="90px"
              color="primary"
              >キャンセル</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: {},
  data() {
    return {
      newPlaylistName: "",
      privacySetting: "public",
      privacySettingItems: [
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
    };
  },
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      currentCategory: "youtube/currentCategory",
    }),
    showCreateNewPlaylistModal: {
      get() {
        return this.$store.getters["tagging/showCreateNewPlaylistModal"];
      },
      set() {
        return this.$store.commit("tagging/closeCreateNewPlaylistModal");
      },
    },
    // currentCategory() {
    // return this.$store.getters["youtube/newVideoData"].category;
    // },
  },
  methods: {
    //モーダルを閉じる
    closeCreateNewPlaylistModal() {
      this.$store.commit("tagging/closeCreateNewPlaylistModal");
    },
    //完了ボタン
    async submitNewPlaylist() {
      //まとめを新規作成しIDをstoreのnewPlaylistIdに保存
      this.newPlaylistName
        ? await this.$store.dispatch("playlist/createPlaylist", {
            newPlaylistName: this.newPlaylistName,
            privacySetting: this.privacySetting,
            currentTagId: "",
            currentCategory: this.currentCategory,
          })
        : "";

      //新規作成したまとめを含むユーザーが作成したまとめ一覧を再度取得
      this.$store.dispatch("playlist/getMyCreatedPlaylist");

      //新規作成したまとめを「保存先まとめ」欄に入力
      this.$store.commit(
        "tagging/setMyPlaylistToSave",
        this.$store.getters["playlist/newPlaylistId"]
      );

      //モーダルをを閉じる
      this.closeCreateNewPlaylistModal();
    },
  },
  created() {},
};
</script>
