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
      currentTime: ""
    };
  },
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({
      watchList: "watch/watchList",
      listIndex: "watch/listIndex"
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
      //単独タグ再生の場合
      //URLのクエリパラメータからプレイリストIDとインデックスを取得
      let playlistId = this.$route.query.playlist;
      let index = this.$route.query.index;

      //YTPlayerのプレイリストの再生に必要なパラメータをセット
      this.setPlaylistParameters(playlistId, index);
    } else if (this.$route.query.tag) {
      //プレイリスト再生の場合
      //URLのクエリパラメータからプレイリストIDとインデックスを取得
      let currentTagId = this.$route.query.tag;

      //YTPlayerのタグの再生に必要なパラメータをセット
      await this.setIndivisualParameters(currentTagId);
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
        videoId: this.$store.getters["watch/currentYoutubeId"],
        playerVars: {
          start: this.convertToSec(
            this.formatToMinSec(this.$store.getters["watch/start"])
          ),
          end: this.convertToSec(
            this.formatToMinSec(this.$store.getters["watch/end"])
          )
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
      if (event.data == 0) {
        // if (playlist_id != "" && nextVideoId != "" && nextTagId != "") {
        //   window.location.href =
        //     window.axios.defaults.baseURL +
        //     "/video/play/video_id=" +
        //     nextVideoId +
        //     "&tag_id=" +
        //     nextTagId +
        //     "&playlist_id=" +
        //     playlist_id;
        // }
      }
    };
  }
};
</script>
