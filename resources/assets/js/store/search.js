import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  searchQuery: null,
  candidates: [],
  tagVideoResult: [],
  playlistTagResult: [],
  topSearchqueries: [],
  searchHistories: [],
  showResults: false
};

const getters = {
  searchQuery: state => state.searchQuery,
  candidates: state => state.candidates,
  tagVideoResult: state => state.tagVideoResult,
  playlistTagResult: state => state.playlistTagResult,
  topSearchqueries: state => state.topSearchqueries,
  searchHistories: state => state.searchHistories,
  showResults: state => state.showResults
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
  },
  setTopSearchqueries(state, data) {
    state.topSearchqueries = data;
  },
  setSearchHistories(state, data) {
    state.searchHistories = data;
  },
  setShowResults(state, data) {
    state.showResults = data;
  },
  //検索結果表示ページに遷移
  searchResultPageTransit() {
    const path = "/result";
    if (location.pathname != path) {
      router
        .push({
          path: "result",
          query: { search_query: state.searchQuery }
        })
        .catch(err => {});
    } else {
      router
        .push({
          query: { search_query: state.searchQuery }
        })
        .catch(err => {});
    }
  }
};

const actions = {
  //検索結果データを取得
  search(context) {
    actions.searchTagVideoResult(context);
    actions.searchPlaylistTagResult(context);
    context.commit("setShowResults", true);
    actions.storeSearchRecord(context);
  },
  //検索ワード候補を取得(インクリメンタルサーチ)
  async searchCandidates(context, input) {
    let params = {
      input: input
    };

    const response = await axios.post("api/search/candidates", params);
    if (response.status == OK) {
      // 成功した時
      context.commit("setCandidates", response.data.candidates);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索ワードを含むタグ単体を検索
  async searchTagVideoResult(context) {
    let params = {
      searchQuery: state.searchQuery
    };

    const response = await axios.post("api/search/tag", params);
    if (response.status == OK) {
      // 成功した時
      context.commit("setTagVideoResult", response.data.tagVideoResult);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索ワードを含むプレイリストを検索
  async searchPlaylistTagResult(context) {
    let params = {
      searchQuery: state.searchQuery
    };

    const response = await axios.post("api/search/playlist", params);
    if (response.status == OK) {
      // 成功した時
      context.commit("setPlaylistTagResult", response.data.playlistTagResult);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索キーワードおよび検索履歴をテーブルに保存
  async storeSearchRecord(context) {
    let params = {
      searchQuery: state.searchQuery
    };

    const response = await axios.post("api/store/searchrecord", params);
    if (response.status == CREATED) {
      // 成功した時
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //人気の検索ワードを取得
  async getTopSearchqueries(context) {
    const response = await axios.get("api/topSearchqueries");
    if (response.status == OK) {
      // 成功した時
      context.commit("setTopSearchqueries", response.data.topSearchqueries);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索履歴を取得
  async getSearchHistories(context) {
    const response = await axios.get("api/searchHistories");
    if (response.status == OK) {
      // 成功した時
      context.commit("setSearchHistories", response.data.searchHistories);
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
