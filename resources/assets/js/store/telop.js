import axios from "axios";
import { OK, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  telops: [],
};

const getters = {
  telops: (state) => state.telops,
};

const mutations = {
  setTelops(state, data) {
    state.telops = data;
  },
  pushTelops(state, data) {
    state.telops.push(data);
  },
  spliceTelops(state, deleteIndex) {
    state.telops.splice(deleteIndex, 1);
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
