import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  headerMessage: "",
  showBackIcon: false,
  loading: false,
  step: 1,
  complete: 1,
};

const getters = {
  headerMessage: (state) => state.headerMessage,
  showBackIcon: (state) => state.showBackIcon,
  loading: (state) => state.loading,
  step: (state) => state.step,
  complete: (state) => state.complete,
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
  setStep(state, data) {
    state.step = data;
  },
  setComplete(state, data) {
    state.complete = data;
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
