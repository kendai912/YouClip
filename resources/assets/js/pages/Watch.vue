<template>
  <div style="height: 100vh; background-color: white">
    <div class="container--small">
      <div class="watch-body" ref="watchBody">
        <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
          <YTIframe
            v-if="ytIframeParameterReady"
            v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
          />
          <YTPlayerController v-show="isPlayerReady" ref="YTPlayerController" />
          <YTSeekBar
            v-show="isPlayerReady"
            ref="ytSeekBar"
            v-bind:bodyRef="watchBodyRef"
            v-on:fadeInOutController="fadeInOutController"
            v-on:showOnYTSeekBarTouchMove="showOnYTSeekBarTouchMove"
            v-on:hideOnYTSeekBarTouchEnd="hideOnYTSeekBarTouchEnd"
          />
        </div>
        <div v-if="isPlayerReady" class="highlightControllerBody">
          <v-sheet v-if="isPlaylist" class="mx-auto pa-0">
            <v-container class="ma-0 pa-0 pt-2" fluid>
              <v-row class="ma-0 pa-0" align="center">
                <v-col class="ma-2 my-0 pa-0">
                  <h1
                    class="home-and-search-result-title"
                    style="font-weight: 400; !important"
                  >
                    {{ playlistName }}
                  </h1>
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
                  <span style="font-size: 12px"
                    >合計{{ totalDurationKanji }}</span
                  >
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
            v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
          />
          <CommentListWatch v-bind:mediaItems="commentListofPlaylist" />
          <NoLoginModal v-if="showLoginModal" />
          <ShareModal v-if="showShareModal" v-bind:player="player" />
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
import OtherActionModal from "../components/OtherActionModal.vue";
import PlaySpeedModal from "../components/PlaySpeedModal.vue";
import SceneListWatch from "../components/SceneListWatch.vue";
import CommentListWatch from "../components/CommentListWatch.vue";
import YTIframe from "../components/YTIframe";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title: this.playlistName + " - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipの「" +
            this.playlistName +
            "」です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。",
        },
        {
          property: "og:site_name",
          content: "YouClip",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://youclip.jp" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: this.playlistName + " - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipの「" +
            this.playlistName +
            "」です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。",
        },
        {
          property: "og:image",
          content: this.sceneListofPlaylist
            ? "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/thumbs/" +
              this.sceneListofPlaylist[0].preview
            : "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.jp" + this.$route.fullPath },
      ],
    };
  },
  components: {
    NoLoginModal,
    ShareModal,
    OtherActionModal,
    PlaySpeedModal,
    SceneListWatch,
    CommentListWatch,
    YTIframe,
    YTPlayerController,
    YTSeekBar,
  },
  data() {
    return {
      ytIframeParameterReady: false,
      playlistIdUrl: "",
      indexUrl: 0,
      mediaItems: [],
      playlistCreatedAt: "",
      totalDuration: "00:00:00",
      totalDurationKanji: "",
      snackbar: false,
      timeout: 5000,
      text: "",
      watchBodyRef: this.$refs.watchBody,
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      commentListofPlaylist: "playlist/commentListofPlaylist",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      currentYoutubeId: "watch/currentYoutubeId",
      tagAndVideoData: "watch/tagAndVideoData",
      isPlaylist: "watch/isPlaylist",
      playlistName: "watch/playlistName",
      playlistViewCount: "watch/playlistViewCount",
      showLoginModal: "noLoginModal/showLoginModal",
      messageWhenNotLogined: "noLoginModal/messageWhenNotLogined",
      showShareModal: "shareModal/showShareModal",
      showAddPlaylistModal: "playlist/showAddPlaylistModal",
      showOtherActionModal: "otherActionModal/showOtherActionModal",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
      isEditing: "tagging/isEditing",
      youtubeId: "ytPlayer/youtubeId",
      isPlayerReady: "ytPlayer/isPlayerReady",
      isPlaying: "ytPlayer/isPlaying",
      startHis: "ytPlayer/start",
      endHis: "ytPlayer/end",
      playSpeed: "ytPlayer/playSpeed",
      player: "ytPlayer/player",
      isMuted: "ytPlayer/isMuted",
    }),
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
  },
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      openShareModal: "shareModal/openShareModal",
      openOtherActionModal: "otherActionModal/openOtherActionModal",
      openPlaySpeedModal: "playSpeedModal/openPlaySpeedModal",
      setListIndex: "watch/setListIndex",
      setPlayer: "ytPlayer/setPlayer",
      setIsMuted: "ytPlayer/setIsMuted",
    }),
    switchToPlayListIndexOf(index) {
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
      this.$store.dispatch("ytPlayer/playListIndexOf", index);
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
    unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    // gotoFollow() {
    //   let user_id = this.playlistIdUrl
    //     ? this.playlistAndTagVideoData.user_id
    //     : this.tagAndVideoData[0].tag_user_id;
    //   this.$router
    //     .push({
    //       path: "/myfollow",
    //       query: {
    //         user_id: user_id,
    //       },
    //     })
    //     .catch((err) => {});
    // },
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
      this.$store.commit("ytPlayer/setPlaySpeed", 1);
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
        function() {
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
    convertToISOString(uploadedAt) {
      let date = new Date(
        uploadedAt.substring(0, 4),
        uploadedAt.substring(5, 7) - 1,
        uploadedAt.substring(8, 10)
      );

      return date.toISOString();
    },
    fadeInOutController() {
      this.$refs.YTPlayerController.fadeInOutController();
    },
    showOnYTSeekBarTouchMove() {
      this.$refs.YTPlayerController.showOnYTSeekBarTouchMove();
    },
    hideOnYTSeekBarTouchEnd() {
      this.$refs.YTPlayerController.hideOnYTSeekBarTouchEnd();
    },
  },
  watch: {
    isPlayerReady() {
      if (this.isPlayerReady) {
        this.setYtPlayerCSS();
        this.$refs.ytSeekBar.setYtSeekbarWrapperTop();
      }
    },
  },
  async created() {
    this.initialize();

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
    this.totalDurationKanji = this.convertToKanjiTime(
      this.convertToSec(this.totalDuration)
    );

    //場面リストをセット
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
    let listOfYoutubeIdStartEndTime = [];
    this.putTagVideoIntolistOfYoutubeIdStartEndTime(
      listOfYoutubeIdStartEndTime,
      this.playlistAndTagVideoData.tagVideoData
    );
    listOfYoutubeIdStartEndTime.sort((a, b) =>
      a.scene_order > b.scene_order ? 1 : -1
    );
    this.$store.commit(
      "ytPlayer/setListOfYoutubeIdStartEndTime",
      listOfYoutubeIdStartEndTime
    );
    this.$store.commit("ytPlayer/setListIndex", this.indexUrl);
    this.ytIframeParameterReady = true;

    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.watchBodyRef = this.$refs.watchBody;
  },
};
</script>
