const state = {
  showBoarding: false,
  showFooterTour: false,
};

const getters = {
  showBoarding: (state) => state.showBoarding,
  showFooterTour: (state) => state.showFooterTour,
};

const mutations = {
  setShowBoarding(state, data) {
    state.showBoarding = data;
  },
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
