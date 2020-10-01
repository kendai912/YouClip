import axios from "axios";
import { OK, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  playlistAndTagVideoData: null,
  tagAndVideoData: null,
  watchList: null,
  listIndex: 0,
  playlistId: "",
  playlistName: "",
  playlistViewCount: "",
  privacySetting: "",
  tagPrivacySetting: "",
  currentYoutubeId: "",
  currentTagId: "",
  start: "",
  end: "",
  playSpeed: 1,
};

const getters = {
  playlistAndTagVideoData: (state) => state.playlistAndTagVideoData,
  tagAndVideoData: (state) => state.tagAndVideoData,
  watchList: (state) => state.watchList,
  listIndex: (state) => state.listIndex,
  playlistId: (state) => state.playlistId,
  playlistName: (state) => state.playlistName,
  playlistViewCount: (state) => state.playlistViewCount,
  privacySetting: (state) => state.privacySetting,
  currentYoutubeId: (state) => state.currentYoutubeId,
  currentTagId: (state) => state.watchList[state.listIndex].tag_id,
  currentTagName: (state) =>
    state.watchList ? state.watchList[state.listIndex].tags : "",
  currentTagNameArray: (state, getters) =>
    state.watchList ? getters.currentTagName.split(/::/) : "",
  tagPrivacySetting: (state) =>
    state.watchList ? state.watchList[state.listIndex].privacySetting : "",
  currentTitle: (state) =>
    state.watchList ? state.watchList[state.listIndex].title : "",
  currentCategory: (state) =>
    state.watchList ? state.watchList[state.listIndex].category : "",
  start: (state) => state.start,
  end: (state) => state.end,
  isPlaylist: (state) => (state.playlistId ? true : false),
  playSpeed: (state) => state.playSpeed,
};

const mutations = {
  //プレイリストの再生に必要なパラメータをセット
  setYTPlaylistParameters(state, index) {
    //watchlistにコンテンツをセット
    state.watchList = state.playlistAndTagVideoData.tagVideoData;

    //watchlistの中のindexをセット
    state.listIndex = index;

    //watchlistのlistIndexのデータを再生関連パラメーターにセット
    mutations.setYTPlayerParameters(state);
  },
  //シーンタグの再生に必要なパラメータをセット
  setYTIndivisualParameters(state) {
    //watchlistにコンテンツをセット
    state.watchList = state.tagAndVideoData;

    //シーンタグの場合はindexはデフォルトで0
    state.listIndex = 0;

    //watchlistのlistIndexのデータを再生関連パラメーターにセット
    mutations.setYTPlayerParameters(state);
  },
  setYTPlayerParameters(state) {
    //YTPlayerに必要なYoutubeIDをセット
    state.currentYoutubeId = state.watchList[state.listIndex].youtubeId;
    //YTPlayerに必要なstartをセット
    state.start = state.watchList[state.listIndex].start;
    //YTPlayerに必要なendをセット
    state.end = state.watchList[state.listIndex].end;
  },
  setPlaylistAndTagVideoData(state, data) {
    state.playlistAndTagVideoData = data;
  },
  setTagAndVideoData(state, data) {
    state.tagAndVideoData = data;
  },
  setPlaylistId(state, data) {
    state.playlistId = data;
  },
  setPlaylistName(state, data) {
    state.playlistName = data;
  },
  setPlaylistViewCount(state, data) {
    state.playlistViewCount = data;
  },
  setPrivacySetting(state, data) {
    state.privacySetting = data;
  },
  setCurrentYoutubeId(state, data) {
    state.currentYoutubeId = data;
  },
  setCurrentTagId(state, data) {
    state.currentTagId = data;
  },
  setPlaySpeed(state, data) {
    state.playSpeed = data;
  },
};

const actions = {
  async getPlaylistAndTagVideoDataById(context, playlistId) {
    const response = await axios.get(
      "api/get/playlistAndTagVideoData?id=" + playlistId
    );
    if (response.status == OK) {
      // 成功した時
      context.commit(
        "setPlaylistAndTagVideoData",
        response.data.playlistAndTagVideoData
      );
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else if (response.status == FORBIDDEN) {
      // 非公開データのため失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async getTagAndVideoDataById(context, tagId) {
    const response = await axios.get("api/get/tagAndVideoData?id=" + tagId);
    if (response.status == OK) {
      // 成功した時
      context.commit("setTagAndVideoData", response.data.tagAndVideoData);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else if (response.status == FORBIDDEN) {
      // 非公開データのため失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
