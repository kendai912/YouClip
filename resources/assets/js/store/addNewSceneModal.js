const state = {
  showAddNewSceneModal: false,
};

const getters = {
  showAddNewSceneModal: (state) => state.showAddNewSceneModal,
};

const mutations = {
  openAddNewSceneModal(state) {
    state.showAddNewSceneModal = true;
  },
  closeAddNewSceneModal(state) {
    state.showAddNewSceneModal = false;
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
