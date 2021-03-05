import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  player: null,
  startTimeInput: null,
  endTimeInput: null,
  isMobile: false,
  isIOS: false,
  seekbarWidth: "",
};

const getters = {
  player: (state) => state.player,
  startTimeInput: (state) => state.startTimeInput,
  endTimeInput: (state) => state.endTimeInput,
  isMobile: (state) => state.isMobile,
  isIOS: (state) => state.isIOS,
  seekbarWidth: (state) => state.seekbarWidth,
};

const mutations = {
  setPlayer(state, data) {
    state.player = data;
  },
  setStartTimeInput(state, data) {
    state.startTimeInput = data;
  },
  setEndTimeInput(state, data) {
    state.endTimeInput = data;
  },
  setIsMobile(state, data) {
    state.isMobile = data;
  },
  setIsIOS(state, data) {
    state.isIOS = data;
  },
  setSeekbarWidth(state, data) {
    state.seekbarWidth = data;
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
