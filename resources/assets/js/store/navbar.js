const state = {
  showNavbar: false,
};

const getters = {
  showNavbar: (state) => state.showNavbar,
};

const mutations = {
  setShowNavbar(state, data) {
    state.showNavbar = data;
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
