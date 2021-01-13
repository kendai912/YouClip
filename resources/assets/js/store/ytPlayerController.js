import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  player: null,
  isMuted: true,
};

const getters = {
  player: (state) => state.player,
  isMuted: (state) => state.isMuted,
};

const mutations = {
  setPlayer(state, data) {
    state.player = data;
  },
  setIsMuted(state, data) {
    state.isMuted = data;
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
