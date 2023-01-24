import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  LOGGED_IN,
  USER,
} from "@/store/storeConstants";
const user = localStorage.getItem("user");

// initial state
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: "" };

// getters
const getters = {
  [LOGGED_IN]: ({ status: { loggedIn } }) => loggedIn,
  [USER]: ({ user }) => user,
};

// actions
const actions = {
  [LOGIN_ACTION]({ commit }, user) {
    localStorage.setItem("user", user);
    commit("setUser", user);
    commit("setLoggedIn", true);
  },
  [LOGOUT_ACTION]({ commit }) {
    localStorage.removeItem("user");
    commit("setUser", "");
    commit("setLoggedIn", false);
  },
};

// mutations
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setLoggedIn(state, loggedIn) {
    state.status.loggedIn = loggedIn;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
