import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  headerMessage: "",
};

const getters = {
  headerMessage: (state) => state.headerMessage,
};

const mutations = {
  setHeaderMessage(state, data) {
    state.headerMessage = data;
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
