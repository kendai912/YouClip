import axios from "axios";

const state = {
  watchList: null,
  listIndex: 0,
  playlistId: "",
  playlistName: "",
  currentYoutubeId: "",
  currentTagId: "",
  start: "",
  end: ""
};

const getters = {
  watchList: state => state.watchList,
  listIndex: state => state.listIndex,
  playlistId: state => state.playlistId,
  playlistName: state => state.playlistName,
  currentYoutubeId: state => state.currentYoutubeId,
  currentTagId: state => state.currentTagId,
  start: state => state.start,
  end: state => state.end,
  isPlaylist: state => (state.playlistId ? true : false)
};

const mutations = {
  setPlaylistParameters(state, { playlistTagVideoArray, index }) {
    //watchlistにコンテンツをセット
    state.watchList = playlistTagVideoArray;

    //プレイリストの場合はlistIndexは0からスタート
    state.listIndex = index;

    //watchlistのlistIndexのデータを再生関連パラメーターにセット
    mutations.setYTPlayerParameters(state);
  },
  setIndivisualParameters(state, indivisualTagVideoArray) {
    //watchlistにコンテンツをセット
    state.watchList = indivisualTagVideoArray;

    //watchlistからクリックしたタグIDのインデックスを検索しlistIndexにセット
    state.listIndex = state.watchList.findIndex(
      ({ tag_id }) => tag_id == state.currentTagId
    );

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
  setPlaylistId(state, data) {
    state.playlistId = data;
  },
  setPlaylistName(state, data) {
    state.playlistName = data;
  },
  setCurrentYoutubeId(state, data) {
    state.currentYoutubeId = data;
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
