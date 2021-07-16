const state = {
  showBoarding: false,
  showFooterTour: false,
  showProfileTour: false,
  isBoardalFinished: false,
};

const getters = {
  showBoarding: (state) => state.showBoarding,
  showFooterTour: (state) => state.showFooterTour,
  showProfileTour: (state) => state.showProfileTour,
  isBoardalFinished: (state) => state.isBoardalFinished,
};

const mutations = {
  setShowBoarding(state, data) {
    state.showBoarding = data;
  },
  setShowFooterTour(state, data) {
    state.showFooterTour = data;
  },
  setShowProfileTour(state, data) {
    state.showProfileTour = data;
  },
  setIsBoardalFinished(state, data) {
    state.isBoardalFinished = data;
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
