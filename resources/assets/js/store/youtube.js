import axios from "axios";

const state = {
  youtubeId: ""
};

const getters = {
  youtubeId: state => state.youtubeId
};

const mutations = {
  setYoutubeId(state, data) {
    state.youtubeId = data;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
