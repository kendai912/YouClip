const state = {
  snackbar: false,
  timeout: 5000,
  color: "blue",
  text: ""
};

const getters = {
  snackbar: state => state.snackbar,
  timeout: state => state.timeout,
  color: state => state.color,
  text: state => state.text
};

const mutations = {
  setSnackbar(state, data) {
    state.snackbar = data;
  },
  setTimeout(state, data) {
    state.timeout = data;
  },
  setColor(state, data) {
    state.color = data;
  },
  setText(state, data) {
    state.text = data;
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
