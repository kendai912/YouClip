<template>
  <div style="height: 100vh; background-color: white">
    <div class="container--small">
      <div class="watch-body" ref="watchBody">
        <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
          <div class="video-placeholder" id="playerWatch"></div>
          <YTPlayerController v-show="isPlayerReady" ref="YTPlayerController" />
          <YTSeekBar
            v-show="isPlayerReady"
            ref="ytSeekBar"
            v-bind:bodyRef="watchBodyRef"
          />
        </div>
        <div v-if="isPlayerReady" class="highlightControllerBody">
          <v-sheet v-if="isPlaylist" class="mx-auto pa-0">
            <v-container class="ma-0 pa-0 pt-2" fluid>
              <v-row class="ma-0 pa-0" align="center">
                <v-col class="ma-2 my-0 pa-0">
                  <span
                    class="home-and-search-result-title"
                    style="font-weight: 400; !important"
                    >{{ playlistName }}</span
                  >
                </v-col>
                <v-col cols="auto" class="ma-2 my-0 pa-0 text-right">
                  <!-- <v-icon class="mdi mdi-chevron-down"></v-icon> -->
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col class="ma-2 my-0 pa-0 grey--text text--darken-3">
                  <span style="font-size: 12px"
                    >{{ playlistViewCount ? playlistViewCount : 0 }}回視聴</span
                  >
                  <span style="font-size: 8px">&nbsp;&#8226;&nbsp;</span>
                  <span style="font-size: 12px">合計{{ totalDuration }}</span>
                  <span style="font-size: 8px">&nbsp;&#8226;&nbsp;</span>
                  <span style="font-size: 12px">{{ playlistCreatedAt }}前</span>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <v-sheet tile class="mx-auto pa-0 px-1">
            <v-row
              class="ma-0 pa-0"
              justify="space-between"
              style="position: relative"
            >
              <v-col class="ma-0 pa-0 text-center">
                <v-bottom-navigation class="bottom_navigation_no_shadow">
                  <v-btn
                    v-on:click="sharePlaylist"
                    class="ma-0 pa-0 narrow-btn"
                  >
                    <span>まとめをシェア</span>
                    <i class="fas fa-share outlined-icon icon-large"></i>
                  </v-btn>
                </v-bottom-navigation>
              </v-col>
              <v-col class="ma-0 pa-0 text-center">
                <v-bottom-navigation class="bottom_navigation_no_shadow">
                  <v-btn
                    v-on:click="toggleLikePlaylist"
                    class="ma-0 pa-0 narrow-btn"
                  >
                    <span>{{ likePlaylistCount }}</span>
                    <i
                      v-if="isLikedPlaylist"
                      class="fas fa-heart isLiked icon-large"
                    ></i>
                    <i
                      v-if="!isLikedPlaylist"
                      class="fas fa-heart outlined-icon icon-large"
                    ></i>
                  </v-btn>
                </v-bottom-navigation>
              </v-col>
              <span
                v-on:click="openOtherActionModal"
                style="
                  position: absolute;
                  top: 10px;
                  right: 14px;
                  font-size: 16px;
                "
              >
                <i class="fas fa-ellipsis-v my-grey-heart"></i>
              </span>
            </v-row>
          </v-sheet>

          <SceneListWatch
            v-if="playlistIdUrl"
            v-bind:mediaItems="sceneListofPlaylist"
            v-on:playPlaylist="playPlaylist"
          />
          <CommentListWatch
            v-if="playlistIdUrl"
            v-bind:mediaItems="commentListofPlaylist"
          />
          <CommentListWatch v-else v-bind:mediaItems="commentListofTag" />
          <NoLoginModal v-if="showLoginModal" />
          <ShareModal v-if="showShareModal" v-bind:player="player" />
          <AddPlaylistModal
            v-if="showAddPlaylistModal"
            v-bind:player="player"
          />
          <OtherActionModal
            v-if="showOtherActionModal"
            v-bind:player="player"
            v-bind:created_user_id="
              playlistIdUrl
                ? playlistAndTagVideoData.user_id
                : tagAndVideoData[0].tag_user_id
            "
            v-on:deleteSucceed="deleteSucceed"
          />
          <PlaySpeedModal v-if="showPlaySpeedModal" v-bind:player="player" />
          <SceneTagControl
            v-if="showSceneTagControl"
            v-bind:player="player"
            v-on:updateSucceed="updateSucceed"
          />
          <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
            {{ text }}
            <v-btn color="blue" text v-on:click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NoLoginModal from "../components/NoLoginModal.vue";
