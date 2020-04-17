import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  YTsearchQuery: null,
  candidates: [],
  YTresult: [],
  topYTSearchqueries: [],
  YTsearchHistories: [],
  api: "https://www.googleapis.com/youtube/v3/search",
  params: {
    part: "snippet",
    q: "",
    type: "video",
    order: "viewCount", // 再生回数の多い順
    maxResults: "5", // 最大検索数
    pageToken: "",
    videoEmbeddable: true,
    key: "AIzaSyBo4eCIvHHW73lvmoztAWt-hyAJvVhV-fk",
  },
  isYTLoading: false,
  numberOfYTItemsPerPagination: 5,
  isYTSearching: false,
};

const getters = {
  YTsearchQuery: (state) => state.YTsearchQuery,
  candidates: (state) => state.candidates,
  YTresult: (state) => state.YTresult,
  topYTSearchqueries: (state) => state.topYTSearchqueries,
  YTsearchHistories: (state) => state.YTsearchHistories,
  isYTLoading: (state) => state.isYTLoading,
  numberOfYTItemsPerPagination: (state) => state.numberOfYTItemsPerPagination,
  isYTSearching: (state) => state.isYTSearching,
};

const mutations = {
  setYTsearchQuery(state, data) {
    state.YTsearchQuery = data;
    state.params.q = state.YTsearchQuery;
  },
  setCandidates(state, data) {
    state.candidates = data;
  },
  setYTResult(state, data) {
    state.YTresult.push(...data);
  },
  setTopYTSearchqueries(state, data) {
    state.topYTSearchqueries = data;
  },
  setYTsearchHistories(state, data) {
    state.YTsearchHistories = data;
  },
  setIsYTLoading(state, data) {
    console.log();
    state.isYTLoading = data;
  },
  setNumberOfYTItemsPerPagination(state, data) {
    state.numberOfYTItemsPerPagination = data;
  },
  setPageToken(state, data) {
    state.params.pageToken = data;
  },
  setIsYTSearching(state, data) {
    state.isYTSearching = data;
  },
  //検索結果表示ページに遷移
  YTsearchResultPageTransit() {
    router
      .push({
        path: "/YTresult",
        query: { search_query: state.YTsearchQuery },
      })
      .catch((err) => {});
  },
};

const actions = {
  //検索結果データを取得
  async YTsearch(context) {
    await actions.searchYTResult(context);
    // actions.storeYTSearchRecord(context);
  },
  //検索ワード候補を取得(インクリメンタルサーチ)
  // async searchCandidates(context, input) {
  //   let params = {
  //     input: input
  //   };

  //   const response = await axios.post("api/search/candidates", params);
  //   if (response.status == OK) {
  //     // 成功した時
  //     context.commit("setCandidates", response.data.candidates);
  //   } else if (response.status == INTERNAL_SERVER_ERROR) {
  //     // 失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   } else {
  //     // 上記以外で失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   }
  // },
  //検索ワードをYoutube動画を検索
  async searchYTResult(context) {
    //検索結果が帰ってくる前に連続でリクエストをかけないようにフラグをセット
    context.commit("setIsYTSearching", true);

    const response = await axios.get(state.api, { params: state.params });
    if (response.status == OK) {
      // 成功した時
      //次の検索結果ページトークンをセット
      context.commit("setPageToken", response.data.nextPageToken);
      //検索結果を格納
      context.commit("setYTResult", response.data.items);
      //連続リクエストを制御するフラグを解除
      context.commit("setIsYTSearching", false);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //検索キーワードおよび検索履歴をテーブルに保存
  // async storeYTSearchRecord(context) {
  //   let params = {
  //     YTsearchQuery: state.YTsearchQuery
  //   };

  //   const response = await axios.post("api/store/YTsearchrecord", params);
  //   if (response.status == CREATED) {
  //     // 成功した時
  //   } else if (response.status == INTERNAL_SERVER_ERROR) {
  //     // 失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   } else {
  //     // 上記以外で失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   }
  // },
  //人気の検索ワードを取得
  // async getTopYTSearchqueries(context) {
  //   const response = await axios.get("api/topYTSearchqueries");
  //   if (response.status == OK) {
  //     // 成功した時
  //     context.commit("setTopYTSearchqueries", response.data.topYTSearchqueries);
  //   } else if (response.status == INTERNAL_SERVER_ERROR) {
  //     // 失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   } else {
  //     // 上記以外で失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   }
  // },
  // //検索履歴を取得
  // async getYTsearchHistories(context) {
  //   const response = await axios.get("api/YTsearchHistories");
  //   if (response.status == OK) {
  //     // 成功した時
  //     context.commit("setYTsearchHistories", response.data.YTsearchHistories);
  //   } else if (response.status == INTERNAL_SERVER_ERROR) {
  //     // 失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   } else {
  //     // 上記以外で失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   }
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
