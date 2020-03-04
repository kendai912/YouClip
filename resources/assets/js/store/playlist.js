import axios from "axios";

const state = {
  playlistMetaData: null,
  playlistContentData: null
};

const getters = {
  playlistMetaData: state => state.playlistMetaData,
  playlistContentData: state => state.playlistContentData
};

const mutations = {
  setPlaylistMetaData(state, data) {
    state.playlistMetaData = data;
  },
  setPlaylistContentData(state, data) {
    state.playlistContentData = data;
  }
};

const actions = {
  async loadPlaylist(context) {
    const response = await axios.get("api/load/playlist");
    context.commit("setPlaylistMetaData", response.data.meta);
    context.commit("setPlaylistContentData", response.data.content);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
