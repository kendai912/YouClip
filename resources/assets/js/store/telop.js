import axios from "axios";
import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
} from "../util";
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

const actions = {
  async deleteOneTelop(context, deleteIndex) {
    // delete from DB when having id
    let telopId =
      context.getters["telopsArray"][context.getters["telopsArrayIndex"]][
        deleteIndex
      ].id;
    if (telopId) {
      const response = await axios.delete("/api/telop/delete/" + telopId);
      if (response.status == DELETED) {
        // 成功した時
      } else if (response.status == INTERNAL_SERVER_ERROR) {
        // 失敗した時
        context.commit("error/setCode", response.status, { root: true });
      } else {
        // 上記以外で失敗した時
        context.commit("error/setCode", response.status, { root: true });
      }
    }

    context.commit("spliceOneTelop", deleteIndex);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
