const state = {
  isLoading: false,
  NumberOfItemsPerPagination: 5
};

const getters = {
  isLoading: state => state.isLoading,
  numberOfItemsPerPagination: state => state.NumberOfItemsPerPagination
};

const mutations = {
  setIsLoading(state, data) {
    state.isLoading = data;
  },
  setNumberOfItemsPerPagination(state, data) {
    state.numberOfItemsPerPagination = data;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
