import { roundNumber } from "@/helpers/mathHelpers";
import { foodApi } from "@/api/index";
import {
  MEALS_IN_CART,
  CART_TOTAL_PRICE,
  ADD_TO_CART_ACTION,
  CART_COUNT,
  DELETE_FROM_CART_ACTION,
  BUY_ACTION,
  LOADING,
  CHECKOUT_STATUS,
  CLEAR_CHECKOUT_ACTION,
} from "@/store/storeConstants";

// initial state
// shape: [{ id, quantity, title, price }]
const mealItems =
  localStorage.getItem("mealItems") != null
    ? JSON.parse(localStorage.getItem("mealItems"))
    : [];

const state = {
  items: mealItems,
  checkoutStatus: null,
  loading: false,
};

// getters
const getters = {
  [MEALS_IN_CART]: ({ items }) => items,

  [CART_TOTAL_PRICE]: (state, getters) =>
    getters[[MEALS_IN_CART]].reduce((total, product) => {
      return roundNumber(total + product.price * product.quantity, 2);
    }, 0),

  [CART_COUNT]: (state, getters) =>
    getters[[MEALS_IN_CART]].reduce((total, product) => {
      return total + product.quantity;
    }, 0),

  [LOADING]: ({ loading }) => loading,

  [CHECKOUT_STATUS]: ({ checkoutStatus }) => checkoutStatus,
};

// actions
const actions = {
  [ADD_TO_CART_ACTION]({ commit, getters }, meal) {
    const itemInCart = getters[[MEALS_IN_CART]].find(
      (item) => item.id === meal.id
    );
    if (!itemInCart) {
      if (meal.quantity > 0) commit("addMealToCart", meal);
    } else {
      if (meal.quantity > 0)
        commit("changeMealQuantity", { itemInCart, quantity: meal.quantity });
      else {
        commit("deleteMealFromCart", itemInCart);
      }
    }
    localStorage.setItem("mealItems", JSON.stringify(getters[[MEALS_IN_CART]]));
  },

  [DELETE_FROM_CART_ACTION]({ commit }, item) {
    commit("setCheckoutStatus", null);
    commit("deleteMealFromCart", item);
  },

  async [BUY_ACTION]({ commit, state }) {
    commit("setLoading", true);
    commit("setCheckoutStatus", null);
    try {
      const res = await foodApi.shop.post.buy(state.items);
      console.log(res);
      if (res.isDone) {
        commit("setCheckoutStatus", "Congratulations! Your purchase was done");
        commit("setCartItems", []);
      } else {
        commit("setCheckoutStatus", "There was an error: " + res.error);
      }
    } catch (err) {
      commit("setCheckoutStatus", "There was an error: " + err.message);
    } finally {
      commit("setLoading", false);
    }
  },

  [CLEAR_CHECKOUT_ACTION]({ commit }) {
    commit("setCheckoutStatus", null);
  },
};

// mutations
const mutations = {
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },

  addMealToCart(state, meal) {
    state.items.push({
      id: meal.id,
      title: meal.name,
      price: meal.price,
      quantity: meal.quantity,
    });
  },

  changeMealQuantity(state, { itemInCart, quantity }) {
    itemInCart.quantity = quantity;
  },

  deleteMealFromCart(state, itemCart) {
    state.items = state.items.filter((item) => item.id != itemCart.id);
  },

  setCartItems(state, items) {
    state.items = items;
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
