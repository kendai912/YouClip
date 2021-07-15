const state = {
  showBoarding: false,
  showFooterTour: false,
  showProfileTour: false,
};

const getters = {
  showBoarding: (state) => state.showBoarding,
  showFooterTour: (state) => state.showFooterTour,
  showProfileTour: (state) => state.showProfileTour,
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
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
