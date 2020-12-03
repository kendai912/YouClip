import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  headerMessage: "",
  showBackIcon: false,
  loading: false,
};

const getters = {
  headerMessage: (state) => state.headerMessage,
  showBackIcon: (state) => state.showBackIcon,
  loading: (state) => state.loading,
};

const mutations = {
  setHeaderMessage(state, data) {
    state.headerMessage = data;
  },
  setShowBackIcon(state, data) {
    state.showBackIcon = data;
  },
  setIsLoading(state) {
    state.loading = true;
  },
  setNotLoading(state) {
    state.loading = false;
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
