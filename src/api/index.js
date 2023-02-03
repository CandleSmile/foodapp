import { post, get, anyRequest } from "./axiosRequests";
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
          status,
          error,
        } = await post(apiUrls.getMealsUrl, {
          searchString: searchFilter,
          categoryId: catFilter == "" ? null : catFilter,
          idsIngredients:
            ingredientsFilter != "" ? ingredientsFilter.split(",") : [],
        });

        return { meals, error, status };
      },
      latestMeals: async () => {
        let {
          status,
          data: meals,
          error,
        } = await get(apiUrls.getLatestMealsUrl);

        return { status, meals, error };
      },

      foodById: async (id) => {
        return await get(apiUrls.getFoodByIdUrl, { id });
      },
    },
  },
  categories: {
    get: {
      listCategories: async () => {
        const {
          status,
          data: categories,
          error,
        } = await get(apiUrls.getCategoriesUrl);

        return { status, categories, error };
      },
    },
  },
  ingredients: {
    get: {
      ingredients: async () => {
        const { status, data, error } = await get(apiUrls.getIngredientsUrl);
        return {
          status,
          data,
          error,
        };
      },
    },
  },

  shop: {
    post: {
      buy: async (items) => {
        const cart = {
          cartItems: items.map((item) => ({
            mealId: item.id,
            quantity: item.quantity,
            price: item.price,
            title: item.title,
          })),
        };
        const { status, data, error } = await post(apiUrls.makeOrderUrl, cart);
        return { status, data, error };
      },
    },
    get: {
      orders: async () => {
        const { status, data, error } = await get(apiUrls.getOrderUrl);
        return { status, data, error };
      },
    },
  },

  auth: {
    login: async (username, password) => {
      const { status, data, error } = await post(
        apiUrls.loginUrl,

        {
          username: username,
          password: password,
        }
      );
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
      const { status, data, error } = await anyRequest(
        apiUrls.checkLogin,
        "POST",
        {
          userName: username,
        }
      );
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
