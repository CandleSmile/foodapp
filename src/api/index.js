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

        //1. Search query (in any case to get all info)
        const res = await getAxiosReq(
          `${apiUrls.getSearchProducts}${searchFilter}`
        );

        let meals = res.data?.meals;

        //2. Filter by category if chosen
        if (catFilter != "") {
          meals = meals.filter((f) =>
            f.strCategory.toLowerCase().includes(catFilter.toLowerCase())
          );
        }
        //2. Filter by ingredients if chosen
        if (ingredientsFilter != "") {
          const resByIngredients = await getAxiosReq(
            `${apiUrls.getFoodByIngredients}${ingredientsFilter}`
          );

          if (resByIngredients.ok && resByIngredients.data) {
            if (!resByIngredients.data.meals) {
              meals = [];
            }
            meals = meals.filter(
              (meal) =>
                resByIngredients.data.meals.findIndex(
                  (mbi) => mbi.idMeal == meal.idMeal
                ) >= 0
            );
          }
        }

        return {
          ok: res.ok,
          data: meals,
          error: res.error,
        };
      },
      initialFoods: async () => {
        const res = await getAxiosReq(`${apiUrls.getLatestProducts}`);
        return {
          ok: res.ok,
          data: res.data?.meals,
          error: res.error,
        };
      },

      foodById: async (id) => {
        const url = `${apiUrls.getFoodByIdUrl}${id}`;
        return await getAxiosReq(url);
      },
    },
  },
  category: {
    get: {
      allCategoriesWithImages: async () => {
        const res = await getAxiosReq(`${apiUrls.getCategoriesUrl}`);

        return {
          ok: res.ok,
          data: res.data?.categories,
          error: res.error,
        };
      },
      listCategories: async () => {
        const res = await getAxiosReq(`${apiUrls.getListCategories}`);
        return {
          ok: res.ok,
          data: res.data?.meals,
          error: res.error,
        };
      },
    },
  },
  ingredients: {
    get: {
      ingredientsList: async () => {
        const res = await getAxiosReq(`${apiUrls.getIngredientsList}`);
        return {
          ok: res.ok,
          data: res.data?.meals,
          error: res.error,
        };
      },
    },
  },
};
export { api as foodApi };
