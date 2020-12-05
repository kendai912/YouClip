import axios from "axios";
import { DELETED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  showTagDeleteModal: false,
  tagId: "",
  tagName: "",
  tagIndex: 0,
};

const getters = {
  showTagDeleteModal: (state) => state.showTagDeleteModal,
  tagId: (state) => state.tagId,
  tagName: (state) => state.tagName,
  tagIndex: (state) => state.tagIndex
};

const mutations = {
  openTagDeleteModal(state) {
    state.showTagDeleteModal = true;
  },
  closeTagDeleteModal(state) {
    state.showTagDeleteModal = false;
  },
  setTagId(state, data) {
    state.tagId = data;
  },
  setTagIndex(state, data) {
    state.tagIndex = data;
  },
  setTagName(state, data) {
    state.tagName = data;
  },
};

const actions = {
  async deleteTag(context) {
    let params = {
      tagId: state.tagId,
    };

    const response = await axios.post("/api/tag/delete", params);
    if (response.status == DELETED) {
      // 成功した時
      return true;
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
      return false;
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
