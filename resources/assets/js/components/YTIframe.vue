<template>
  <div style="position: absolute; width: 100%; height: 100%;">
    <div
      v-for="(item, index) in listOfYoutubeIdStartEndTime"
      v-bind:key="`item.youtubeId-${index}`"
      v-bind:style="{ visibility: index == listIndex ? 'visible' : 'hidden' }"
    >
      <div v-bind:class="`video-placeholder-${index}`"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  data() {
    return {
      playlistIdUrl: "",
      indexUrl: 0,
      timer: null,
      youtubeCallbackName: "onYouTubeIframeAPIReady",
      youtubeExistsFlag: "$isYoutubeFrameAPIReady",
      hasYTFrame: false,
    };
  },
  computed: {
    ...mapGetters({
      listOfYoutubeIdStartEndTime: "ytPlayer/listOfYoutubeIdStartEndTime",
      listIndex: "ytPlayer/listIndex",
      youtubeId: "ytPlayer/youtubeId",
      startHis: "ytPlayer/start",
      endHis: "ytPlayer/end",
      isPlaying: "ytPlayer/isPlaying",
      playerArray: "ytPlayer/playerArray",
      player: "ytPlayer/player",
      isMuted: "ytPlayer/isMuted",
      isEditing: "tagging/isEditing",
    }),
    startIs() {
      return this.formatToMinSec(this.startHis);
    },
    endIs() {
      return this.formatToMinSec(this.endHis);
    },
  },

  mixins: [myMixin],
  methods: {
    ...mapMutations({
      setListIndex: "ytPlayer/setListIndex",
      setIsPlayerReady: "ytPlayer/setIsPlayerReady",
      setIsPlaying: "ytPlayer/setIsPlaying",
      clearPlayerArray: "ytPlayer/clearPlayerArray",
      setPlayerArray: "ytPlayer/setPlayerArray",
      setIsMuted: "ytPlayer/setIsMuted",
    }),
    startTimer() {
      let self = this;
      if (this.timer) clearInterval(this.timer);

      this.timer = setInterval(function() {
        //currentTimeを「分:秒」にフォーマットしてyoutubeストアにセット
        self.$store.commit(
          "youtube/setCurrentTime",
          self.formatTime(self.player.getCurrentTime())
        );
      });
    },
    unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    hasYoutubeFrameAPI() {
      if (!this.hasYTFrame) {
        this.hasYTFrame = !!document.getElementsByClassName(".yt-frame-api")
          .length;
      }
      return this.hasYTFrame;
    },
    injectYoutubeFrameAPI() {
      const youtubeExistsFlag = this.youtubeExistsFlag;
      const youtubeCallbackName = this.youtubeCallbackName;

      window[this.youtubeCallbackName] = function() {
        window[youtubeExistsFlag] = true;
        window[youtubeCallbackName] = null;
        delete window[youtubeCallbackName];
      };

      var tag = document.createElement("script");
      var first = document.getElementsByTagName("script")[0];
      tag.src =
        "https://www.youtube.com/iframe_api?" + parseInt(new Date() / 1000);
      tag.defer = true;
      tag.className = "yt-frame-api";
      first.parentNode.insertBefore(tag, first);
    },
    whenYoutubeAPIReady() {
      const existsFlag = this.youtubeExistsFlag;
      return new Promise(function(resolve, reject) {
        let elapsed = 0;
        let intervalHandle;
        let checker = function() {
          elapsed += 48;
          if (!!window[existsFlag]) {
            clearTimeout(intervalHandle);
            resolve();
          } else {
            if (elapsed <= 15000) {
              intervalHandle = setTimeout(checker, 48);
            } else {
              reject("timeout");
            }
          }
        };

        setTimeout(checker, 48);
      });
    },
  },
  watch: {
    //シーン切替時のlistIndexセット
    $route() {
      this.indexUrl = this.$route.query.index;
      this.setListIndex(this.$route.query.index);
    },
  },
  async mounted() {
    //Durationデータの取得のための処理
    this.$store.commit("youtube/setYoutubeId", this.youtubeId);
    await this.$store.dispatch("youtube/getVideo", this.youtubeId);

    let self = this;
    if (!this.hasYoutubeFrameAPI()) {
      this.injectYoutubeFrameAPI();
    }
    this.whenYoutubeAPIReady().then(
      () => {
        //プレイヤーをリセット
        self.clearPlayerArray();

        this.listOfYoutubeIdStartEndTime.forEach((item, index) => {
          let playerId =
            "player-" +
            Math.floor(Math.random() * 1024) +
            Date.now() +
            Math.floor(Math.random() * 1024);
          $("div.video-placeholder-" + index).attr("id", playerId);

          let YTPLayer = new YT.Player(playerId, {
            width: "560",
            height: "315",
            videoId: item.youtubeId,
            playerVars: {
              start: this.startHis
                ? this.convertToSec(this.formatToMinSec(item.start))
                : "",
              end: this.endHis
                ? this.convertToSec(this.formatToMinSec(item.end))
                : "",
              playsinline: 1,
              autoplay: 1,
              iv_load_policy: 3, //アノテーション非表示
              modestbranding: 1, //YouTubeロゴ非表示
              rel: 0, //関連動画非表示
              controls: 0, //プレイーコントロールを非表示
              fs: 0, //全画面表示ボタンを非表示
              modestbranding: 1, //YouTubeロゴ非表示
              enablejsapi: 1, //postMessageを有効にするのに必要
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
            },
          });

          //playerインスタンスをytPlayerControllerストアに格納
          self.setPlayerArray(YTPLayer);
        });
      },
      (error) => console.error(error)
    );

    window.onPlayerReady = (event) => {
      self.setIsMuted(true);
      event.target.mute();
      event.target.playVideo();
      self.setIsPlayerReady(true);
      self.startTimer();
    };

    window.onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.ENDED && this.isPlaying) {
        //フラグを停止中に反転
        this.$store.commit("ytPlayer/setIsPlaying", false);
        if (this.isEditing || this.listOfYoutubeIdStartEndTime.length == 1) {
          //現在と同じシーンをリピート(開始時間に戻る)
          this.player.seekTo(this.convertToSec(this.startIs));
        } else if (this.listOfYoutubeIdStartEndTime.length > 1) {
          //まとめ再生の場合
          if (this.listIndex < this.listOfYoutubeIdStartEndTime.length - 1) {
            // 最後のシーンでない場合は、現在のプレイヤーを停止し、次のシーンのパラメータとプレイヤーをセット
            this.$emit("switchToPlayListIndexOf", Number(this.listIndex) + 1);
          } else if (
            this.listIndex >=
            this.listOfYoutubeIdStartEndTime.length - 1
          ) {
            //最後のシーンの場合は現在のプレイヤーを停止し、先頭に戻る
            this.$emit("switchToPlayListIndexOf", 0);
          }
        }
      }

      if (event.data == YT.PlayerState.PLAYING) {
        //フラグを再生中にセット
        this.$store.commit("ytPlayer/setIsPlaying", true);
        if (!self.isMuted) {
          self.mute();
          self.unmute();
        }

        //選択されたシーン以外のプレイヤーは停止
        if (event.target.m.classList.value != self.player.m.classList.value) {
          event.target.pauseVideo();
        }
      }

      if (event.data == YT.PlayerState.ENDED) {
        //フラグを再生中にセット
        this.$store.commit("ytPlayer/setIsPlaying", false);
      }
    };
  },
  beforeDestroy() {
    this.setIsPlayerReady(false);
    clearInterval(this.timer);
  },
};
</script>
