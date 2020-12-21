import axios from "axios";
import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
} from "../util";
import router from "../router";

const state = {
  YTsearchQuery: null,
  candidates: [],
  YTresult: [],
  YTRecentVideos: [],
  YTsearchResponse: [],
  YTvideosResponse: [],
  topYTSearchqueries: [],
  YTsearchHistories: [],
  apiOfScraping:
    "http://ec2-54-238-6-75.ap-northeast-1.compute.amazonaws.com:3000",
  apiOfSearch: "https://www.googleapis.com/youtube/v3/search",
  apiOfVideos: "https://www.googleapis.com/youtube/v3/videos",
  paramsOfSearch: {
    part: "snippet",
    q: "",
    type: "video",
    order: "viewCount", // 再生回数の多い順
    maxResults: "8", // 最大検索数
    pageToken: "",
    videoEmbeddable: true,
    key: "",
  },
  paramsOfVideos: {
    part: "contentDetails,statistics",
    id: "",
    key: "",
  },
  keyIndex: 0,
  keyArray: [
    "AIzaSyBo4eCIvHHW73lvmoztAWt-hyAJvVhV-fk", //YouClip
    "AIzaSyDwBA7llTxUe3ZP4fMV8whf8Hug3ND4HRU", //Futsal Movie Stock
    "AIzaSyCUyFedDYTd9DZEOMVlSGofCJrV35EjQbc", //MangaVoice Translation
    "AIzaSyCCX46YN-2sFhTBLEv3kVPgDjz7L1EOBUs", //IkinariDateCourse
    "AIzaSyBxlIZX9pR1wIG7CqMe7wvyObXpf_BGvN8", //My First Project
    "AIzaSyDy9y9xNIyj9ciuebX5bP8wB7sWOIylfz8", //AutoML-Sample
    "AIzaSyDHseNOxUV-81QHSYjNAK9oHDC428OJYmc", //practice1
    "AIzaSyBxfD1UJz1WZ6OIYD96712OBwxZ_YyXaZE", //practice2
    "AIzaSyA7WmuL5HRjtWOmdSeOmDCEqH55kJSfDDY", //practice3
    "AIzaSyBe0B2ImZYGRGzmqkxFF_JtQnyL_8_PYQM", //practice4
    "AIzaSyAZUVrV-CyO0Noi4hcMv7fCMPaBJIHhrMg", //practice5
    "AIzaSyDVODBVpbVdpz8MpzBjge2prP8-xXqKb8s", //practice6
    "AIzaSyCedMzCqkoV6lFj1X6QJWOxJNSVb8gQsQ8", //practice7
    "AIzaSyAAUZgJnemWC4QHlugTXg1wPHrWxOdA4Tg", //practice8
    "AIzaSyAv3Z4y2-U0rFUw7us42bQVSpa50PVK3WA", //practice9
    "AIzaSyB3MtM2gwKDaGxUW90ybEjMvpbpsWr6f1o", //practice10
    "AIzaSyC0ytLKKn_W44MZMH94PO6wfqk_cgSYTUg", //practice11
    "AIzaSyAu7Endr6bQ8lnwzITuzngHtCxQ-4MzOac", //practice12
  ],
  isYTLoading: false,
  numberOfYTItemsPerPagination: 8,
  isYTSearching: false,
  YTResultPageNumber: 1,
  YTSearchKey: "",
  YTSearchPageToken: "",
};

const getters = {
  YTsearchQuery: (state) => state.YTsearchQuery,
  keyIndex: (state) => state.keyIndex,
  keyArray: (state) => state.keyArray,
  key: (state) => state.keyArray[state.keyIndex],
  candidates: (state) => state.candidates,
  YTresult: (state) => state.YTresult,
  YTRecentVideos: (state) => state.YTRecentVideos,
  topYTSearchqueries: (state) => state.topYTSearchqueries,
  YTsearchHistories: (state) => state.YTsearchHistories,
  isYTLoading: (state) => state.isYTLoading,
  numberOfYTItemsPerPagination: (state) => state.numberOfYTItemsPerPagination,
  isYTSearching: (state) => state.isYTSearching,
  YTResultPageNumber: (state) => state.YTResultPageNumber,
  YTSearchKey: (state) => state.YTSearchKey,
  YTSearchPageToken: (state) => state.YTSearchPageToken,
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
  setYTRecentVideos(state, data) {
    state.YTRecentVideos.push(...data);
  },
  clearYTResult(state) {
    state.YTresult = [];
  },
  clearYTRecentVideos(state) {
    state.YTRecentVideos = [];
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
  setKeyIndex(state, data) {
    state.keyIndex = data;
  },
  setKeyOfSearch(state, keyIndex) {
    state.paramsOfSearch.key = state.keyArray[keyIndex];
  },
  setKeyOfVideos(state, keyIndex) {
    state.paramsOfVideos.key = state.keyArray[keyIndex];
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
        path: "/highlight",
        query: { search_query: state.YTsearchQuery },
      })
      .catch((err) => {});
  },
  setYTResultPageNumber(state, data) {
    state.YTResultPageNumber = data;
  },
  setYTSearchKey(state, data) {
    state.YTSearchKey = data;
  },
  setYTSearchPageToken(state, data) {
    state.YTSearchPageToken = data;
  },
};

