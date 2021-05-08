<template>
  <div class="iframeWrapper">
    <div
      v-for="(item, index) in listOfYoutubeIdStartEndTime"
      v-bind:key="`item.youtubeId-${index}`"
      class="iframeWrapper"
      v-bind:style="{
        visibility:
          item.youtubeId == youtubeId && item.isFirstSceneOfYouTubeId
            ? 'visible'
            : 'hidden',
      }"
    >
      <div
        v-if="item.isFirstSceneOfYouTubeId"
        v-bind:class="`video-placeholder-${item.youtubeId}`"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  data() {
    return {
      playlistIdUrl: "",
      indexUrl: 0,
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
      isIOS: "ytSeekBar/isIOS",
      isWatchingPlaylist: "ytPlayer/isWatchingPlaylist",
      currentTime: "youtube/currentTime",
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

      window[this.youtubeCallbackName] = function () {
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
      return new Promise(function (resolve, reject) {
        let elapsed = 0;
        let intervalHandle;
        let checker = function () {
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
    unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
  },
  watch: {
    //シーン切替時のlistIndexセット
    $route() {
      this.indexUrl = this.$route.query.index;
      this.setListIndex(this.$route.query.index);
    },
    currentTime() {
      if (this.currentTime == this.endIs) {
        let self = this;
        setTimeout(function () {
          //フラグを停止中に反転
          if (self.isEditing || self.listOfYoutubeIdStartEndTime.length == 1) {
            //現在と同じシーンをリピート(開始時間に戻る)
            self.player.seekTo(self.convertToSec(self.startIs));
          } else if (self.listOfYoutubeIdStartEndTime.length > 1) {
            //まとめ再生の場合
            if (self.listIndex < self.listOfYoutubeIdStartEndTime.length - 1) {
              // 最後のシーンでない場合は、現在のプレイヤーを停止し、次のシーンのパラメータとプレイヤーをセット
              console.log("Next scene");
              self.$emit("switchToPlayListIndexOf", Number(self.listIndex) + 1);
            } else if (
              self.listIndex >=
              self.listOfYoutubeIdStartEndTime.length - 1
            ) {
              console.log("Return to first scene");
              //最後のシーンの場合は現在のプレイヤーを停止し、先頭に戻る
              self.$emit("switchToPlayListIndexOf", 0);
            }
          }
        }, 400);
      }
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

        this.listOfYoutubeIdStartEndTime.forEach((item) => {
          if (item.isFirstSceneOfYouTubeId) {
            let playerId =
              "player-" +
              Math.floor(Math.random() * 1024) +
              Date.now() +
              Math.floor(Math.random() * 1024);
            $("div.video-placeholder-" + item.youtubeId).attr("id", playerId);

            let YTPlayer = new YT.Player(playerId, {
              width: "560",
              height: "315",
              videoId: item.youtubeId,
              playerVars: {
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
            self.setPlayerArray({
              YTPlayer: YTPlayer,
              youtubeId: item.youtubeId,
            });
          }
        });
      },
      (error) => console.error(error)
    );

    window.onPlayerReady = (event) => {
      event.target.mute();
      if (event.target.m.classList.value == self.player.m.classList.value) {
        if (self.startIs) event.target.seekTo(self.convertToSec(self.startIs));
        self.$store.dispatch("ytPlayer/startTimer");
      }
      event.target.playVideo();
      self.setIsPlayerReady(true);
    };

    window.onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.PLAYING) {
        //フラグを再生中にセット
        this.$store.commit("ytPlayer/setIsPlaying", true);

        if (
          !self.isIOS &&
          event.target.m.classList.value != self.player.m.classList.value
        ) {
          event.target.pauseVideo();
        }

        if (
          !self.isMuted &&
          event.target.m.classList.value == self.player.m.classList.value
        ) {
          self.mute();
          self.unmute();
        } else if (
          self.isMuted &&
          event.target.m.classList.value == self.player.m.classList.value
        ) {
          self.mute();
        }
      }

      if (event.data == YT.PlayerState.BUFFERING) {
        //選択されたシーン以外のプレイヤーは停止
        if (
          self.isIOS &&
          event.target.m.classList.value != self.player.m.classList.value
        ) {
          setTimeout(() => {
            event.target.pauseVideo();
          }, 100);
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
