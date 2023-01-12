import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_ACTION,
  LOGOUT_ACTION,
} from "@/store/storeConstants";
const user = localStorage.getItem("user");

// initial state
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: "" };

// getters
const getters = {};

// actions
const actions = {
  [LOGIN_ACTION]({ commit }, user) {
    localStorage.setItem("user", user);
    commit(LOGIN_SUCCESS, user);
  },
  [LOGOUT_ACTION]({ commit }) {
    localStorage.removeItem("user");
    commit(LOGOUT);
  },
};

// mutations
const mutations = {
  [LOGIN_FAILURE](state) {
    state.user = "";
    state.status.loggedIn = false;
  },
  [LOGIN_SUCCESS](state, user) {
    state.user = user;
    state.status.loggedIn = true;
  },
  [LOGOUT](state) {
    state.user = "";
    state.status.loggedIn = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
