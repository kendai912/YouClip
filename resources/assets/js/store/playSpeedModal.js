const state = {
  showPlaySpeedModal: false,
};

const getters = {
  showPlaySpeedModal: (state) => state.showPlaySpeedModal,
};

const mutations = {
  openPlaySpeedModal(state) {
    state.showPlaySpeedModal = true;
  },
  closePlaySpeedModal(state) {
    state.showPlaySpeedModal = false;
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
