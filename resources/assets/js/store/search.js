import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  searchQuery: null,
  searchCandidates: [],
  // searchHistoryCandidates: [],
  // topSearchqueriesCandidates: [],
  tagVideoResult: [],
  playlistTagResult: [],
  topSearchqueries: [],
  searchHistories: [],
  tagVideoResultToLoad: true,
  playlistResultToLoad: true,
  isSearchingPlaylistTagResult: false,
  isSearchingTagVideoResult: false,
};

const getters = {
  searchQuery: (state) => state.searchQuery,
  searchCandidates: (state) => state.searchCandidates,
  // searchHistoryCandidates: (state) => state.searchHistoryCandidates,
  // topSearchqueriesCandidates: (state) => state.topSearchqueriesCandidates,
  tagVideoResult: (state) => state.tagVideoResult,
  playlistTagResult: (state) => state.playlistTagResult,
  topSearchqueries: (state) => state.topSearchqueries,
  searchHistories: (state) => state.searchHistories,
  tagVideoResultToLoad: (state) => state.tagVideoResultToLoad,
  playlistResultToLoad: (state) => state.playlistResultToLoad,
  isSearchingPlaylistTagResult: (state) => state.isSearchingPlaylistTagResult,
  isSearchingTagVideoResult: (state) => state.isSearchingTagVideoResult,
};

const mutations = {
  setSearchQuery(state, data) {
    state.searchQuery = data;
  },
  setSearchCandidates(state, data) {
    state.searchCandidates = data;
  },
  // setSearchHistoryCandidates(state, data) {
  //   state.searchHistoryCandidates = data;
  // },
  // setTopSearchqueriesCandidates(state, data) {
  //   state.topSearchqueriesCandidates = data;
  // },
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
  setTagVideoResultToLoad(state, data) {
    state.tagVideoResultToLoad = data;
  },
  setPlaylistResultToLoad(state, data) {
    state.playlistResultToLoad = data;
  },
  setIsSearchingPlaylistTagResult(state, data) {
    state.isSearchingPlaylistTagResult = data;
  },
  setIsSearchingTagVideoResult(state, data) {
    state.isSearchingTagVideoResult = data;
  },
  //検索結果表示ページに遷移
  searchResultPageTransit() {
    router
      .push({
        path: "result",
        query: { search_query: state.searchQuery },
      })
      .catch((err) => {});

    location.reload();
  },
};

const actions = {
  //検索結果データを取得
  async search(context, page) {
    await actions.searchPlaylistTagResult(context, page);
    await actions.searchTagVideoResult(context, page);
    actions.storeSearchRecord(context);
  },
  //検索ワード候補を取得(インクリメンタルサーチ)
  async getSearchCandidates(context, input) {
    let queries = {
      input: input,
    };

    const response = await axios.get("api/search/getSearchCandidates", {
      params: queries,
    });
    if (response.status == OK) {
      // 成功した時
      context.commit("setSearchCandidates", response.data.searchCandidates);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索ワードを含むタグ単体を検索
  async searchTagVideoResult(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsSearchingTagVideoResult", true);

    let params = {
      searchQuery: state.searchQuery,
      page: page,
    };

    const response = await axios.post("api/search/tag", params);
    if (response.status == OK) {
      // 成功した時
      if (response.data.tagVideoResult.last_page == page)
        context.commit("setTagVideoResultToLoad", false);

      //シーンタグの検索結果を格納
      context.commit("setTagVideoResult", response.data.tagVideoResult.data);

      //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
      context.commit("setIsSearchingTagVideoResult", false);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索ワードを含むプレイリストを検索
  async searchPlaylistTagResult(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsSearchingPlaylistTagResult", true);

    let params = {
      searchQuery: state.searchQuery,
      page: page,
    };

    const response = await axios.post("api/search/playlist", params);
    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistTagResult.last_page == page)
        context.commit("setPlaylistResultToLoad", false);

      //プレイリストの検索結果を格納
      context.commit(
        "setPlaylistTagResult",
        response.data.playlistTagResult.data
      );

      //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
      context.commit("setIsSearchingPlaylistTagResult", false);
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
      searchQuery: state.searchQuery,
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
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
