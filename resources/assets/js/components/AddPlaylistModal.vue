<template>
  <div class="v-modal" v-on:click="closeAddPlaylistModal">
    <div class="text-dark shadow rounded mb-7 modal-in-box" v-on:click.stop>
      <div id="myPlaylists" v-if="hasMyPlaylists">
        <span v-on:click="closeAddPlaylistModal">✕</span>
        <div v-for="(myPlaylist, index) in myCreatedPlaylist" v-bind:key="index">
          <div>
            <input
              type="checkbox"
              v-bind:id="myPlaylist.id"
              v-bind:value="myPlaylist.id"
              v-model="checkedPlaylistIds"
            />
            <label v-bind:for="myPlaylist.id">{{ myPlaylist.playlistName }}</label>
          </div>
        </div>
        <div v-on:click.stop="addMyPlaylists">完了</div>
      </div>

      <div id="newPlaylists">
        <div class="form-group mb-4">
          新規プレイリスト名
          <input type="type" class="form-control" v-model="newPlaylistName" />
        </div>
        <div class="form-group mb-4">
          プライバシー設定
          <select name="playlistPrivacy" v-model="privacySetting" size="1">
            <option value="open">公開</option>
            <option value="private">非公開</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <span v-on:click.stop="createPlaylist">作成</span>
        </div>
      </div>
    </div>
  </div>
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
      privacySetting: ""
    };
  },
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      currentTagId: "watch/currentTagId",
      currentCategory: "watch/currentCategory",
      playlistIdsOfTag: "playlist/playlistIdsOfTag"
    }),
    hasMyPlaylists() {
      return this.$store.getters["playlist/hasMyPlaylists"];
    },
    myCreatedPlaylist() {
      return this.$store.getters["playlist/myCreatedPlaylist"];
    }
  },
  methods: {
    //モーダルを閉じてプレイヤーを再開
    closeAddPlaylistModal() {
      this.$store.commit("playlist/closeAddPlaylistModal");

      //プレイヤーを再開
      this.player.playVideo();
    },
    //既存プレイリストへの追加
    addMyPlaylists() {
      this.$store.dispatch("playlist/addMyPlaylists", {
        checkedPlaylistIds: this.checkedPlaylistIds,
        currentTagId: this.currentTagId
      });

      //プレイヤーを再開
      this.player.playVideo();
    },
    //プレイリスト新規作成と選択中のタグの保存
    createPlaylist() {
      this.$store.dispatch("playlist/createPlaylist", {
        newPlaylistName: this.newPlaylistName,
        privacySetting: this.privacySetting,
        currentTagId: this.currentTagId,
        currentCategory: this.currentCategory
      });

      //プレイヤーを再開
      this.player.playVideo();
    }
  },
  created() {
    this.checkedPlaylistIds = this.playlistIdsOfTag;
  }
};
</script>