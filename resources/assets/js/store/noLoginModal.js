const state = {
  showLoginModal: false,
  messageWhenNotLogined: ""
};

const getters = {
  showLoginModal: state => state.showLoginModal,
  messageWhenNotLogined: state => state.messageWhenNotLogined
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
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
