import { createStore, createLogger } from "vuex";

import meals from "./modules/meals";
import categories from "./modules/categories";
import filters from "./modules/filters";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    meals,
    categories,
    filters,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
