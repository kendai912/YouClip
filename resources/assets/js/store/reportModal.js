import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  isReportModalOpen: false,
};

const getters = {
  isReportModalOpen: (state) => state.isReportModalOpen,
};

const mutations = {
  openReportModal(state) {
    state.isReportModalOpen = true;
  },
  closeReportModal(state) {
    state.isReportModalOpen = false;
  },
};

const actions = {
  async report(context, params) {
    const response = await axios.post("/api/report", params);
    if (response.status == CREATED) {
      // 成功した時
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