const actions = {
  //検索結果データを取得
  async YTsearch(context, pageNumber) {
    actions.storeYTSearchRecord(context);
    await actions.searchYTResult(context, pageNumber);
  },
  async YTRecentVideos(context) {
    await actions.searchYTRecentVideos(context);
  },
  //検索ワードをYoutube動画を検索
  // async searchYTResult(context) {
  //   //検索結果が帰ってくる前に連続でリクエストをかけないようにフラグをセット
  //   context.commit("setIsYTSearching", true);

  //   //検索と動画データのAPI Keyをセット
  //   context.commit("setKeyOfSearch", context.getters["keyIndex"]);
  //   context.commit("setKeyOfVideos", context.getters["keyIndex"]);

  //   const response = await axios.post("api/search/getYoutubeSearch", {
  //     params: state.paramsOfSearch,
  //     apiUrl: state.apiOfSearch,
  //   });
  //   if (response.status == OK) {
  //     // 成功した時
  //     //レスポンス内のvideoIdよりstatistics,contentDetailsをリクエストし結果をYTvideosResponse格納
  //     let youtubeIds = [];
  //     response.data.items.forEach((value) => {
  //       youtubeIds.push(value.id.videoId);
  //     });
  //     await context.dispatch("getYTstatisticsAndcontentDetails", youtubeIds);

  //     //次の検索結果ページトークンをセット
  //     context.commit("setPageToken", response.data.nextPageToken);

  //     //searchのAPI検索結果を格納
  //     context.commit("setYTsearchResponse", response.data.items);

  //     //searchとvideosのAPI検索結果をまとめてYTresultに格納
  //     let YTresult = [];
  //     for (let i = 0; i < youtubeIds.length; i++) {
  //       YTresult[i] = {
  //         etag: state.YTsearchResponse[i].etag,
  //         youtubeId: state.YTsearchResponse[i].id.videoId,
  //         thumbnails: state.YTsearchResponse[i].snippet.thumbnails.default.url,
  //         title: state.YTsearchResponse[i].snippet.title,
  //         channelTitle: state.YTsearchResponse[i].snippet.channelTitle,
  //         publishedAt: state.YTsearchResponse[i].snippet.publishedAt,
  //         duration: state.YTvideosResponse[i].contentDetails.duration,
  //         viewCount: state.YTvideosResponse[i].statistics.viewCount,
  //       };
  //     }
  //     context.commit("setYTResult", YTresult);

  //     //連続リクエストを制御するフラグを解除
  //     context.commit("setIsYTSearching", false);
  //   } else if (
  //     response.status == FORBIDDEN ||
  //     response.status == INTERNAL_SERVER_ERROR
  //   ) {
  //     // API Keyの上限オーバーで失敗した時
  //     //次のAPI Keyにスイッチして再度検索実行
  //     context.commit("setKeyIndex", context.getters["keyIndex"] + 1);

  //     //API Keyのストックを超えたら直接URLで検索するようにエラーページを表示
  //     context.getters["keyIndex"] >= context.getters["keyArray"].length
  //       ? context.commit("error/setCode", response.status, {
  //           root: true,
  //         })
  //       : await actions.searchYTResult(context);
  //   } else {
  //     // 上記以外で失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   }
  // },

  async searchYTResult(context, pageNumber) {
    //検索結果が帰ってくる前に連続でリクエストをかけないようにフラグをセット
    context.commit("setIsYTSearching", true);

    //検索と動画データのAPI Keyをセット
    context.commit("setKeyOfSearch", context.getters["keyIndex"]);
    context.commit("setKeyOfVideos", context.getters["keyIndex"]);

    let params = {};
    params = {
      q: state.paramsOfSearch.q,
      key: state.YTSearchKey,
      pageToken: state.YTSearchPageToken,
    };
    const response = await axios.get("https://ytserver.net:3000/api/search", {
      params: params,
    });

    if (response.status == OK) {
      let res = response.data.results;
      let key = response.data.key;
      context.commit("setYTSearchKey", key);
      let pageToken = response.data.nextPageToken;
      context.commit("setYTSearchPageToken", pageToken);
      //searchとvideosのAPI検索結果をまとめてYTresultに格納
      let YTresult = [];
      for (let i = 0; i < res.length; i++) {
        YTresult[i] = {
          youtubeId: res[i].video.id,
          thumbnails: res[i].video.thumbnail_src,
          title: res[i].video.title,
          channelTitle: res[i].video.channel,
          publishedAt: res[i].video.release_date,
          duration: res[i].video.duration,
          viewCount: res[i].video.num_views,
        };
      }

      context.commit("setYTResult", YTresult);

      //連続リクエストを制御するフラグを解除
      context.commit("setIsYTSearching", false);
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async searchYTRecentVideos(context) {
    const response = await axios.post("/api/search/getRecentVideos");
    if (response.status == OK) {
      context.commit("setYTRecentVideos", response.data.videoList);
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async storeYTSearchRecord(context) {
    let params = {
      searchQuery: state.YTsearchQuery,
      searchOption: 1, //option 1 shows ytsearch query
    };

    const response = await axios.post("/api/store/searchrecord", params);
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

  async getCandidates(context, input) {
    let params = {
      input: input,
      searchOption: 1,
    };

    const response = await axios.post("api/search/getSearchCandidates", params);
    if (response.status == OK) {
      // 成功した時
      context.commit("setCandidates", response.data.searchCandidates);
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

    const response = await axios.post("api/search/getYoutubeVideos", {
      params: state.paramsOfVideos,
      apiUrl: state.apiOfVideos,
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