import ShareModal from "../components/ShareModal.vue";
import AddPlaylistModal from "../components/AddPlaylistModal.vue";
import OtherActionModal from "../components/OtherActionModal.vue";
import PlaySpeedModal from "../components/PlaySpeedModal.vue";
import SceneTagControl from "../components/SceneTagControl.vue";
import SceneListWatch from "../components/SceneListWatch.vue";
import CommentListWatch from "../components/CommentListWatch.vue";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import myMixin from "../util";

export default {
  components: {
    NoLoginModal,
    ShareModal,
    AddPlaylistModal,
    OtherActionModal,
    PlaySpeedModal,
    SceneTagControl,
    SceneListWatch,
    CommentListWatch,
    YTPlayerController,
    YTSeekBar,
  },
  data() {
    return {
      playlistIdUrl: "",
      indexUrl: 0,
      tagIdUrl: "",
      isPlayerReady: false,
      isAPIReady: false,
      timer: null,
      mediaItems: [],
      playlistCreatedAt: "",
      totalDuration: "00:00:00",
      snackbar: false,
      timeout: 5000,
      text: "",
      watchBodyRef: this.$refs.watchBody,
      isAndroid: false,
      reloadedFlag: "",
      reloaded: false,
      playerDiv: "",
      newId: "",
      videoId: "79XQBAouHjU",
      youtubeCallbackName: "onYouTubeIframeAPIReady",
      youtubeExistsFlag: "$isYoutubeFrameAPIReady",
      hasYTFrame: false,
    };
  },
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      openShareModal: "shareModal/openShareModal",
      openOtherActionModal: "otherActionModal/openOtherActionModal",
      openPlaySpeedModal: "playSpeedModal/openPlaySpeedModal",
      setListIndex: "watch/setListIndex",
      setIsPlaying: "watch/setIsPlaying",
      setPlayer: "ytPlayerController/setPlayer",
      setIsMuted: "ytPlayerController/setIsMuted",
    }),
    startTimer() {
      let self = this;
      if (this.timer) clearInterval(this.timer);

      this.timer = setInterval(function () {
        //currentTimeを「分:秒」にフォーマットしてyoutubeストアにセット
        self.$store.commit(
          "youtube/setCurrentTime",
          self.formatTime(self.player.getCurrentTime())
        );
      });
    },
    playPlaylist(index) {
      //最後のシーンでない場合は次のシーンのパラメータをセット
      this.$store.commit("watch/setYTPlaylistParameters", index);

      //Durationデータの取得のための処理
      this.$store.commit("youtube/setYoutubeId", this.currentYoutubeId);
      this.$store.dispatch("youtube/getVideo");

      //URLを更新
      this.$router
        .push({
          path: "/watch",
          query: {
            playlist: this.playlistIdUrl,
            index: index,
          },
        })
        .catch((err) => {});

      //次のシーンをロードし再生
      this.player.loadVideoById({
        videoId: this.currentYoutubeId,
        startSeconds: this.convertToSec(this.formatToMinSec(this.startHis)),
        endSeconds: this.convertToSec(this.formatToMinSec(this.endHis)),
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
          "まとめを評価するには、ログインしてください。"
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
          "このシーンをまとめに追加するには、ログインしてください。"
        );
      } else {
        //ログイン済の場合
        //ユーザーが作成したまとめ一覧を取得
        this.$store.dispatch("playlist/getMyCreatedPlaylist");

        //選択されたタグが追加済のユーザーのまとめIDを取得
        await this.$store.dispatch(
          "playlist/getPlaylistIdsOfTag",
          this.currentTagId
        );

        //プレイヤーを一時停止
        this.player.pauseVideo();

        //まとめ追加モーダルを表示
        this.$store.commit("playlist/openAddPlaylistModal");
      }
    },
    //リロードした後にシーンタグ更新完了トーストを表示するためのフラグをセッションに格納
    updateSucceed() {
      this.text = "シーンタグを更新しました";
      this.snackbar = true;
    },
    //シーンタグ削除完了のトーストを表示し戻る＆リロード
    deleteSucceed() {
      //削除完了トーストFlagをセッションストレージに保存
      window.sessionStorage.setItem("deleteSuccess", true);
      // ページ遷移後リロード
      this.transitAndReloadAfterDelete();
    },
    //シーンタグ削除後のページ遷移
    transitAndReloadAfterDelete() {
      if (this.$route.query.playlist) {
        //まとめ再生の場合
        if (
          this.watchList.length >= 2 &&
          this.indexUrl == this.watchList.length - 1
        ) {
          //  削除後も他のシーンがあり、かつ一番最後の場合、先頭に戻る
          this.indexUrl = 0;
          this.playPlaylist(this.indexUrl);
        } else if (this.watchList.length < 2) {
          // 削除後に他のシーンがない場合、トップページに遷移
          this.$router
            .push({
              path: "/home",
            })
            .catch((err) => {});
        }
      } else if (this.$route.query.tag) {
        //タグ再生の場合、トップページに戻る
        this.$router
          .push({
            path: "/home",
          })
          .catch((err) => {});
      }

      //削除後のデータをリロード
      location.reload();
    },
    unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    gotoFollow() {
      let user_id = this.playlistIdUrl
        ? this.playlistAndTagVideoData.user_id
        : this.tagAndVideoData[0].tag_user_id;
      this.$router
        .push({
          path: "/myfollow",
          query: {
            user_id: user_id,
          },
        })
        .catch((err) => {});
    },
    setYtPlayerCSS() {
      //iframeの縦・横のサイズをセット(縦は952px、横は幅いっぱい)
      $("iframe").width($(".ytPlayerWrapper").width());
      $("iframe").height(952);

      //iframeとseekbarが見える範囲の高さをセットし、iframe上部の黒分が見えないよう上にスライド
      $(".ytPlayerWrapper").css(
        "height",
        ($("iframe").width() * 9) / 16 +
          (952 - ($("iframe").width() * 9) / 16) / 2 +
          15
      );
      $(".ytPlayerWrapper").css(
        "top",
        (($("iframe").height() - ($("iframe").width() * 9) / 16) / 2) * -1
      );

      this.$nextTick(() => {
        //開始・終了ボタンがiframeとseekbarの下に来るようにtopを調整
        $(".highlightControllerBody").css(
          "top",
          ($("iframe").width() * 9) / 16 + 15
        );
      });
    },
    initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);
      this.playlistIdUrl = "";
      this.$store.commit("watch/setPlaylistId", this.playlistIdUrl);

      //タグおよびまとめのLikeデータをロード
      this.$store.dispatch("like/loadTagLike");
      this.$store.dispatch("likePlaylist/loadPlaylistLike");

      //clear all data before loading
      this.clearAllInput();

      //倍速視聴を1倍のリセット
      this.$store.commit("watch/setPlaySpeed", 1);
    },
    clearAllInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", null);
      this.$store.commit("ytSeekBar/setEndTimeInput", null);
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setPrivacySetting", "public");
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

      window[this.youtubeCallbackName] =
        window[this.youtubeCallbackName] ||
        function () {
          window[youtubeExistsFlag] = true;
          window[youtubeCallbackName] = null;
          delete window[youtubeCallbackName];
        };

      var tag = document.createElement("script");
      var first = document.getElementsByTagName("script")[0];
      tag.src = "https://www.youtube.com/iframe_api";
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
  },
  watch: {
    //シーン切替時のlistIndexセット
    $route() {
      this.indexUrl = this.$route.query.index;
      this.setListIndex(this.$route.query.index);
    },
    isPlayerReady() {
      this.isPlayerReady ? this.$refs.ytSeekBar.setYtSeekbarWrapperTop() : "";
    },
    //再生出来ないAndroidの場合は3.5秒後にリロード
    isAPIReady() {
      if (this.isAPIReady) {
        setTimeout(() => {
          if (!this.isPlayerReady && this.isAndroid) {
            // window.location.reload();
          }
        }, 3500);
      }
    },
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      commentListofPlaylist: "playlist/commentListofPlaylist",
      commentListofTag: "tag/commentListofTag",
      watchList: "watch/watchList",
      listIndex: "watch/listIndex",
      currentYoutubeId: "watch/currentYoutubeId",
      currentTitle: "watch/currentTitle",
      currentTagId: "watch/currentTagId",
      startHis: "watch/start",
      endHis: "watch/end",
      tagAndVideoData: "watch/tagAndVideoData",
      isPlaylist: "watch/isPlaylist",
      playlistName: "watch/playlistName",
      playlistViewCount: "watch/playlistViewCount",
      currentTagName: "watch/currentTagName",
      currentTagNameArray: "watch/currentTagNameArray",
      tagPrivacySetting: "watch/tagPrivacySetting",
      showLoginModal: "noLoginModal/showLoginModal",
      messageWhenNotLogined: "noLoginModal/messageWhenNotLogined",
      showShareModal: "shareModal/showShareModal",
      showAddPlaylistModal: "playlist/showAddPlaylistModal",
      showOtherActionModal: "otherActionModal/showOtherActionModal",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
      showSceneTagControl: "tagging/showSceneTagControl",
      isEditing: "tagging/isEditing",
      playSpeed: "watch/playSpeed",
      isPlaying: "watch/isPlaying",
      player: "ytPlayerController/player",
      isMuted: "ytPlayerController/isMuted",
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
    },
    youtubeVideoID() {
      if (this.videoId.indexOf(":/") !== -1) {
        const catcher = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        const res = catcher.exec(this.videoId);
        if (res && res[1]) {
          return res[1];
        }
      }

      return this.videoId;
    },
  },
  async mounted() {
    this.initialize();

    if (this.$route.query.playlist) {
      //特定シーン再生の場合
      //URLのクエリパラメータからまとめIDとインデックスを取得
      this.playlistIdUrl = this.$route.query.playlist;
      this.indexUrl = this.$route.query.index;

      //まとめおよび動画・タグデータを取得
      await this.$store.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        this.playlistIdUrl
      );

      //まとめIDとまとめ名、視聴回数をwatchストアに格納
      this.$store.commit("watch/setPlaylistId", this.playlistIdUrl);
      this.$store.commit(
        "watch/setPlaylistName",
        this.playlistAndTagVideoData.playlistName
      );
      this.$store.commit(
        "watch/setPlaylistViewCount",
        this.playlistAndTagVideoData.play_count
      );

      //Player直下のまとめ情報欄に表示する作成日・合計時間の情報を取得
      this.playlistCreatedAt = this.timeSince(
        this.playlistAndTagVideoData.playlist_created_at
      );
      this.playlistAndTagVideoData.tagVideoData.forEach((tag) => {
        let duration = this.timeMath.sub(tag.end, tag.start);
        this.totalDuration = this.timeMath.sum(this.totalDuration, duration);
      });
      this.totalDuration = this.convertToKanjiTime(
        this.convertToSec(this.totalDuration)
      );

      //シーンリストをセット
      let mediaItems = [];
      this.putTagVideoIntoMediaItems(
        mediaItems,
        this.playlistAndTagVideoData.tagVideoData
      );
      mediaItems.sort((a, b) => (a.scene_order > b.scene_order ? 1 : -1));
      this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);
      this.$store.commit(
        "playlist/setCommentListofPlaylist",
        this.playlistAndTagVideoData.comments
      );
      //YTPlayerのまとめの再生に必要なパラメータをセット
      this.$store.commit("watch/setYTPlaylistParameters", this.indexUrl);
    } else if (this.$route.query.tag) {
      //まとめ再生の場合
      //URLのクエリパラメータからまとめIDとインデックスを取得
      this.tagIdUrl = this.$route.query.tag;

      //動画・タグデータを取得
      await this.$store.dispatch("watch/getTagAndVideoDataById", this.tagIdUrl);
      this.$store.commit(
        "tag/setCommentListofTag",
        this.tagAndVideoData[0].comments
      );
      //YTPlayerのタグの再生に必要なパラメータをセット
      this.$store.commit("watch/setYTIndivisualParameters");
    }

    //Durationデータの取得のための処理
    this.$store.commit("youtube/setYoutubeId", this.currentYoutubeId);
    await this.$store.dispatch("youtube/getVideo");

    let self = this;
    if (!this.hasYoutubeFrameAPI()) {
      this.injectYoutubeFrameAPI();
    }
    this.whenYoutubeAPIReady().then(
      () => {
        let YTPLayer = new YT.Player("playerWatch", {
          width: "560",
          height: "315",
          videoId: this.currentYoutubeId,
          playerVars: {
            start: this.convertToSec(this.formatToMinSec(this.startHis)),
            end: this.convertToSec(this.formatToMinSec(this.endHis)),
            playsinline: 1,
            autoplay: 1,
            iv_load_policy: 3, //アノテーション非表示
            modestbranding: 1, //YouTubeロゴ非表示
            rel: 0, //関連動画非表示
            controls: 0, //プレイーコントロールを非表示
            fs: 0, //全画面表示ボタンを非表示
            iv_load_policy: 3, //動画アノテーションを非表示
            modestbranding: 1, //YouTubeロゴ非表示
            enablejsapi: 1, //postMessageを有効にするのに必要
            html5: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });

        //playerインスタンスをytPlayerControllerストアに格納
        self.setPlayer(YTPLayer);
        self.isAPIReady = true;
      },
      (error) => console.error(error)
    );

    window.onPlayerReady = (event) => {
      self.setIsMuted(true);
      event.target.mute();
      event.target.playVideo();
      self.isPlayerReady = true;

      self.setYtPlayerCSS();

      //0.4秒毎に現在の再生時間を取得しyoutubeストアのcurrentTimeにセット
      self.startTimer();
    };

    window.onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.ENDED && this.isPlaying) {
        //フラグを停止中に反転
        this.$store.commit("watch/setIsPlaying", false);

        if (this.isEditing) {
          //現在と同じシーンをリピート(開始時間に戻る)
          this.player.seekTo(this.convertToSec(this.startIs));
        } else if (this.$route.query.playlist) {
          //まとめ再生の場合
          if (this.indexUrl < this.watchList.length - 1) {
            // //最後のシーンでない場合は次のシーンのパラメータをセット
            this.playPlaylist(++this.indexUrl);
          } else if (this.indexUrl >= this.watchList.length - 1) {
            //最後のシーンの場合は先頭に戻る
            this.indexUrl = 0;
            this.playPlaylist(this.indexUrl);
          }
        }

        //特定シーン再生の場合
        if (this.$route.query.tag) {
          //現在と同じシーンをリピート(開始時間に戻る)
          this.player.seekTo(this.convertToSec(this.startIs));
        }
      }

      if (event.data == YT.PlayerState.PLAYING) {
        //フラグを再生中にセット
        this.$store.commit("watch/setIsPlaying", true);

        if (!self.isMuted) {
          self.mute();
          self.unmute();
        }
      }

      if (event.data == YT.PlayerState.ENDED) {
        //フラグを再生中にセット
        this.$store.commit("watch/setIsPlaying", false);
      }
    };

    this.setYtPlayerCSS();
    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.watchBodyRef = this.$refs.watchBody;
  },
  beforeDestroy() {
    // シーンタグ付けコンポーネントの現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer);

    //ページ起動時にリロードが必要なAndroid用にフラグをリセット
    window.sessionStorage.removeItem("reloadedFlag");
  },
};
</script>
