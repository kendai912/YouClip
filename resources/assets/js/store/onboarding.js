const state = {
  showBoarding: false,
  showFooterTour: false,
  showProfileTour: false,
  isBoardalFinished: false,
  isProfileTourFinished: false,
};

const getters = {
  showBoarding: (state) => state.showBoarding,
  showFooterTour: (state) => state.showFooterTour,
  showProfileTour: (state) => state.showProfileTour,
  isBoardalFinished: (state) => state.isBoardalFinished,
  isProfileTourFinished: (state) => state.isProfileTourFinished,
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
  setIsProfileTourFinished(state, data) {
    state.isProfileTourFinished = data;
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
