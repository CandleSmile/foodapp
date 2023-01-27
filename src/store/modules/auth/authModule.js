import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  LOGGED_IN,
  USER,
  ERROR,
  LOADING,
  CLEAN_ERROR_ACTION,
  REGISTRATION_ACTION,
} from "@/store/storeConstants";
import { foodApi } from "@/api/index";

import { statusCodes } from "@/api/consts/statusCodes";
const user = localStorage.getItem("user");

// initial state
const state = user
  ? { status: { loggedIn: true }, user, error: null, users: null }
  : { status: { loggedIn: false }, user: "", error: null, users: null };

// getters
const getters = {
  [LOGGED_IN]: ({ status: { loggedIn } }) => loggedIn,
  [USER]: ({ user }) => user,
  [ERROR]: ({ error }) => error,
  [LOADING]: ({ loading }) => loading,
  users: ({ users }) => users ?? [],
};

// actions
const actions = {
  async [LOGIN_ACTION]({ commit, dispatch }, { user, password }) {
    commit("setError", null);
    commit("setLoading", true);
    try {
      const result = await foodApi.auth.login(user, password);

      if (result.status == statusCodes.OK) {
        localStorage.setItem("user", user);
        commit("setUser", user);
        commit("setLoggedIn", true);
        await dispatch("getUsers");
      } else {
        commit(
          "setError",
          result.status != statusCodes.ServerError
            ? result.error?.message
            : "Something went wrong. Please try one more time or connect with us."
        );
      }
    } catch (err) {
      commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
  },

  async [LOGOUT_ACTION]({ commit }) {
    const res = await foodApi.auth.logOut();
    console.log(res);
    if (res.status == statusCodes.OK) {
      localStorage.removeItem("user");
      commit("setUser", "");
      commit("setLoggedIn", false);
    }
  },

  async [REGISTRATION_ACTION](
    { commit, dispatch },
    { user, password, passwordConfirmation }
  ) {
    commit("setError", null);
    commit("setLoading", true);
    try {
      const res = await foodApi.auth.register(
        user,
        password,
        passwordConfirmation
      );
      if (res.status == statusCodes.OK) {
        await dispatch(LOGIN_ACTION, { user, password });
      } else {
        console.log(res);
        commit("setError", res.error?.message);
      }
    } catch (err) {
      commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
  },

  [CLEAN_ERROR_ACTION]({ commit }) {
    commit("setError", null);
  },

  async getUsers({ commit }) {
    const res = await foodApi.auth.getUsers();
    commit("setUsers", res.data);
  },
};

// mutations
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setLoggedIn(state, loggedIn) {
    state.status.loggedIn = loggedIn;
  },
  setUsers(state, users) {
    state.users = users;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
