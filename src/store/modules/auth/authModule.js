import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  LOGGED_IN,
  USER,
  ERROR,
  LOADING,
  CLEAN_ERROR_ACTION,
  REGISTRATION_ACTION,
  CHECK_LOGIN_ACTION,
  SHOW_NOTIFY_INFO,
  CLEAR_NOTIFY_INFO_ACTION,
  CHANGE_PASSWORD_ACTION,
} from "@/store/storeConstants";
import { foodApi } from "@/api/index";

import { statusCodes } from "@/api/consts/statusCodes";
const user = localStorage.getItem("user");

// initial state
const state = user
  ? {
      status: { loggedIn: true },
      user,
      popupInfo: "",
      error: "",
      loading: false,
    }
  : {
      status: { loggedIn: false },
      user: "",
      popupInfo: "",
      error: "",
      loading: false,
    };

// getters
const getters = {
  [LOGGED_IN]: ({ status: { loggedIn } }) => loggedIn,
  [USER]: ({ user }) => user,
  [ERROR]: ({ error }) => error,
  [LOADING]: ({ loading }) => loading,
  [SHOW_NOTIFY_INFO]: ({ popupInfo }) => popupInfo,
};

// actions
const actions = {
  async [LOGIN_ACTION]({ commit }, { user, password }) {
    commit("setError", "");
    commit("setLoading", true);
    try {
      const result = await foodApi.auth.login(user, password);

      if (result.status == statusCodes.OK) {
        localStorage.setItem("user", user);
        commit("setUser", user);
        commit("setLoggedIn", true);
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
    commit("setError", "");
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
        commit("setError", res.error?.message);
      }
    } catch (err) {
      commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
  },

  [CLEAN_ERROR_ACTION]({ commit }) {
    commit("setError", "");
  },

  async [CHECK_LOGIN_ACTION]({ commit, state }) {
    if (state.user != "") {
      const res = await foodApi.auth.checkLogin(state.user);

      if (res.status == statusCodes.OK && res.data == false) {
        localStorage.removeItem("user");
        commit("setUser", "");
        commit("setLoggedIn", false);
        commit("setPopup", "Please, login again. Your token was expired.");
      }
    }
  },

  async [CLEAR_NOTIFY_INFO_ACTION]({ commit }) {
    commit("setPopup", "");
  },

  async [CHANGE_PASSWORD_ACTION](
    { commit },
    { password, passwordConfirmation }
  ) {
    commit("setError", "");
    commit("setLoading", true);
    try {
      const res = await foodApi.auth.changePassword(
        password,
        passwordConfirmation
      );
      if (res.status == statusCodes.OK) {
        commit("setPopup", "Your password has been changed");
        document.forms["change-password"].reset();
      } else {
        commit("setError", res.error?.message);
      }
    } catch (err) {
      commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
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
  setPopup(state, info) {
    state.popupInfo = info;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
