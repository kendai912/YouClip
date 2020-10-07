import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  playlistLikeData: null
};

const getters = {
  playlistLikeData: state => state.playlistLikeData,
  isLikedPlaylist: state => playlist_id => {
    if (state.playlistLikeData != null && state.playlistLikeData[playlist_id]) {
      return state.playlistLikeData[playlist_id].isLiked;
    } else {
      return false;
    }
  },
  likePlaylistCount: state => playlist_id => {
    if (state.playlistLikeData != null && state.playlistLikeData[playlist_id]) {
      return state.playlistLikeData[playlist_id].likeCount;
    } else {
      return 0;
    }
  }
};

const mutations = {
  setPlaylistLikeData(state, data) {
    state.playlistLikeData = data;
  },
  setIsLiked(state, { playlist_id, data }) {
    state.playlistLikeData[playlist_id].isLiked = data;
  },
  toggleIsLiked(state, playlist_id) {
    if (!state.playlistLikeData[playlist_id]) {
      state.playlistLikeData = {
        ...state.playlistLikeData,
        [playlist_id]: { isLiked: false, likeCount: 0 }
      };
    }
    state.playlistLikeData[playlist_id].isLiked = !state.playlistLikeData[
      playlist_id
    ].isLiked;
  },
  setLikeCount(state, { playlist_id, data }) {
    state.playlistLikeData[playlist_id].likeCount = data;
  },
  incrementLikeCount(state, playlist_id) {
    state.playlistLikeData[playlist_id].likeCount += 1;
  },
  decrementLikeCount(state, playlist_id) {
    state.playlistLikeData[playlist_id].likeCount -= 1;
  }
};

const actions = {
  //タグへのLikeデータのロード
  async loadPlaylistLike(context) {
    const response = await axios.get("/api/load/playlistLike");
    if (response.status == OK) {
      // 成功した時
      context.commit("setPlaylistLikeData", response.data.playlistLike);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async toggleLikePlaylist(context, playlist_id) {
    this.errors = {};
    let params = {
      playlist_id: playlist_id
    };

    const response = await axios.post("/api/toggleLikePlaylist", params);
    if (response.status == CREATED) {
      // 成功した時
      if (context.getters["isLikedPlaylist"](playlist_id)) {
        // 既にLike済の場合: isLikedステータスをfalseにし、likeCountを-1
        context.commit("toggleIsLiked", playlist_id);
        context.commit("decrementLikeCount", playlist_id);
      } else {
        // 未だLikeしていない場合: isLikedステータスをtrueにし、likeCountを+1
        context.commit("toggleIsLiked", playlist_id);
        context.commit("incrementLikeCount", playlist_id);
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
