import { createStore, createLogger } from "vuex";

import meals from "./modules/meals";
import categories from "./modules/categories";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    meals,
    categories,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
