<template>
  <div style="height: 100vh; background-color: white">
    <div v-if="isFullscreen" class="fullscreenBackground"></div>
    <div class="container--small">
      <div class="watch-body" ref="watchBody">
        <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
          <YTIframe
            v-if="ytIframeParameterReady"
            v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
          />
          <YTPlayerController
            v-show="isPlayerReady"
            ref="YTPlayerController"
            v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
            v-on:setEventListeners="setEventListeners"
          />
          <YTSeekBar
            v-show="isPlayerReady"
            ref="ytSeekBar"
            v-bind:bodyRef="watchBodyRef"
            v-on:fadeInOutController="fadeInOutController"
            v-on:showOnYTSeekBarTouchMove="showOnYTSeekBarTouchMove"
            v-on:hideOnYTSeekBarTouchEnd="hideOnYTSeekBarTouchEnd"
          />
        </div>
        <div
          v-if="isPlayerReady"
          v-show="!isFullscreen"
          class="highlightControllerBody"
        >
          <v-sheet v-if="isPlaylist" class="mx-auto pa-0">
            <v-container class="ma-0 pa-0 pt-2 px-2" fluid>
              <v-row class="ma-0 pa-0" align="center">
                <v-col class="pa-0 pr-2 ma-0 d-flex align-center" cols="auto">
                  <v-avatar class="profile" size="40">
                    <v-img
                      v-if="playlistUserAvatar"
                      v-bind:src="avatarStoragePath + playlistUserAvatar"
                      alt="profile pic"
                    ></v-img>
                    <v-icon v-else style="color:grey;" size="40"
                      >fas fa-user-circle</v-icon
                    >
                  </v-avatar>
                </v-col>
                <v-col class="ma-0 pa-0">
                  <v-row class="pa-0 ma-0">
                    <h1 class="home-and-search-result-title">
                      {{ playlistName }}
                    </h1>
                  </v-row>
                  <v-row class="pa-0 ma-0 home-and-search-result-username">
                    <span class="grey--text text--darken-3 fz-14">
                      {{ playlistUserName }}
                    </span>
                  </v-row>
                </v-col>
                <v-col cols="auto" class="ma-2 my-0 pa-0 text-right">
                  <!-- <v-icon class="mdi mdi-chevron-down"></v-icon> -->
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col class="ma-0 pa-0 pt-1 grey--text text--darken-3">
                  <span style="font-size: 12px"
                    ><span class="reducedDuration">{{
                      totalDurationKanji
                    }}</span>
                    &nbsp;⬅&nbsp;元の動画:&nbsp;合計<span
                      class="originalDuration"
                      >{{ totalYTDurationKanji }}
                    </span></span
                  >
                  <span style="font-size: 8px">&nbsp;&#8226;&nbsp;</span>
                  <span style="font-size: 12px"
                    >{{ playlistViewCount ? playlistViewCount : 0 }}回視聴</span
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
                    v-on:click="toggleLikePlaylist"
                    class="ma-0 pa-0 narrow-btn"
                    style="z-index: 1;"
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
                  <div
                    v-if="likedUsers && likedUsers[3]"
                    class="absoluteCenter"
                  >
                    <v-avatar size="28" class="likedUserAvatar4">
                      <v-img
                        v-bind:src="avatarStoragePath + likedUsers[3].avatar"
                        alt="profile pic"
                      ></v-img>
                    </v-avatar>
                  </div>
                  <div
                    v-if="likedUsers && likedUsers[2]"
                    class="absoluteCenter"
                  >
                    <v-avatar size="28" class="likedUserAvatar3">
                      <v-img
                        v-bind:src="avatarStoragePath + likedUsers[2].avatar"
                        alt="profile pic"
                      ></v-img>
                    </v-avatar>
                  </div>
                  <div
                    v-if="likedUsers && likedUsers[1]"
                    class="absoluteCenter"
                  >
                    <v-avatar size="28" class="likedUserAvatar2">
                      <v-img
                        v-bind:src="avatarStoragePath + likedUsers[1].avatar"
                        alt="profile pic"
                      ></v-img>
                    </v-avatar>
                  </div>
                  <div
                    v-if="likedUsers && likedUsers[0]"
                    class="absoluteCenter"
                  >
                    <v-avatar size="28" class="likedUserAvatar1">
                      <v-img
                        v-bind:src="avatarStoragePath + likedUsers[0].avatar"
                        alt="profile pic"
                      ></v-img>
                    </v-avatar>
                  </div>
                </v-bottom-navigation>
              </v-col>

              <v-col class="ma-0 pa-0 text-center">
                <v-bottom-navigation class="bottom_navigation_no_shadow">
                  <v-btn
                    v-on:click="sharePlaylist"
                    class="ma-0 pa-0 narrow-btn"
                  >
                    <span>シェア</span>
                    <i class="fas fa-share outlined-icon icon-large"></i>
                  </v-btn>
                </v-bottom-navigation>
              </v-col>

              <v-col class="ma-0 pa-0 text-center">
                <v-bottom-navigation class="bottom_navigation_no_shadow">
                  <v-btn
                    v-bind:href="'https://youtube.com/watch?v=' + youtubeId"
                    class="ma-0 pa-0 narrow-btn"
                  >
                    <span>YouTubeで全編再生</span>
                    <i class="fab fa-youtube outlined-icon icon-large"></i>
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
          <!-- <PopularPlaylist v-bind:popularPlaylistItems="popularPlaylistItems" /> -->
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
            "YouTube長時間動画の見所切り抜きサイト、YouClipの「" +
            this.playlistName +
            "」です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きを見ることも可能です。",
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
          content: "https://youclip.app" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: this.playlistName + " - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの「" +
            this.playlistName +
            "」です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きまとめを誰でも簡単に作ることが出来ます。",
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
        {
          rel: "canonical",
          href: "https://youclip.app" + this.$route.fullPath,
        },
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
      totalYTDurationKanji: "",
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
      tagAndVideoData: "watch/tagAndVideoData",
      isPlaylist: "watch/isPlaylist",
      playlistName: "watch/playlistName",
      playlistUserAvatar: "watch/playlistUserAvatar",
      playlistUserName: "watch/playlistUserName",
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
      isFullscreen: "ytPlayer/isFullscreen",
      telopsArray: "telop/telopsArray",
      telopsArrayIndex: "telop/telopsArrayIndex",
      telops: "telop/telops",
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
    likedUsers() {
      return this.$store.getters["likePlaylist/likedUsers"](this.playlistIdUrl);
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
      setShowFooterTour: "onboarding/setShowFooterTour",
      pushOneTelop: "telop/pushOneTelop",
      pushTelops: "telop/pushTelops",
      resetTelops: "telop/resetTelops",
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
    setEventListeners() {
      this.$refs.ytSeekBar.setEventListeners();
    },
    toggleLikePlaylist() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "切り抜きまとめを評価するには、ログインしてください。"
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

      this.$store.commit("ytPlayer/setIsWatchingPlaylist", true);
    },
    clearAllInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", null);
      this.$store.commit("ytSeekBar/setEndTimeInput", null);
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setPrivacySetting", "public");
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

    //視聴回数をインクリメント
    this.$store.dispatch("playlist/addPlaylistVisitCount", this.playlistIdUrl);

    //まとめおよび動画・タグデータを取得
    await this.$store.dispatch(
      "watch/getPlaylistAndTagVideoDataById",
      this.playlistIdUrl
    );

    //まとめID、まとめ名、アバター、ユーザー名、視聴回数をwatchストアに格納
    this.$store.commit("watch/setPlaylistId", this.playlistIdUrl);
    this.$store.commit(
      "watch/setPlaylistName",
      this.playlistAndTagVideoData.playlistName
    );
    this.$store.commit(
      "watch/setPlaylistUserAvatar",
      this.playlistAndTagVideoData.user.avatar
    );
    this.$store.commit(
      "watch/setPlaylistUserName",
      this.playlistAndTagVideoData.user.name
    );
    this.$store.commit(
      "watch/setPlaylistViewCount",
      this.playlistAndTagVideoData.play_count
    );

    //Player直下のまとめ情報欄に表示する視聴回数・作成日・合計時間の情報を取得
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
    this.totalYTDurationKanji = this.convertToKanjiTime(
      this.playlistAndTagVideoData.playlist_total_duration
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
    this.addFirstSceneOfYouTubeIdFlg(listOfYoutubeIdStartEndTime);
    this.$store.commit(
      "ytPlayer/setListOfYoutubeIdStartEndTime",
      listOfYoutubeIdStartEndTime
    );
    this.$store.commit("ytPlayer/setListIndex", this.indexUrl);
    this.ytIframeParameterReady = true;

    //Telopに必要なパラメータをセット
    this.resetTelops();
    this.playlistAndTagVideoData.tagVideoData.forEach((item) => {
      this.pushTelops(item.telops);
    });

    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.watchBodyRef = this.$refs.watchBody;

    // //人気の切り抜きデータをロード
    // await this.$store.dispatch("watch/loadPopularPlaylist", this.playlistIdUrl);

    // //人気の切り抜きデータをセット
    // let popularPlaylistItems = [];
    // this.setPopularPlaylistItems(popularPlaylistItems, this.popularPlaylist);

    let notShowBoarding = JSON.parse(localStorage.getItem("notShowBoarding"));
    if (!notShowBoarding) {
      this.setShowFooterTour(true);
    }
  },
  beforeDestroy() {
    this.$store.commit("ytPlayer/setIsWatchingPlaylist", false);
  },
};
</script>
