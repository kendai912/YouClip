<template>
  <div class="container--small">
    <div id="player"></div>
    <div v-if="isPlayerReady">
      <div v-if="isPlaylist">
        <span>{{ playlistName }}</span>
        <span v-on:click="sharePlaylist">[Share]</span>
        <span v-on:click="toggleLikePlaylist" v-bind:class="{ isLiked: isLikedPlaylist}">[Like]</span>
        <span>{{ likePlaylistCount }}</span>
      </div>
      <div>
        <span>[Now Playing]</span>
        <span>{{ currentTitle }}</span>
      </div>
      <div>
        <span>{{ startIs }}〜{{ endIs }}</span>
        <span
          v-for="currentTagName in currentTagNameArray"
          class="tag"
          v-bind:key="currentTagName"
        >{{ currentTagName }}</span>
      </div>
      <div>
        <span v-on:click="addPlaylist">[＋]</span>
        <span v-on:click="shareTag">[Share]</span>
        <span v-on:click="toggleLike" v-bind:class="{ isLiked: isLiked}">[Like]</span>
        <span>{{ likeCount }}</span>
      </div>
      <NoLoginModal v-if="showLoginModal" />
      <ShareModal v-if="showShareModal" v-bind:player="player" />
      <AddPlaylistModal v-if="showAddPlaylistModal" v-bind:player="player" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NoLoginModal from "../components/NoLoginModal.vue";
import ShareModal from "../components/ShareModal.vue";
import AddPlaylistModal from "../components/AddPlaylistModal.vue";
import myMixin from "../util";

