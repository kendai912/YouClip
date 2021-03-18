const state = {
  showFooterTour: false,
};

const getters = {
  showFooterTour: (state) => state.showFooterTour,
};

const mutations = {
  setShowFooterTour(state, data) {
    state.showFooterTour = data;
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
