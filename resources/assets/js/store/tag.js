import axios from "axios";

const state = {
  tagVideoData: null
};

const getters = {
  tagVideoData: state => state.tagVideoData
};

const mutations = {
  setTagVideoData(state, data) {
    state.tagVideoData = data;
  }
};

const actions = {
  async loadTagVideo(context) {
    const response = await axios.get("api/load/tagVideo");
    context.commit("setTagVideoData", response.data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
