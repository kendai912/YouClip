const state = {
  showConfirmationModal: false,
};

const getters = {
  showConfirmationModal: (state) => state.showConfirmationModal,
};

const mutations = {
  openConfirmationModal(state) {
    state.showConfirmationModal = true;
  },
  closeConfirmationModal(state) {
    state.showConfirmationModal = false;
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
