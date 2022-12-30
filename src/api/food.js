import axios from "axios";
import conf from "./configapi.js";
import { FilterType } from "../const/filterType";

axios.defaults.baseURL = `${conf.mainUrl}${conf.apiKey}`;

const getAxiosReq = async (url, parameters) => {
  let result = {
    ok: false,
    data: null,
    error: null,
  };
  await await axios
    .get(url, { params: parameters })
    .then((response) => {
      result.ok = true;
      result.data = response.data;
    })
    .catch((error) => {
      if (error.response) {
        result.Error = new Error(error.response.data);
      } else if (error.request) {
        result.Error = new Error(error.request);
      } else {
        result.Error = new Error(error.message);
      }
    });
  return result;
};

export default {
  getFoodByFilters: async (filters) => {
    const catFilters = filters[FilterType.CATEGORY];
    const searchFilter = filters[FilterType.SEARCH];
    const ingridientsFilter = filters[FilterType.INGRIDIENTS];

    let url = "";
    if (catFilters != "") url = `${conf.getProductsByCategoryUrl}${catFilters}`;
    else if (ingridientsFilter != "")
      url = `${conf.getFoodByIngridients}${ingridientsFilter}`;
    else url = `${conf.getSearchProducts}${searchFilter}`;

    const res = await getAxiosReq(url);

    let meals = res.data?.meals;
    // fix because this api don't return category name in the list of meals
    if (catFilters != "")
      meals.forEach((food) => {
        food.strCategory = catFilters;
      });

    //case filter by ingridients after filtering by category
    if (ingridientsFilter != "" && catFilters != "") {
      const resByIngridients = await getAxiosReq(
        `${conf.getFoodByIngridients}${ingridientsFilter}`
      );

      if (resByIngridients.ok && resByIngridients.data) {
        if (!resByIngridients.data.meals) {
          meals = [];
        }
        meals = meals.filter(
          (meal) =>
            resByIngridients.data.meals.findIndex(
              (mbi) => mbi.idMeal == meal.idMeal
            ) >= 0
        );
      }
    }

    //case when filter category and/or ingridients -> search
    if ((catFilters != "" || ingridientsFilter != "") && searchFilter != "") {
      meals = meals.filter((f) =>
        f.strMeal.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    return {
      ok: res.ok,
      data: meals,
      error: res.error,
    };
  },

  getInitialFood: async () => {
    const res = await getAxiosReq(`${conf.getLatestProducts}`);
    return {
      ok: res.ok,
      data: res.data?.meals,
      error: res.error,
    };
  },

  getFoodById: async (id) => {
    const url = `${conf.getFoodByIdUrl}${id}`;
    return await getAxiosReq(url);
  },

  getAllCategoriesWithImages: async () => {
    const res = await getAxiosReq(`${conf.getCategoriesUrl}`);

    return {
      ok: res.ok,
      data: res.data?.categories,
      error: res.error,
    };
  },
  getListCategories: async () => {
    const res = await getAxiosReq(`${conf.getListCategories}`);
    return {
      ok: res.ok,
      data: res.data?.meals,
      error: res.error,
    };
  },

  getIngridientsList: async () => {
    const res = await getAxiosReq(`${conf.getIngridientsList}`);
    return {
      ok: res.ok,
      data: res.data?.meals,
      error: res.error,
    };
  },
};
