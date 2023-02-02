import { getAxiosReq } from "./oldAxiosReq";
import apiUrls from "./consts/oldApiUrls.js";
import { FilterType } from "../const/filterType";
import { roundNumber } from "@/helpers/mathHelpers";
const getPriceById = (id) =>
  roundNumber((id % 10) + roundNumber(id / 10000, 2), 2);
const handleResponses = (response) => {
  let {
    data: { meals },
    ok,
    error,
  } = response[0];

  if (meals && meals.length > 0 && response.length > 1) {
    for (let numReq = 1; numReq < response.length; numReq++) {
      const {
        data: { meals: mealReq },
        ok: okReq,
        error: errorReq,
      } = response[numReq];
      ok &= okReq;
      error = error ? error.concat(errorReq, " ,") : errorReq;
      if (mealReq?.length > 0) {
        meals = meals.filter(
          (meal) =>
            mealReq.findIndex((mealR) => mealR.idMeal == meal.idMeal) >= 0
        );
      } else {
        meals = [];
        break;
      }
    }
  } else if (meals == null) {
    meals = [];
  }
  return { meals, error, ok };
};

const api = {
  food: {
    get: {
      foodByFilters: async (filters) => {
        const catFilter = filters[FilterType.CATEGORY];
        const searchFilter = filters[FilterType.SEARCH];
        const ingredientsFilter = filters[FilterType.INGREDIENTS];

        //1. Search and ingredients query
        // set urls that we need for information
        let urls = [apiUrls.getSearchProducts.concat(searchFilter)];
        if (ingredientsFilter != "") {
          urls.push(apiUrls.getFoodByIngredients.concat(ingredientsFilter));
        }

        //make requests
        const requests = urls.map((url) => getAxiosReq(url));
        const response = await Promise.all(requests);

        //handle in a proper way
        let { meals, error, ok } = handleResponses(response);

        //2. Filter by category if chosen
        if (catFilter != "") {
          meals = meals.filter((meal) =>
            meal.strCategory.toLowerCase().includes(catFilter.toLowerCase())
          );
        }
        //map prices;
        meals = meals.map((meal) => ({
          ...meal,
          price: getPriceById(meal.idMeal),
        }));
        return { meals, error, ok };
      },
      latestMeals: async () => {
        let {
          ok,
          data: { meals },
          error,
        } = await getAxiosReq(apiUrls.getLatestMeals);

        meals = meals.map((meal) => ({
          ...meal,
          price: getPriceById(meal.idMeal),
        }));
        return { ok, meals, error };
      },

      foodById: async (id) => {
        const url = apiUrls.getFoodByIdUrl.concat(id);
        return await getAxiosReq(url);
      },
    },
  },
  categories: {
    get: {
      allCategoriesWithImages: async () => {
        const {
          ok,
          data: { categories },
          error,
        } = await getAxiosReq(apiUrls.getCategoriesUrl);

        return { ok, categories, error };
      },
      listCategories: async () => {
        const {
          ok,
          data: { meals },
          error,
        } = await getAxiosReq(apiUrls.getListCategories);
        return {
          ok: ok,
          data: meals,
          error: error,
        };
      },
    },
  },
  ingredients: {
    get: {
      ingredients: async () => {
        const {
          ok,
          data: { meals },
          error,
        } = await getAxiosReq(apiUrls.getIngredientsList);
        return {
          ok: ok,
          data: meals,
          error: error,
        };
      },
    },
  },
  areas: {
    get: {
      areas: async () => {
        const {
          ok,
          data: { meals },
          error,
        } = await getAxiosReq(apiUrls.getAreasList);
        return {
          ok: ok,
          data: meals,
          error: error,
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
};
export { api as oldApi };
