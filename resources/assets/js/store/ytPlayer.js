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
  isSwitchingScene: false,
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
  currentDisplayingTimeInSecOfWatch: "",
  durationInSecOfWatch: "",
  timer: null,
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
  isSwitchingScene: (state) => state.isSwitchingScene,
  playSpeed: (state) => state.playSpeed,
  listOfYoutubeIdStartEndTime: (state) => state.listOfYoutubeIdStartEndTime,
  listIndex: (state) => state.listIndex,
  isPortraitScreen: (state) => state.isPortraitScreen,
  showSeekbar: (state) => state.showSeekbar,
  immediateHideFlag: (state) => state.immediateHideFlag,
  isFadingOut: (state) => state.isFadingOut,
  currentDisplayingTimeInSecOfWatch: (state) =>
    state.currentDisplayingTimeInSecOfWatch,
  durationInSecOfWatch: (state) => state.durationInSecOfWatch,
  timer: (state) => state.timer,
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
  setIsSwitchingScene(state, data) {
    state.isSwitchingScene = data;
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
  setCurrentDisplayingTimeInSecOfWatch(state, data) {
    state.currentDisplayingTimeInSecOfWatch = data;
  },
  setDurationInSecOfWatch(state, data) {
    state.durationInSecOfWatch = data;
  },
  setTimer(state, data) {
    state.timer = data;
  },
};

const actions = {
  playListIndexOf(context, index) {
    context.commit("setIsSwitchingScene", true);

    //現在のプレイヤーを先頭に戻して一時停止
    context.getters["player"].seekTo(
      myMixin.methods.convertToSec(
        myMixin.methods.formatToMinSec(context.getters["start"])
      )
    );
    context.getters["player"].pauseVideo();

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
    if (context.getters["isPlaying"]) context.getters["player"].playVideo();
    setTimeout(() => {
      //同じyoutubeIdの最初のシーンが一瞬流れるためその間はタイマーが作動しないようにする
      context.commit("setIsSwitchingScene", false);
    }, 400);
  },
  startTimer(context) {
    context.dispatch("clearTimer");

    let timer = setInterval(function() {
      //currentTimeを「分:秒」にフォーマットしてyoutubeストアにセット
      if (
        context.getters["player"] &&
        typeof context.getters["player"].getCurrentTime == "function" &&
        !context.getters["isSwitchingScene"]
      )
        context.commit(
          "youtube/setCurrentTime",
          myMixin.methods.formatTime(
            context.getters["player"].getCurrentTime()
          ),
          {
            root: true,
          }
        );

      if (
        context.getters["isWatchingPlaylist"] &&
        context.getters["player"] &&
        typeof context.getters["player"].getCurrentTime == "function" &&
        context.getters["start"] &&
        !context.getters["isSwitchingScene"]
      ) {
        let currentDisplayingTimeInSec =
          myMixin.methods.convertToSec(
            myMixin.methods.formatTime(
              context.getters["player"].getCurrentTime()
            )
          ) -
          myMixin.methods.convertToSec(
            myMixin.methods.formatToMinSec(context.getters["start"])
          );

        // sum previous scene durations
        for (var i = 0; i < context.getters["listIndex"]; i++) {
          currentDisplayingTimeInSec =
            currentDisplayingTimeInSec +
            myMixin.methods.convertToSec(
              myMixin.methods.formatToMinSec(
                context.getters["listOfYoutubeIdStartEndTime"][i].duration
              )
            );
        }

        context.commit(
          "setCurrentDisplayingTimeInSecOfWatch",
          currentDisplayingTimeInSec
        );
      }
    });
    context.commit("setTimer", timer);
  },
  clearTimer(context) {
    if (context.getters["timer"]) clearInterval(context.getters["timer"]);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
