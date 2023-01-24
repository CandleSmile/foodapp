import { createStore, createLogger } from "vuex";

import meals from "./modules/meals/mealsModule";
import categories from "./modules/categories/categoriesModule";
import filters from "./modules/filters/filtersModule";
import auth from "./modules/auth/authModule";
import cart from "./modules/cart/cartModule";

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
