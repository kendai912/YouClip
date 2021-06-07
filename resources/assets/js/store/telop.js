import axios from "axios";
import { OK, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  telopsArray: [],
  telopsArrayIndex: 0,
};

const getters = {
  telopsArray: (state) => state.telopsArray,
  telopsArrayIndex: (state) => state.telopsArrayIndex,
  telops: (state) =>
    state.telopsArray[state.telopsArrayIndex]
      ? state.telopsArray[state.telopsArrayIndex]
      : [],
};

const mutations = {
  setTelopsArrayIndex(state, data) {
    state.telopsArrayIndex = data;
  },
  pushOneTelop(state, telop) {
    if (typeof state.telopsArray[state.telopsArrayIndex] === "undefined") {
      state.telopsArray.push([]);
    }
    state.telopsArray[state.telopsArrayIndex].push(telop);
  },
  pushTelops(state, telops) {
    state.telopsArray.push(telops);
  },
  spliceOneTelop(state, deleteIndex) {
    state.telopsArray[state.telopsArrayIndex].splice(deleteIndex, 1);
  },
  resetTelops(state) {
    state.telopsArrayIndex = 0;
    state.telopsArray = [];
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
