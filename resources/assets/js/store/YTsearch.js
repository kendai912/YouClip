import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  YTsearchQuery: null,
  candidates: [],
  YTresult: [],
  YTsearchResponse: [],
  YTvideosResponse: [],
  topYTSearchqueries: [],
  YTsearchHistories: [],
  apiOfSearch: "https://www.googleapis.com/youtube/v3/search",
  apiOfVideos: "https://www.googleapis.com/youtube/v3/videos",
  paramsOfSearch: {
    part: "snippet",
    q: "",
    type: "video",
    order: "viewCount", // 再生回数の多い順
    maxResults: "2", // 最大検索数
    pageToken: "",
    videoEmbeddable: true,
    // key: "AIzaSyBo4eCIvHHW73lvmoztAWt-hyAJvVhV-fk", //ScenePicks
    // key: "AIzaSyDwBA7llTxUe3ZP4fMV8whf8Hug3ND4HRU", //Futsal Movie Stock
    // key: "AIzaSyCUyFedDYTd9DZEOMVlSGofCJrV35EjQbc", //MangaVoice Translation
    key: "AIzaSyCCX46YN-2sFhTBLEv3kVPgDjz7L1EOBUs", //IkinariDateCourse
  },
  paramsOfVideos: {
    part: "contentDetails,statistics",
    id: "",
    // key: "AIzaSyBo4eCIvHHW73lvmoztAWt-hyAJvVhV-fk", //ScenePicks
    // key: "AIzaSyDwBA7llTxUe3ZP4fMV8whf8Hug3ND4HRU", //Futsal Movie Stock
    // key: "AIzaSyCUyFedDYTd9DZEOMVlSGofCJrV35EjQbc", //MangaVoice Translation
    key: "AIzaSyCCX46YN-2sFhTBLEv3kVPgDjz7L1EOBUs", //IkinariDateCourse
  },
  isYTLoading: false,
  numberOfYTItemsPerPagination: 10,
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
    state.paramsOfSearch.q = state.YTsearchQuery;
  },
  setCandidates(state, data) {
    state.candidates = data;
  },
  setYTResult(state, data) {
    state.YTresult.push(...data);
  },
  clearYTResult(state) {
    state.YTresult = [];
  },
  setYTsearchResponse(state, data) {
    state.YTsearchResponse = data;
  },
  setYTvideosResponse(state, data) {
    state.YTvideosResponse = data;
  },
  setTopYTSearchqueries(state, data) {
    state.topYTSearchqueries = data;
  },
  setYTsearchHistories(state, data) {
    state.YTsearchHistories = data;
  },
  setYoutubeIdsOfParamsOfVideos(state, data) {
    let youtubeIdsURIStr;
    data.forEach((value, index) => {
      if (index == 0) {
        youtubeIdsURIStr = value;
      } else {
        youtubeIdsURIStr += "," + value;
      }
    });
    state.paramsOfVideos.id = youtubeIdsURIStr;
  },
  setIsYTLoading(state, data) {
    state.isYTLoading = data;
  },
  setNumberOfYTItemsPerPagination(state, data) {
    state.numberOfYTItemsPerPagination = data;
  },
  setPageToken(state, data) {
    state.paramsOfSearch.pageToken = data;
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
  //検索ワードをYoutube動画を検索
  async searchYTResult(context) {
    //検索結果が帰ってくる前に連続でリクエストをかけないようにフラグをセット
    context.commit("setIsYTSearching", true);

    const response = await axios.get(state.apiOfSearch, {
      params: state.paramsOfSearch,
    });
    if (response.status == OK) {
      // 成功した時
      //レスポンス内のvideoIdよりstatistics,contentDetailsをリクエストし結果をYTvideosResponse格納
      let youtubeIds = [];
      response.data.items.forEach((value) => {
        youtubeIds.push(value.id.videoId);
      });
      await context.dispatch("getYTstatisticsAndcontentDetails", youtubeIds);

      //次の検索結果ページトークンをセット
      context.commit("setPageToken", response.data.nextPageToken);

      //searchのAPI検索結果を格納
      context.commit("setYTsearchResponse", response.data.items);

      //searchとvideosのAPI検索結果をまとめてYTresultに格納
      let YTresult = [];
      for (let i = 0; i < youtubeIds.length; i++) {
        YTresult[i] = {
          etag: state.YTsearchResponse[i].etag,
          youtubeId: state.YTsearchResponse[i].id.videoId,
          thumbnails: state.YTsearchResponse[i].snippet.thumbnails,
          title: state.YTsearchResponse[i].snippet.title,
          channelTitle: state.YTsearchResponse[i].snippet.channelTitle,
          publishedAt: state.YTsearchResponse[i].snippet.publishedAt,
          duration: state.YTvideosResponse[i].contentDetails.duration,
          viewCount: state.YTvideosResponse[i].statistics.viewCount,
        };
      }
      context.commit("setYTResult", YTresult);

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
  //視聴回数と再生時間を取得するためのAPIリクエスト
  async getYTstatisticsAndcontentDetails(context, youtubeIds) {
    //paramsのidにリクエストするyoutubeIdをセット
    context.commit("setYoutubeIdsOfParamsOfVideos", youtubeIds);

    const response = await axios.get(state.apiOfVideos, {
      params: state.paramsOfVideos,
    });
    if (response.status == OK) {
      // 成功した時
      //videosのAPI検索結果を格納
      context.commit("setYTvideosResponse", response.data.items);
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
