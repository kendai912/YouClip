<template>
  <div class="container--small">
    <h1>Youtube tagging</h1>
    <div id="player"></div>
    <div>
      <TagItem />
    </div>
    <div>
      <TimeControl />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TagItem from "../components/TagItem.vue";
import TimeControl from "../components/TimeControl.vue";
import myMixin from "../util";

export default {
  components: {
    TagItem,
    TimeControl
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      youtubeId: "youtube/youtubeId",
      videoData: "youtube/videoData",
      tagDataArray: "youtube/tagDataArray",
      isNew: "youtube/isNew"
    })
  },
  async created() {
    //必要データを取得するまでTagItemは非表示
    this.$store.commit("youtube/setIsReady", false);

    //URLからyoutubeIdを格納
    let youtubeId = this.$route.query.v;

    //必要データを取得
    this.$store.commit("youtube/setYoutubeId", youtubeId);
    await this.$store.dispatch("youtube/getVideo");
    await this.$store.dispatch("youtube/getTag");
    if (this.isNew) {
      //新規動画・タグの場合はData APIから取得
      await this.$store.dispatch("youtube/getNewVideoData");
    }

    //TagItemを表示に切り替え
    this.$store.commit("youtube/setIsReady", true);

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let self = this;

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player("player", {
        width: "560",
        height: "315",
        videoId: this.youtubeId,
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

      //1秒毎に現在の再生時間を取得しyoutubeストアのcurrentTimeにセット
      setInterval(function() {
        //playerが取得した時間を「分:秒」に整形しcurrentTimeに格納
        let currentTime = self.convertToSec(
          self.formatTime(event.target.getCurrentTime())
        );

        //currentTimeをyoutubeストアにセット
        self.$store.commit("youtube/setCurrentTime", currentTime);
      }, 1000);
    };

    window.onPlayerStateChange = event => {};

    //プレイリスト再生で戻るor進むが押された場合は画面を再ロード
    let from = this.$route.path;
    window.addEventListener("popstate", function(e) {
      let to = self.$route.path;
      if (from == "/youtube" && to == "/youtube") {
        location.reload();
      }
    });
  }
};
</script>
