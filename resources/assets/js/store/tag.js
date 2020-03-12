import axios from "axios";

const state = {
  tagVideoData: null
};

const getters = {
  tagVideoData: state => state.tagVideoData,
  getTagVideoContentById: state => tagId => {
    return state.tagVideoData.find(tagVideo => tagVideo.tag_id == tagId);
  }
};

const mutations = {
  setTagVideoData(state, data) {
    state.tagVideoData = data;
  }
};

const actions = {
  //tagとvideoが紐付いたデータ一覧をロード
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
