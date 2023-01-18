import { createStore, createLogger } from "vuex";

import meals from "./modules/meals";
import categories from "./modules/categories";
import filters from "./modules/filters";
import auth from "./modules/auth";
import cart from "./modules/cart";

const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: {
    meals,
    categories,
    filters,
    auth,
    cart,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
export default store;
