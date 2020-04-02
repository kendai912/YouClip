import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  tagVideoData: null,
  myTagVideoData: null
};

const getters = {
  tagVideoData: state => state.tagVideoData,
  myTagVideoData: state => state.myTagVideoData,
  getTagVideoContentById: state => tagId => {
    return state.tagVideoData.find(tagVideo => tagVideo.tag_id == tagId);
  }
};

const mutations = {
  setTagVideoData(state, data) {
    state.tagVideoData = data;
  },
  setMyTagVideoData(state, data) {
    state.myTagVideoData = data;
  }
};

const actions = {
  //tagとvideoが紐付いたデータ一覧をロード
  async loadTagVideo(context) {
    const response = await axios.get("api/load/tagVideo");
    if (response.status == OK) {
      // 成功した時
      context.commit("setTagVideoData", response.data);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //Likeまたは作成したシーンタグをロード
  async loadMyTagVideo(context) {
    const response = await axios.get("api/load/myTagVideo");
    if (response.status == OK) {
      // 成功した時
      context.commit("setMyTagVideoData", response.data.myTagVideoData);
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