export default {
  components: {
    NoLoginModal,
    ShareModal,
    AddPlaylistModal
  },
  data() {
    return {
      playlistIdUrl: "",
      indexUrl: 0,
      tagIdUrl: "",
      isPlaying: true,
      isPlayerReady: false,
      player: null
    };
  },
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      openShareModal: "shareModal/openShareModal"
    }),
    playPlaylist(playlistId, index) {
      //最後のシーンでない場合は次のシーンのパラメータをセット
      this.setPlaylistParameters(playlistId, index);

      //URLを更新
      this.$router
        .push({
          query: {
            playlist: playlistId,
            index: index
          }
        })
        .catch(err => {});

      //次のシーンをロードし再生
      this.player.loadVideoById({
        videoId: this.currentYoutubeId,
        startSeconds: this.convertToSec(this.formatToMinSec(this.startHis)),
        endSeconds: this.convertToSec(this.formatToMinSec(this.endHis))
      });
    },
    playSpecificScene(tagId) {
      //特定シーンのパラメータをセット
      this.setIndivisualParameters(tagId);

      //別のシーンの場合はURLを更新
      if (this.$route.query.tag != this.currentTagId) {
        this.$router
          .push({
            query: {
              tag: tagId
            }
          })
          .catch(err => {});
      }

      //次のシーンをロードし再生
      this.player.loadVideoById({
        videoId: this.currentYoutubeId,
        startSeconds: this.convertToSec(this.formatToMinSec(this.startHis)),
        endSeconds: this.convertToSec(this.formatToMinSec(this.endHis))
      });
    },
    toggleLike() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "このシーンを評価するには、ログインしてください。"
        );
      } else {
        //ログイン済の場合
        this.$store.dispatch("like/toggleLike", this.currentTagId);
      }
    },
    toggleLikePlaylist() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "プレイリストを評価するには、ログインしてください。"
        );
      } else {
        //ログイン済の場合
        this.$store.dispatch(
          "likePlaylist/toggleLikePlaylist",
          this.playlistIdUrl
        );
      }
    },
    sharePlaylist() {
      //Playlist Share用のパラメーターを設定
      this.$store.commit("shareModal/setShareUrl", location.href);
      this.$store.commit("shareModal/setShareText", this.playlistName);

      //プレイヤーを一時停止
      this.player.pauseVideo();

      //シェアモーダルを開く
      this.openShareModal();
    },
    shareTag() {
      //Tagシェア用のパラメーターを設定
      this.$store.commit(
        "shareModal/setShareUrl",
        location.protocol +
          "//" +
          location.hostname +
          "/watch?tag=" +
          this.currentTagId
      );
      this.$store.commit(
        "shareModal/setShareText",
        this.currentTitle + " " + this.currentTagName
      );

      //プレイヤーを一時停止
      this.player.pauseVideo();

      //シェアモーダルを開く
      this.openShareModal();
    },
    async addPlaylist() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "このシーンをプレイリストに追加するには、ログインしてください。"
        );
      } else {
        //ログイン済の場合
        //ユーザーのプレイリストをロード
        this.$store.dispatch("playlist/loadPlaylist");

        //選択されたタグが追加済のユーザーのプレイリストIDを取得
        await this.$store.dispatch(
          "playlist/getPlaylistIdsOfTag",
          this.currentTagId
        );

        //プレイヤーを一時停止
        this.player.pauseVideo();

        //プレイリスト追加モーダルを表示
        this.$store.commit("playlist/openAddPlaylistModal");
      }
    }
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      watchList: "watch/watchList",
      listIndex: "watch/listIndex",
      currentYoutubeId: "watch/currentYoutubeId",
      currentTitle: "watch/currentTitle",
      currentTagId: "watch/currentTagId",
      startHis: "watch/start",
      endHis: "watch/end",
      isPlaylist: "watch/isPlaylist",
      playlistName: "watch/playlistName",
      currentTagName: "watch/currentTagName",
      currentTagNameArray: "watch/currentTagNameArray",
      showLoginModal: "noLoginModal/showLoginModal",
      messageWhenNotLogined: "noLoginModal/messageWhenNotLogined",
      showShareModal: "shareModal/showShareModal",
      showAddPlaylistModal: "playlist/showAddPlaylistModal"
    }),
    isLiked() {
      return this.$store.getters["like/isLiked"](this.currentTagId);
    },
    likeCount() {
      return this.$store.getters["like/likeCount"](this.currentTagId);
    },
    isLikedPlaylist() {
      return this.$store.getters["likePlaylist/isLikedPlaylist"](
        this.playlistIdUrl
      );
    },
    likePlaylistCount() {
      return this.$store.getters["likePlaylist/likePlaylistCount"](
        this.playlistIdUrl
      );
    },
    startIs() {
      return this.formatToMinSec(this.startHis);
    },
    endIs() {
      return this.formatToMinSec(this.endHis);
    }
  },
  mixins: [myMixin],
  mounted: async function() {
    //リロードされた場合は必要なデータを再ロード
    if (
      !this.$store.getters["tag/tagVideoData"] ||
      !this.$store.getters["playlist/playlistTagData"]
    ) {
      await this.$store.dispatch("tag/loadTagVideo");
      await this.$store.dispatch("playlist/loadPlaylist");
    }

    if (this.$route.query.playlist) {
      //特定シーン再生の場合
      //URLのクエリパラメータからプレイリストIDとインデックスを取得
      this.playlistIdUrl = this.$route.query.playlist;
      this.indexUrl = this.$route.query.index;

      //YTPlayerのプレイリストの再生に必要なパラメータをセット
      this.setPlaylistParameters(this.playlistIdUrl, this.indexUrl);
    } else if (this.$route.query.tag) {
      //プレイリスト再生の場合
      //URLのクエリパラメータからプレイリストIDとインデックスを取得
      this.tagIdUrl = this.$route.query.tag;

      //YTPlayerのタグの再生に必要なパラメータをセット
      await this.setIndivisualParameters(this.tagIdUrl);
    }

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player("player", {
        width: "560",
        height: "315",
        videoId: this.currentYoutubeId,
        playerVars: {
          start: this.convertToSec(this.formatToMinSec(this.startHis)),
          end: this.convertToSec(this.formatToMinSec(this.endHis))
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };

    window.onPlayerReady = event => {
      event.target.mute();
      event.target.playVideo();
      this.isPlayerReady = true;

      //1秒毎に現在の再生時間を取得
      setInterval(function() {
        self.currentTime = self.convertToSec(
          self.formatTime(event.target.getCurrentTime())
        );
      }, 1000);
    };

    window.onPlayerStateChange = event => {
      if (event.data == YT.PlayerState.ENDED && this.isPlaying) {
        //フラグを停止中に反転
        this.isPlaying = !this.isPlaying;

        //プレイリスト再生の場合
        if (this.$route.query.playlist) {
          if (this.indexUrl < this.watchList.length - 1) {
            // //最後のシーンでない場合は次のシーンのパラメータをセット
            this.playPlaylist(this.playlistIdUrl, ++this.indexUrl);
          } else if (this.indexUrl == this.watchList.length - 1) {
            //最後のシーンの場合は先頭に戻る
            this.indexUrl = 0;
            this.playPlaylist(this.playlistIdUrl, this.indexUrl);
          }
        }

        //特定シーン再生の場合
        if (this.$route.query.tag) {
          //現在と同じシーンをリピート
          this.playSpecificScene(this.tagIdUrl);
        }
      }

      if (event.data == YT.PlayerState.PLAYING) {
        //フラグを再生中にセット
        this.isPlaying = true;
      }
    };

    //プレイリスト再生で戻るor進むが押された場合は画面を再ロード
    let self = this;
    let from = this.$route.path;
    window.addEventListener("popstate", function(e) {
      let to = self.$route.path;
      if (from == "/watch" && to == "/watch") {
        location.reload();
      }
    });
  }
};
</script>
