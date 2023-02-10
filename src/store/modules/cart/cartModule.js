import { roundNumber } from "@/helpers/mathHelpers";
import { foodApi } from "@/api/index";
import { statusCodes } from "@/api/consts/statusCodes";
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
  GET_AVAILABLE_DATES_ACTION,
  UPDATE_DATA_AND_AVAILABLE_TIME_OPTIONS,
  UPDATE_SELECTED_TIME_ACTION,
  DELIVERY_AVAILABLE_DATE_OPTIONS,
  DELIVERY_AVAILABLE_TIME_OPTIONS,
  DELIVERY_DATE,
  DELIVERY_TIME,
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
  delivery: {
    deliveryAvailableDateOptions: [],
    deliveryAvailableTimeOptions: [],
    deliveryDate: "",
    deliveryTime: "",
  },
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

  [DELIVERY_AVAILABLE_DATE_OPTIONS]: ({
    delivery: { deliveryAvailableDateOptions: dateOptions },
  }) => dateOptions,

  [DELIVERY_AVAILABLE_TIME_OPTIONS]: ({
    delivery: { deliveryAvailableTimeOptions: timeOptions },
  }) => timeOptions,

  [DELIVERY_DATE]: ({ delivery: { deliveryDate: date } }) => date,

  [DELIVERY_TIME]: ({ delivery: { deliveryTime: time } }) => time,
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
      const res = await foodApi.shop.post.buy(
        state.items,
        state.delivery.deliveryDate,
        state.delivery.deliveryTime
      );

      if (res.status == statusCodes.OK) {
        commit("setCheckoutStatus", "Congratulations! Your purchase was done");
        commit("setCartItems", []);
        commit("setDeliveryDate", "");
        commit("setDeliveryTime", "");
        commit("setAvailableTimeSlots", []);
        localStorage.setItem("mealItems", JSON.stringify([]));
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

  async [GET_AVAILABLE_DATES_ACTION]({ commit }) {
    const result = await foodApi.shop.get.deliveryDates();
    if (result.status == statusCodes.OK) {
      commit("setAvailableDateOptions", result.data);
    }
  },

  async [UPDATE_DATA_AND_AVAILABLE_TIME_OPTIONS]({ commit }, deliveryDate) {
    commit("setDeliveryDate", deliveryDate);
    if (deliveryDate == null) {
      commit("setAvailableTimeSlots", []);
    }

    const result = await foodApi.shop.get.deliveryTimeSlots(deliveryDate);
    if (result.status == statusCodes.OK) {
      commit("setAvailableTimeSlots", result.data);
    }

    commit("setDeliveryTime", "");
  },

  [UPDATE_SELECTED_TIME_ACTION]({ commit }, deliveryTime) {
    commit("setDeliveryTime", deliveryTime);
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

  setAvailableDateOptions(state, dates) {
    state.delivery.deliveryAvailableDateOptions = dates;
  },

  setAvailableTimeSlots(state, timeSlots) {
    state.delivery.deliveryAvailableTimeOptions = timeSlots;
  },

  setDeliveryDate(state, deliveryDate) {
    state.delivery.deliveryDate = deliveryDate;
  },

  setDeliveryTime(state, deliveryTime) {
    state.delivery.deliveryTime = deliveryTime;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
