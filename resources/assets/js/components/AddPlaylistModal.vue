<template>
  <v-bottom-sheet v-model="showAddPlaylistModal" max-width="400px">
    <v-sheet class="mx-auto">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" v-if="hasMyPlaylists">
          <v-col class="ma-0 pa-0">
            <v-list class="pb-0" dense>
              <v-list-item-subtitle class="ma-0 pa-2 pb-0">既存プレイリストに追加</v-list-item-subtitle>
              <v-list-item
                v-for="myPlaylist in myCreatedPlaylist"
                :key="myPlaylist.id"
                @click="sheet = false"
                style="height:30px;"
              >
                <v-checkbox dense v-model="checkedPlaylistIds" v-bind:value="myPlaylist.id"></v-checkbox>
                <v-list-item-title>{{ myPlaylist.playlistName }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-list class="pb-0" dense>
              <v-list-item-subtitle class="ma-0 pa-2 pb-3">新規プレイリストに登録</v-list-item-subtitle>
              <v-list-item>
                <v-text-field
                  v-model="newPlaylistName"
                  label="新規プレイリスト名"
                  outlined
                  dense
                  style="font-size:80%;"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-select
                  v-model="privacySetting"
                  v-bind:items="privacySettingItems"
                  label="プライバシー設定"
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
            <v-btn v-on:click="addToPlaylist" width="90px" color="primary">完了</v-btn>
          </v-col>
          <v-col class="text-center ma-0 pa-0">
            <v-btn v-on:click="closeAddPlaylistModal" width="90px" color="primary">キャンセル</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    player: Object
  },
  data() {
    return {
      checkedPlaylistIds: [],
      newPlaylistName: "",
      privacySetting: "公開",
      privacySettingItems: ["公開", "非公開"]
    };
  },
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      currentTagId: "watch/currentTagId",
      currentCategory: "watch/currentCategory",
      playlistIdsOfTag: "playlist/playlistIdsOfTag",
      hasMyPlaylists: "playlist/hasMyPlaylists",
      myCreatedPlaylist: "playlist/myCreatedPlaylist"
    }),
    showAddPlaylistModal: {
      get() {
        this.player.pauseVideo();
        return this.$store.getters["playlist/showAddPlaylistModal"];
      },
      set() {
        this.player.playVideo();
        return this.$store.commit("playlist/closeAddPlaylistModal");
      }
    }
  },
  methods: {
    //モーダルを閉じてプレイヤーを再開
    closeAddPlaylistModal() {
      this.$store.commit("playlist/closeAddPlaylistModal");

      //プレイヤーを再開
      this.player.playVideo();
    },
    //完了ボタン
    addToPlaylist() {
      //既存プレイリストへの追加
      this.$store.dispatch("playlist/addMyPlaylists", {
        checkedPlaylistIds: this.checkedPlaylistIds,
        currentTagId: this.currentTagId
      });

      //プレイリスト新規作成と選択中のタグの保存
      this.newPlaylistName
        ? this.$store.dispatch("playlist/createPlaylist", {
            newPlaylistName: this.newPlaylistName,
            privacySetting: this.privacySetting,
            currentTagId: this.currentTagId,
            currentCategory: this.currentCategory
          })
        : "";

      //プレイヤーを再開
      this.player.playVideo();
    }
  },
  created() {
    this.checkedPlaylistIds = this.playlistIdsOfTag;
  }
};
</script>