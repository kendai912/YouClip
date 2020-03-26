import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

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

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
