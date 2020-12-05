import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  highlightTransitNext: true,
  displayComponent: "YTvideoSelectBox",
};

const getters = {
  highlightTransitNext: (state) => state.highlightTransitNext,
  displayComponent: (state) => state.displayComponent,
};

const mutations = {
  setHighlightTransitNext(state, data) {
    state.highlightTransitNext = data;
  },
  setDisplayComponent(state, data) {
    state.displayComponent = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
