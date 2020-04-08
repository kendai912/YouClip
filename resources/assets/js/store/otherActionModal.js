const state = {
  showOtherActionModal: false,
};

const getters = {
  showOtherActionModal: (state) => state.showOtherActionModal,
};

const mutations = {
  openOtherActionModal(state) {
    state.showOtherActionModal = true;
  },
  closeOtherActionModal(state) {
    state.showOtherActionModal = false;
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
