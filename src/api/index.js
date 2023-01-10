import { getAxiosReq } from "./axiosReq";
import apiUrls from "./consts/apiUrls.js";
import { FilterType } from "../const/filterType";
const api = {
  food: {
    get: {
      foodByFilters: async (filters) => {
        const catFilter = filters[FilterType.CATEGORY];
        const searchFilter = filters[FilterType.SEARCH];
        const ingredientsFilter = filters[FilterType.INGREDIENTS];

        //1. Search and ingredients query
        // set urls that we need for information
        let urls = [`${apiUrls.getSearchProducts}${searchFilter}`];
        if (ingredientsFilter != "") {
          urls.push(`${apiUrls.getFoodByIngredients}${ingredientsFilter}`);
        }

        //set results variables

        //make requests
        const requests = urls.map((url) => getAxiosReq(url));
        const response = await Promise.all(requests);

        //get responses and union it in a proper way
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

        //2. Filter by category if chosen
        if (catFilter != "") {
          meals = meals.filter((meal) =>
            meal.strCategory.toLowerCase().includes(catFilter.toLowerCase())
          );
        }
        return { ok, meals, error };
      },
      latestMeals: async () => {
        const {
          ok,
          data: { meals },
          error,
        } = await getAxiosReq(`${apiUrls.getLatestMeals}`);
        return { ok, meals, error };
      },

      foodById: async (id) => {
        const url = `${apiUrls.getFoodByIdUrl}${id}`;
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
        } = await getAxiosReq(`${apiUrls.getCategoriesUrl}`);

        return { ok, categories, error };
      },
      listCategories: async () => {
        const {
          ok,
          data: { meals },
          error,
        } = await getAxiosReq(`${apiUrls.getListCategories}`);
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
        } = await getAxiosReq(`${apiUrls.getIngredientsList}`);
        return {
          ok: ok,
          data: meals,
          error: error,
        };
      },
    },
  },
};
export { api as foodApi };
