import { OK, CREATED, UNPROCESSABLE_ENTITY } from "../util";

const state = {
  user: null,
  username: null,
  twitterAccount: null,
  youtubeChannel: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null,
};

const getters = {
  check: (state) => !!state.user,
  user_id: (state) => (state.user ? state.user.id : ""),
  username: (state) => state.username,
  avatar: (state) => (state.user ? state.user.avatar : ""),
  twitterAccount: (state) => state.twitterAccount,
  youtubeChannel: (state) => state.youtubeChannel,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setUsername(state, data) {
    state.username = data;
  },
  setTwitterAccount(state, data) {
    state.twitterAccount = data;
  },
  setYoutubeChannel(state, data) {
    state.youtubeChannel = data;
  },
  setApiStatus(state, status) {
    state.apiStatus = status;
  },
  setLoginErrorMessages(state, messages) {
    state.loginErrorMessages = messages;
  },
  setRegisterErrorMessages(state, messages) {
    state.registerErrorMessages = messages;
  },
};

const actions = {
  async register(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios.post("/api/register", data);

    if (response.status == CREATED) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data.user);
      context.commit("setUsername", response.data.user.name);
      return false;
    }

    context.commit("setApiStatus", false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setRegisterErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async login(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios
      .post("/api/login", data)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
      context.commit("setUsername", response.data.name);
      return false;
    }

    context.commit("setApiStatus", false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setLoginErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async logout(context) {
    const response = await axios.post("/api/logout");
    context.commit("setUser", null);
    context.commit("setUsername", null);
  },
  async currentUser(context) {
    const response = await axios.get("/api/user");
    const user = response.data || null;
    context.commit("setUser", user);
    user ? context.commit("setUsername", user.name) : "";
    user ? context.commit("setTwitterAccount", user.twitter_account) : "";
    user ? context.commit("setYoutubeChannel", user.youtube_channel) : "";
  },
  async updateUserProfile(context, data) {
    const response = await axios
      .post("/api/updateUserProfile", data)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data.user);
      context.commit("setUsername", response.data.user.name);
      context.commit("setTwitterAccount", response.data.user.twitter_account);
      context.commit("setYoutubeChannel", response.data.user.youtube_channel);
      return false;
    }

    context.commit("setApiStatus", false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setLoginErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
