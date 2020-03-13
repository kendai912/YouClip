<template>
  <div class="container--small">
    <h1>Watch</h1>
    <div id="player"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  data() {
    return {
      currentTime: "",
      playlistId: "",
      index: 0,
      currentTagId: "",
      isPlaying: true
    };
  },
  mixins: [myMixin],
  methods: {
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
        videoId: this.youtubeId,
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
        videoId: this.youtubeId,
        startSeconds: this.convertToSec(this.formatToMinSec(this.startHis)),
        endSeconds: this.convertToSec(this.formatToMinSec(this.endHis))
      });
    }
  },
  computed: {
    ...mapGetters({
      watchList: "watch/watchList",
      listIndex: "watch/listIndex",
      youtubeId: "watch/currentYoutubeId",
      startHis: "watch/start",
      endHis: "watch/end",
      isPlaylist: "watch/isPlaylist"
    })
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
      this.playlistId = this.$route.query.playlist;
      this.index = this.$route.query.index;

      //YTPlayerのプレイリストの再生に必要なパラメータをセット
      this.setPlaylistParameters(this.playlistId, this.index);
    } else if (this.$route.query.tag) {
      //プレイリスト再生の場合
      //URLのクエリパラメータからプレイリストIDとインデックスを取得
      this.currentTagId = this.$route.query.tag;

      //YTPlayerのタグの再生に必要なパラメータをセット
      await this.setIndivisualParameters(this.currentTagId);
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
        videoId: this.youtubeId,
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
      let self = this;
      event.target.mute();
      event.target.playVideo();

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
          if (this.index < this.watchList.length - 1) {
            // //最後のシーンでない場合は次のシーンのパラメータをセット
            this.playPlaylist(this.playlistId, ++this.index);
          } else if (this.index == this.watchList.length - 1) {
            //最後のシーンの場合は先頭に戻る
            this.index = 0;
            this.playPlaylist(this.playlistId, this.index);
          }
        }

        //特定シーン再生の場合
        if (this.$route.query.tag) {
          //現在と同じシーンをリピート
          this.playSpecificScene(this.currentTagId);
        }
      }

      if (event.data == YT.PlayerState.PLAYING) {
        //フラグを再生中にセット
        this.isPlaying = true;
      }
    };
  }
};
</script>
