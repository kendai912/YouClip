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
  playlistCategory: "",
  tagPrivacySetting: "",
  currentTagId: "",
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
  playlistCategory: (state) => state.playlistCategory,
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
  isPlaylist: (state) => (state.playlistId ? true : false),
};

const mutations = {
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
  setPlaylistCategory(state, data) {
    state.playlistCategory = data;
  },
  setCurrentTagId(state, data) {
    state.currentTagId = data;
  },
  setListIndex(state, data) {
    state.listIndex = data;
  },
};

const actions = {
  async getPlaylistAndTagVideoDataById(context, playlistId) {
    const response = await axios.get(
      "/api/get/playlistAndTagVideoData?id=" + playlistId
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
    const response = await axios.get("/api/get/tagAndVideoData?id=" + tagId);
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
