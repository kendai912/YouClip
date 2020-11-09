import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  headerMessage: "",
  showBackIcon: false,
};

const getters = {
  headerMessage: (state) => state.headerMessage,
  showBackIcon: (state) => state.showBackIcon,
};

const mutations = {
  setHeaderMessage(state, data) {
    state.headerMessage = data;
  },
  setShowBackIcon(state, data) {
    state.showBackIcon = data;
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
