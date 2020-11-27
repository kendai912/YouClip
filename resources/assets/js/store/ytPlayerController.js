import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  player: null,
};

const getters = {
  player: (state) => state.player,
};

const mutations = {
  setPlayer(state, data) {
    state.player = data;
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
