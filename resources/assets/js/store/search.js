import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

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
    } else {
      // 上記以外で失敗した時
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
