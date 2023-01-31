import { post, get } from "./axiosRequests";
import apiUrls from "./consts/apiUrls.js";
import { FilterType } from "../const/filterType";
import { statusCodes } from "./consts/statusCodes";

const api = {
  food: {
    get: {
      foodByFilters: async (filters) => {
        const catFilter = filters[FilterType.CATEGORY];
        const searchFilter = filters[FilterType.SEARCH];
        const ingredientsFilter = filters[FilterType.INGREDIENTS];

        //1. Search and ingredients query

        const {
          data: meals,
          ok,
          error,
        } = await post(apiUrls.getMealsUrl, {
          searchString: searchFilter,
          categoryId: catFilter,
          idsIngredients:
            ingredientsFilter != null ? ingredientsFilter.split(",") : [],
        });

        return { meals, error, ok };
      },
      latestMeals: async () => {
        let { ok, data: meals, error } = await get(apiUrls.getLatestMealsUrl);

        return { ok, meals, error };
      },

      foodById: async (id) => {
        return await get(apiUrls.getFoodByIdUrl, id);
      },
    },
  },
  categories: {
    get: {
      listCategories: async () => {
        const {
          ok,
          data: categories,
          error,
        } = await get(apiUrls.getCategoriesUrl);

        return { ok, categories, error };
      },
    },
  },
  ingredients: {
    get: {
      ingredients: async () => {
        const { ok, data, error } = await get(apiUrls.getIngredientsUrl);
        return {
          ok,
          data,
          error,
        };
      },
    },
  },

  shop: {
    post: {
      buy: async (items) => {
        console.log(items);
        const pr = new Promise((resolve, reject) => {
          setTimeout(() => {
            // simulate random buy failure

            if (Math.random() > 0.5 || navigator.webdriver) {
              resolve({ isDone: true, error: "" });
            } else {
              reject(new Error("API ERROR!!!"));
            }
          }, 3000);
        });
        try {
          const res = await pr;
          return res;
        } catch (err) {
          return {
            isDone: false,
            error: err.message,
          };
        }
      },
    },
  },

  auth: {
    login: async (username, password) => {
      const { status, data, error } = await post(apiUrls.loginUrl, {
        username: username,
        password: password,
      });
      return { status, data, error };
    },

    logOut: async () => {
      try {
        const { status, error } = await post(apiUrls.logOutUrl);
        return { status, error };
      } catch (err) {
        return {
          status: statusCodes.UnexpectedError,
          error: new Error("Something went wrong"),
        };
      }
    },

    register: async (username, password, passwordConfirmation) => {
      const { status, data, error } = await post(apiUrls.registerUrl, {
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
      return { status, data, error };
    },

    checkLogin: async (username) => {
      const { status, data, error } = await post(apiUrls.checkLogin, {
        userName: username,
      });
      return { status, data, error };
    },

    getUsers: async () => {
      const { status, data, error } = await get("auth/GetUsers");
      return { status, data, error };
    },
  },

  loadDb: {
    load: async (model) => {
      const { status, data, error } = await post("DbLoad/LoadDb", model);
      return { status, data, error };
    },
  },
};
export { api as foodApi };
