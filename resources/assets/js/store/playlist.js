import axios from "axios";

const state = {
  playlistTagData: null
};

const getters = {
  playlistTagData: state => state.playlistTagData
};

const mutations = {
  setPlaylistTagData(state, data) {
    state.playlistTagData = data;
  }
};

const actions = {
  async loadPlaylist(context) {
    const response = await axios.get("api/load/playlist");
    context.commit("setPlaylistTagData", response.data.playlistTagData);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
