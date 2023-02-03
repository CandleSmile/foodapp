import { foodApi } from "@/api/index";
import {
  ORDERS,
  GET_ORDERS_ACTION,
  ERROR,
  LOADING,
} from "@/store/storeConstants";
// initial state
const state = {
  orders: [],
  error: null,
  loading: false,
};

const formatDate = (dt) => {
  const formatter = new Intl.DateTimeFormat("en-US");
  return formatter.format(dt);
};
// getters
const getters = {
  [ORDERS]: ({ orders }) =>
    orders.map((order) => {
      let orderFormated = { ...order };
      orderFormated.dateCreated = formatDate(
        new Date(orderFormated.dateCreated)
      );
      return {
        id: orderFormated.id,
        dateCreated: orderFormated.dateCreated,
        totalPrice: orderFormated.totalPrice,
        orderItems: orderFormated.orderItems,
      };
    }),
  [ERROR]: ({ error }) => error,
  [LOADING]: ({ loading }) => loading,
};

// actions
const actions = {
  async [GET_ORDERS_ACTION]({ commit }) {
    commit("setLoading", true);
    try {
      const res = await foodApi.shop.get.orders();
      commit("setOrders", res.data);
      commit("setError", res.error);
    } catch (err) {
      commit("setError", err);
    } finally {
      commit("setLoading", false);
    }
  },
};
const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setError(state, error) {
    state.error = error?.message;
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
