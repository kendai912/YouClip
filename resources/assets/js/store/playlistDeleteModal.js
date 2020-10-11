import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  showPlaylistDeleteModal: false,
  playlistId: "",
  playlistName: "",
};

const getters = {
  showPlaylistDeleteModal: (state) => state.showPlaylistDeleteModal,
  playlistId: (state) => state.playlistId,
  playlistName: (state) => state.playlistName,
};

const mutations = {
  openPlaylistDeleteModal(state) {
    state.showPlaylistDeleteModal = true;
  },
  closePlaylistDeleteModal(state) {
    state.showPlaylistDeleteModal = false;
  },
  setPlaylistId(state, data) {
    state.playlistId = data;
  },
  setPlaylistName(state, data) {
    state.playlistName = data;
  },
};

const actions = {
  async deletePlaylist(context) {
    let params = {
      playlistId: state.playlistId,
    };

    const response = await axios.post("/api/playlist/delete", params);
    if (response.status == DELETED) {
      // 成功した時
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
  actions,
};
