import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  playlistAndTagVideoData: null,
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
  playlistAndTagVideoData: state => state.playlistAndTagVideoData,
  watchList: state => state.watchList,
  listIndex: state => state.listIndex,
  playlistId: state => state.playlistId,
  playlistName: state => state.playlistName,
  currentYoutubeId: state => state.currentYoutubeId,
  currentTagId: state => state.watchList[state.listIndex].tag_id,
  currentTagName: state =>
    state.watchList ? state.watchList[state.listIndex].tags : "",
  currentTagNameArray: (state, getters) =>
    state.watchList ? getters.currentTagName.split(/[\s| |　]/) : "",
  currentTitle: state =>
    state.watchList ? state.watchList[state.listIndex].title : "",
  start: state => state.start,
  end: state => state.end,
  isPlaylist: state => (state.playlistId ? true : false)
};

const mutations = {
  setPlaylistParameters(state, index) {
    //watchlistにコンテンツをセット
    state.watchList = state.playlistAndTagVideoData.tagVideoData;

    //プレイリストの場合はデフォルトでlistIndexは0からスタート
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
  setPlaylistAndTagVideoData(state, data) {
    state.playlistAndTagVideoData = data;
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
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
