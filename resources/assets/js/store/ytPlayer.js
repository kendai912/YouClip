import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import store from "../store";
import myMixin from "../util";

const state = {
  playerArray: [],
  isMuted: true,
  isFullscreen: false,
  isPlayerReady: false,
  isPlaying: true,
  isWatchingPlaylist: false,
  playSpeed: 1,
  listOfYoutubeIdStartEndTime: "",
  listIndex: 0,
  youtubeId: "",
  start: "",
  end: "",
  isPortraitScreen: true,
  showSeekbar: true,
  immediateHideFlag: false,
  isFadingOut: false,
};

const getters = {
  playerArray: (state) => state.playerArray,
  player: (state) =>
    state.playerArray[
      state.listOfYoutubeIdStartEndTime[state.listIndex].youtubeId
    ],
  isMuted: (state) => state.isMuted,
  isFullscreen: (state) => state.isFullscreen,
  isPlayerReady: (state) => state.isPlayerReady,
  isPlaying: (state) => state.isPlaying,
  isWatchingPlaylist: (state) => state.isWatchingPlaylist,
  playSpeed: (state) => state.playSpeed,
  listOfYoutubeIdStartEndTime: (state) => state.listOfYoutubeIdStartEndTime,
  listIndex: (state) => state.listIndex,
  isPortraitScreen: (state) => state.isPortraitScreen,
  showSeekbar: (state) => state.showSeekbar,
  immediateHideFlag: (state) => state.immediateHideFlag,
  isFadingOut: (state) => state.isFadingOut,
  youtubeId: (state) =>
    state.listOfYoutubeIdStartEndTime
      ? state.listOfYoutubeIdStartEndTime[state.listIndex].youtubeId
      : "",
  start: (state) =>
    state.listOfYoutubeIdStartEndTime
      ? state.listOfYoutubeIdStartEndTime[state.listIndex].start
      : "",
  end: (state) =>
    state.listOfYoutubeIdStartEndTime
      ? state.listOfYoutubeIdStartEndTime[state.listIndex].end
      : "",
};

const mutations = {
  clearPlayerArray(state) {
    state.playerArray = [];
  },
  setPlayerArray(state, data) {
    state.playerArray[data.youtubeId] = data.YTPlayer;
  },
  setIsMuted(state, data) {
    state.isMuted = data;
  },
  setIsFullscreen(state, data) {
    state.isFullscreen = data;
  },
  setIsPlayerReady(state, data) {
    state.isPlayerReady = data;
  },
  setIsPlaying(state, data) {
    state.isPlaying = data;
  },
  setIsWatchingPlaylist(state, data) {
    state.isWatchingPlaylist = data;
  },
  setPlaySpeed(state, data) {
    state.playSpeed = data;
  },
  setListOfYoutubeIdStartEndTime(state, data) {
    state.listOfYoutubeIdStartEndTime = data;
  },
  setListIndex(state, data) {
    state.listIndex = data;
  },
  setIsPortraitScreen(state, data) {
    state.isPortraitScreen = data;
  },
  setShowSeekbar(state, data) {
    state.showSeekbar = data;
  },
  setImmediateHideFlag(state, data) {
    state.immediateHideFlag = data;
  },
  setIsFadingOut(state, data) {
    state.isFadingOut = data;
  },
};

const actions = {
  playListIndexOf(context, index) {
    //現在のプレイヤーを先頭に戻して一時停止
    context.getters["player"].seekTo(
      myMixin.methods.convertToSec(
        myMixin.methods.formatToMinSec(context.getters["start"])
      )
    );
    context.getters["player"].pauseVideo();
    context.commit("setIsPlaying", false);

    //場面インデックスおよびプレイヤーを変更
    context.commit("setListIndex", index);

    //Durationデータの取得のための処理
    context.commit("youtube/setYoutubeId", context.getters["youtubeId"], {
      root: true,
    });
    context.dispatch("youtube/getVideo", context.getters["youtubeId"], {
      root: true,
    });

    //次のシーンの開始時間をセット
    context.getters["player"].seekTo(
      myMixin.methods.convertToSec(
        myMixin.methods.formatToMinSec(context.getters["start"])
      )
    );

    //音設定
    if (context.getters["isMuted"]) {
      context.getters["player"].mute();
    } else {
      context.getters["player"].mute();
      context.getters["player"].unMute();
    }

    //倍速設定
    context.getters["player"].setPlaybackRate(
      parseFloat(context.getters["playSpeed"])
    );

    //再生
    context.getters["player"].playVideo();
    context.commit("setIsPlaying", true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
