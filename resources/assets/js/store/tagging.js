import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  showTaggingControl: "TimeControl",
  tags: null,
  start: null,
  end: null
};

const getters = {
  showTaggingControl: state => state.showTaggingControl,
  tags: state => state.tags,
  start: state => state.start,
  end: state => state.end
};

const mutations = {
  setShowTaggingControl(state, data) {
    state.showTaggingControl = data;
  },
  setTags(state, data) {
    state.tags = data;
  },
  setStart(state, data) {
    state.start = data;
  },
  setEnd(state, data) {
    state.end = data;
  }
};

const actions = {
  //シーンタグの保存
  async storeSceneTags(context) {
    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      tags: state.tags,
      start: state.start,
      end: state.end
    };
    console.log(params);

    // const response = await axios.post("/api/tag/store");
    // if (response.status == OK) {
    //   // 成功した時
    // } else if (response.status == INTERNAL_SERVER_ERROR) {
    //   // 失敗した時
    //   context.commit("error/setCode", response.status, { root: true });
    // } else {
    //   // 上記以外で失敗した時
    //   context.commit("error/setCode", response.status, { root: true });
    // }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
