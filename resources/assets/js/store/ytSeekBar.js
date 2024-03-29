import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  player: null,
  startTimeInput: null,
  endTimeInput: null,
};

const getters = {
  player: (state) => state.player,
  startTimeInput: (state) => state.startTimeInput,
  endTimeInput: (state) => state.endTimeInput,
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
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
