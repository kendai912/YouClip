const state = {
  showLoginModal: false,
  messageWhenNotLogined: "",
};

const getters = {
  showLoginModal: (state) => state.showLoginModal,
  messageWhenNotLogined: (state) => state.messageWhenNotLogined,
};

const mutations = {
  openLoginModal(state) {
    state.showLoginModal = true;
  },
  closeLoginModal(state) {
    state.showLoginModal = false;
  },
  setMessageWhenNotLogined(state, data) {
    state.messageWhenNotLogined = data;
  },
};

const actions = {
  async saveUrlIntended(context) {
    const response = await axios.get("/api/save/urlintended");
    if (response.status == OK) {
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
