import axios from "axios";
import router from "../router";

const state = {
  searchQuery: null,
  candidates: [],
  tagVideoResult: [],
  playlistTagResult: []
};

const getters = {
  searchQuery: state => state.searchQuery,
  candidates: state => state.candidates,
  tagVideoResult: state => state.tagVideoResult,
  playlistTagResult: state => state.playlistTagResult
};

const mutations = {
  setSearchQuery(state, data) {
    state.searchQuery = data;
  },
  setCandidates(state, data) {
    state.candidates = data;
  },
  setTagVideoResult(state, data) {
    state.tagVideoResult = data;
  },
  setPlaylistTagResult(state, data) {
    state.playlistTagResult = data;
  }
};

const actions = {
  //検索結果データを取得
  search(context) {
    actions.searchTagVideoResult(context);
    actions.searchPlaylistTagResult(context);
  },
  //検索ワード候補を取得(インクリメンタルサーチ)
  searchCandidates(context, input) {
    let params = {
      input: input
    };

    axios
      .post("api/search/candidates", params)
      .then(function(response) {
        // 成功した時
        context.commit("setCandidates", response.data.candidates);
      })
      .catch(function(error) {
        // 失敗した時
        context.commit("error/setCode", error.status, { root: true });
      });
  },
  //検索ワードを含むタグ単体を検索
  searchTagVideoResult(context) {
    let params = {
      searchQuery: state.searchQuery
    };

    axios
      .post("api/search/tag", params)
      .then(function(response) {
        // 成功した時
        context.commit("setTagVideoResult", response.data.tagVideoResult);
      })
      .catch(function(error) {
        // 失敗した時
        context.commit("error/setCode", error.status, { root: true });
      });
  },
  //検索ワードを含むプレイリストを検索
  async searchPlaylistTagResult(context) {
    let params = {
      searchQuery: state.searchQuery
    };

    await axios
      .post("api/search/playlist", params)
      .then(function(response) {
        // 成功した時
        context.commit("setPlaylistTagResult", response.data.playlistTagResult);
      })
      .catch(function(error) {
        // 失敗した時
        context.commit("error/setCode", error.status, { root: true });
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
