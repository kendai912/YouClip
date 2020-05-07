<template>
  <div class="container--small">
    <div class="yt-container">
      <div id="player"></div>
    </div>
    <TagItem />
    <SceneTagControl v-bind:player="player" v-on:taggingSucceed="taggingSucceed" />
    <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
      {{ text }}
      <v-btn color="blue" text v-on:click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TagItem from "../components/TagItem.vue";
import SceneTagControl from "../components/SceneTagControl.vue";
import myMixin from "../util";

export default {
  components: {
    TagItem,
    SceneTagControl
  },
  data() {
    return {
      show: true,
      player: null,
      snackbar: false,
      timeout: 5000,
      text: "シーンタグを登録しました"
    };
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
  methods: {
    //シーンタグ完了のトーストを表示
    taggingSucceed() {
      this.snackbar = true;
    }
  },
  async created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

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

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let self = this;

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      self.player = new YT.Player("player", {
        width: "560",
        height: "315",
        videoId: this.youtubeId,
        playerVars: {
          playsinline: 1,
          autoplay: 1,
          iv_load_policy: 3, //アノテーション非表示
          modestbranding: 1, //YouTubeロゴ非表示
          rel: 0, //関連動画非表示
          showinfo: 0 //タイトルやアップロードしたユーザーなどの情報は非表示
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });

      //縦・横のサイズをセット
      $("iframe").width($(".yt-container").width());
      $("iframe").height($(".container--small").height());
    };

    window.onPlayerReady = event => {
      event.target.mute();
      event.target.playVideo();
      this.isPlayerReady = true;

      //0.4秒毎に現在の再生時間を取得しyoutubeストアのcurrentTimeにセット
      setInterval(function() {
        //playerが取得した時間を「分:秒」に整形しcurrentTimeに格納
        let currentTime = self.formatTime(event.target.getCurrentTime());
        //currentTimeをyoutubeストアにセット
        self.$store.commit("youtube/setCurrentTime", currentTime);
      }, 400);

      //TagItemを表示に切り替え
      this.$store.commit("youtube/setIsReady", true);
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
