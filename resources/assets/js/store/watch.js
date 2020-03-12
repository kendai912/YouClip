import axios from "axios";

const state = {
  watchList: null,
  listIndex: 0,
  currentPlaylistId: "",
  currentPlaylistName: "",
  currentVideoId: "",
  currentTagId: "",
  start: "",
  end: ""
};

const getters = {
  watchList: state => state.watchList,
  listIndex: state => state.listIndex,
  currentPlaylistId: state => state.currentPlaylistId,
  currentPlaylistName: state => state.currentPlaylistName,
  currentVideoId: state => state.currentVideoId,
  currentTagId: state => state.currentTagId
};

const mutations = {
  setPlaylistParameters(state, playlistTagVideoArray) {
    //watchlistにコンテンツをセット
    state.watchList = playlistTagVideoArray;

    //プレイリストの場合はlistIndexは0からスタート
    state.listIndex = 0;
  },
  setIndivisualParameters(state, indivisualTagVideoArray) {
    //watchlistにコンテンツをセット
    state.watchList = indivisualTagVideoArray;

    //watchlistからクリックしたタグIDのインデックスを検索しlistIndexにセット
    state.listIndex = state.watchList.findIndex(
      ({ tag_id }) => tag_id == state.currentTagId
    );
  },
  setCurrentPlaylistId(state, data) {
    state.currentPlaylistId = data;
  },
  setCurrentPlaylistName(state, data) {
    state.currentPlaylistName = data;
  },
  setCurrentVideoId(state, data) {
    state.currentVideoId = data;
  },
  setCurrentTagId(state, data) {
    state.currentTagId = data;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
