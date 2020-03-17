import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  tagLikeData: null
};

const getters = {
  tagLikeData: state => state.tagLikeData,
  isLiked: state => tag_id => {
    if (state.tagLikeData != null && state.tagLikeData[tag_id]) {
      return state.tagLikeData[tag_id].isLiked;
    } else {
      return false;
    }
  },
  likeCount: state => tag_id => {
    return state.tagLikeData[tag_id].likeCount;
  }
};

const mutations = {
  setTagLikeData(state, data) {
    state.tagLikeData = data;
  },
  toggleIsLiked(state, tag_id) {
    state.tagLikeData[tag_id].isLiked = !state.tagLikeData[tag_id].isLiked;
  },
  incrementLikeCount(state, tag_id) {
    state.tagLikeData[tag_id].likeCount += 1;
  },
  decrementLikeCount(state, tag_id) {
    state.tagLikeData[tag_id].likeCount -= 1;
  }
};

const actions = {
  //タグへのLikeデータのロード
  async loadTagLike(context) {
    const response = await axios.get("/api/load/tagLike");
    if (response.status == OK) {
      // 成功した時
      context.commit("setTagLikeData", response.data.tagLike);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async toggleLike(context, tag_id) {
    this.errors = {};
    let params = {
      tag_id: tag_id
    };

    const response = await axios.post("/api/toggleLike", params);
    if (response.status == CREATED) {
      // 成功した時
      if (getters["isLiked"](tag_id)) {
        // 既にLike済の場合: isLikedステータスをfalseにし、likeCountを-1
        context.commit("toggleIsLiked", tag_id);
        context.commit("decrementLikeCount", tag_id);
      } else {
        // 未だLikeしていない場合: isLikedステータスをtrueにし、likeCountを+1
        context.commit("toggleIsLiked", tag_id);
        context.commit("incrementLikeCount", tag_id);
      }
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
