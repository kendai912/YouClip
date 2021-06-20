<template>
  <v-dialog v-model="showAddPlaylistModal" max-width="400px">
    <v-card class="ma-0 pa-0" height="500px">
      <v-row class="ma-0 pa-0" v-if="hasMyPlaylists">
        <v-col class="ma-0 pa-0">
          <v-list class="pb-0" dense>
            <v-list-item-subtitle class="ma-0 pa-2 pb-0">{{
              $t("AddToPlaylistModal.addtoExistingPlaylist")
            }}</v-list-item-subtitle>
            <v-list-item
              v-for="myPlaylist in myCreatedPlaylist"
              v-show="myPlaylist.playlistName"
              :key="myPlaylist.id"
              @click="sheet = false"
              style="height:30px;"
            >
              <v-checkbox
                dense
                v-model="checkedPlaylistIds"
                v-bind:value="myPlaylist.id"
              ></v-checkbox>
              <v-list-item-title>{{
                myPlaylist.playlistName
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <v-list class="pb-0" dense>
            <v-list-item-subtitle class="ma-0 pa-2 pb-3">{{
              $t("AddToPlaylistModal.createNewPlaylist")
            }}</v-list-item-subtitle>
            <v-list-item>
              <v-text-field
                v-model="newPlaylistName"
                v-bind:label="$t('AddToPlaylistModal.newPlaylistName')"
                outlined
                dense
                style="font-size:10px;"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-select
                v-model="privacySetting"
                v-bind:items="privacySettingItems"
                v-bind:label="$t('AddToPlaylistModal.privacySetting')"
                outlined
                dense
                style="font-size:14px"
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
      <v-row class="ma-0 pa-2 justify-end" style="backgroundColor: white;">
        <v-btn
          v-on:click="closeAddPlaylistModal"
          width="90px"
          color="default"
          class="mr-1"
          >{{ $t("AddToPlaylistModal.cancel") }}</v-btn
        >
        <v-btn v-on:click="addToPlaylist" width="90px" color="primary">{{
          $t("AddToPlaylistModal.finish")
        }}</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      checkedPlaylistIds: [],
      newPlaylistName: "",
      privacySetting: "public",
      privacySettingItems: [
        { text: this.$t("AddToPlaylistModal.data.public"), value: "public" },
        {
          text: this.$t("AddToPlaylistModal.data.limited"),
          value: "limited",
        },
        {
          text: this.$t("AddToPlaylistModal.data.private"),
          value: "private",
        },
      ],
    };
  },
  props: ["currentTagId"],
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      currentCategory: "playlist/currentCategory",
      playlistIdsOfTag: "playlist/playlistIdsOfTag",
      hasMyPlaylists: "playlist/hasMyPlaylists",
      myCreatedPlaylist: "playlist/myCreatedPlaylist",
    }),
    showAddPlaylistModal: {
      get() {
        return this.$store.getters["playlist/showAddPlaylistModal"];
      },
      set() {
        return this.$store.commit("playlist/closeAddPlaylistModal");
      },
    },
  },
  methods: {
    //モーダルを閉じてプレイヤーを再開
    closeAddPlaylistModal() {
      this.$store.commit("playlist/closeAddPlaylistModal");
    },
    //完了ボタン
    addToPlaylist() {
      //既存プレイリストへの登録
      this.$store.dispatch("playlist/addMyPlaylists", {
        checkedPlaylistIds: this.checkedPlaylistIds,
        currentTagId: this.currentTagId,
      });

      //プレイリスト新規作成と選択中のタグの保存
      this.newPlaylistName
        ? this.$store.dispatch("playlist/createPlaylist", {
            newPlaylistName: this.newPlaylistName,
            privacySetting: this.privacySetting,
            currentTagId: this.currentTagId,
            currentCategory: this.currentCategory,
          })
        : "";

      //プレイリスト削除完了のトーストを表示
      this.$store.commit(
        "snackbar/setText",
        this.$t("AddToPlaylistModal.methods.savedToClip")
      );
      this.$store.commit("snackbar/seVertical", false);
      this.$store.commit("snackbar/setSnackbar", true);
      this.$store.commit("snackbar/setTimeout", 5000);
    },
  },
  created() {
    this.checkedPlaylistIds = this.playlistIdsOfTag;
  },
};
</script>
