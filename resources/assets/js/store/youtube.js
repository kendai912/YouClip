import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  youtubeId: "",
  videoData: null,
  tagDataArray: null,
  isNew: "",
  newVideoData: {
    title: "",
    thumbnail: "",
    duration: "",
    category: "",
  },
  currentTime: "0:00",
  isReady: false,
  key: "AIzaSyBo4eCIvHHW73lvmoztAWt-hyAJvVhV-fk",
};

const getters = {
  youtubeId: (state) => state.youtubeId,
  videoData: (state) => state.videoData,
  newVideoData: (state) => state.newVideoData,
  tagDataArray: (state) => state.tagDataArray,
  isNew: (state) => state.isNew,
  currentTime: (state) => state.currentTime,
  isReady: (state) => state.isReady,
};

const mutations = {
  setYoutubeId(state, data) {
    state.youtubeId = data;
  },
  setVideoData(state, data) {
    state.videoData = data;
  },
  setNewVideoTitle(state, data) {
    state.newVideoData.title = data;
  },
  setNewVideoThumbnail(state, data) {
    state.newVideoData.thumbnail = data;
  },
  setNewVideoDuration(state, data) {
    if (data.match(/PT(\d*)M(\d*)S/)) {
      let result = data.match(/PT(\d*)M(\d*)S/);
      let min = result[1];
      let sec = result[2];
      state.newVideoData.duration = min + ":" + sec;
    } else if (data.match(/PT(\d*)S/)) {
      let result = data.match(/PT(\d*)S/);
      let sec = result[1];
      state.newVideoData.duration = "0:" + sec;
    }
  },
  setNewVideoCategory(state, data) {
    state.newVideoData.category = data;
  },
  setTagDataArray(state, data) {
    state.tagDataArray = data;
  },
  setIsNew(state, data) {
    state.isNew = data;
  },
  setCurrentTime(state, data) {
    state.currentTime = data;
  },
  setIsReady(state, data) {
    state.isReady = data;
  },
};

const actions = {
  //youtubeIdからDBに既に登録済の動画IDを取得
  async getVideo(context) {
    let params = {
      youtubeId: state.youtubeId,
    };

    const response = await axios.get("api/youtube/getVideo", {
      params: params,
    });
    if (response.status == OK) {
      // 成功した時
      if (!response.data.video[0]) {
        //新規の動画・タグ場合
        context.commit("setIsNew", true);
      } else {
        //既存の動画・タグの場合
        context.commit("setIsNew", false);
        context.commit("setVideoData", response.data.video[0]);
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //動画IDから既存のタグをロード
  async getTag(context) {
    //新規の動画・タグの場合はロードしない
    if (state.isNew) return;

    let params = {
      videoId: state.videoData.id,
    };

    const response = await axios.get("api/youtube/getTag", {
      params: params,
    });
    if (response.status == OK) {
      // 成功した時
      let tags = response.data.tag;

      //開始時間の昇順に並び替え
      tags.sort((a, b) => {
        return a.start > b.start
          ? 1
          : a.start < b.start
          ? -1
          : a.end > b.end
          ? 1
          : -1;
      });

      context.commit("setTagDataArray", tags);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //YoutubeIDを元にData APIから動画情報を取得
  async getNewVideoData(context) {
    let api = "https://www.googleapis.com/youtube/v3/videos";
    let params = {
      id: state.youtubeId,
      key: state.key,
      part: "snippet, contentDetails",
    };

    const response = await axios.get(api, { params: params });
    if (response.status == OK) {
      // 成功した時
      context.commit("setNewVideoTitle", response.data.items[0].snippet.title);
      context.commit(
        "setNewVideoThumbnail",
        response.data.items[0].snippet.thumbnails.high.url
      );
      context.commit(
        "setNewVideoDuration",
        response.data.items[0].contentDetails.duration
      );
      context.dispatch(
        "getVideoCategoryTitleById",
        response.data.items[0].snippet.categoryId
      );
      // context.commit("setYTResult", response.data.items);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //Data APIでCategoryIDからカテゴリ名を取得
  async getVideoCategoryTitleById(context, categoryId) {
    let api = "https://www.googleapis.com/youtube/v3/videoCategories";
    let params = {
      part: "snippet",
      id: categoryId,
      key: state.key,
    };

    const response = await axios.get(api, { params: params });
    if (response.status == OK) {
      // 成功した時
      context.commit(
        "setNewVideoCategory",
        response.data.items[0].snippet.title
      );
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
