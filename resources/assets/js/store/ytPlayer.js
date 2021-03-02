import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import myMixin from "../util";

const state = {
  player: null,
  isMuted: true,
  isFullscreen: false,
  isPlayerReady: false,
  isPlaying: true,
  playSpeed: 1,
  listOfYoutubeIdStartEndTime: "",
  listIndex: 0,
  youtubeId: null,
  start: "",
  end: "",
};

const getters = {
  player: (state) => state.player,
  isMuted: (state) => state.isMuted,
  isFullscreen: (state) => state.isFullscreen,
  isPlayerReady: (state) => state.isPlayerReady,
  isPlaying: (state) => state.isPlaying,
  playSpeed: (state) => state.playSpeed,
  listOfYoutubeIdStartEndTime: (state) => state.listOfYoutubeIdStartEndTime,
  listIndex: (state) => state.listIndex,
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
  setPlayer(state, data) {
    state.player = data;
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
  setPlaySpeed(state, data) {
    state.playSpeed = data;
  },
  setListOfYoutubeIdStartEndTime(state, data) {
    state.listOfYoutubeIdStartEndTime = data;
  },
  setListIndex(state, data) {
    state.listIndex = data;
  },
};

const actions = {
  playListIndexOf(context, index) {
    //場面インデックスを変更
    context.commit("setListIndex", index);

    //Durationデータの取得のための処理
    context.commit("youtube/setYoutubeId", context.getters["youtubeId"], {
      root: true,
    });
    context.dispatch("youtube/getVideo", context.getters["youtubeId"], {
      root: true,
    });

    //次のシーンをロードし再生
    context.state.player.loadVideoById({
      videoId: context.getters["youtubeId"],
      startSeconds: myMixin.methods.convertToSec(
        myMixin.methods.formatToMinSec(context.getters["start"])
      ),
      endSeconds: myMixin.methods.convertToSec(
        myMixin.methods.formatToMinSec(context.getters["end"])
      ),
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
