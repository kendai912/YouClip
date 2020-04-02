import axios from "axios";

const state = {
  tagListOfVideo: null
};

const getters = {
  tagListOfVideo: state => state.tagListOfVideo
};

const mutations = {
  setTagListOfVideo(state, data) {
    state.tagListOfVideo = data;
  }
};

const actions = {
  //VideoIdから関連するタグ一覧を取得
  async getTagListByVideoId(context, video_id) {
    let queries = {
      id: video_id
    };
    const response = await axios.get("api/taglist/video", { params: queries });
    context.commit("setTagListOfVideo", response.data.tagList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
