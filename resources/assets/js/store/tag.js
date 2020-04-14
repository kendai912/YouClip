import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  tagVideoData: null,
  myCreatedAndLikedTagVideo: null
};

const getters = {
  tagVideoData: state => state.tagVideoData,
  myCreatedAndLikedTagVideo: state => state.myCreatedAndLikedTagVideo,
  getTagVideoContentById: state => tagId => {
    return state.tagVideoData.find(tagVideo => tagVideo.tag_id == tagId);
  }
};

const mutations = {
  setTagVideoData(state, data) {
    state.tagVideoData = data;
  },
  setMyCreatedAndLikedTagVideo(state, data) {
    state.myCreatedAndLikedTagVideo = data;
  }
};

const actions = {
  //Likeまたは作成したシーンタグをロード
  async loadMyCreatedAndLikedTagVideo(context) {
    const response = await axios.get("api/load/myCreatedAndLikedTagVideo");
    if (response.status == OK) {
      // 成功した時
      context.commit(
        "setMyCreatedAndLikedTagVideo",
        response.data.myCreatedAndLikedTagVideo
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
