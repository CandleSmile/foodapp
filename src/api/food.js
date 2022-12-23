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
    if (filters.length == 0) {
      return {
        ok: true,
        data: null,
        error: null,
      };
    }

    const catFilters = filters[FilterType.CATEGORY];
    const searchFilter = filters[FilterType.SEARCH];
    //const ingridientsFilters = filters[FilterType.INGRIDIENTS]; for implementation
    const url =
      catFilters.length == 0
        ? `${conf.getSearchProducts}${searchFilter}`
        : `${conf.getProductsByCategoryUrl}${catFilters[0]}`;
    //filter by first category for a while
    const res = await getAxiosReq(url);

    let meals = res.data?.meals;

    if (catFilters.length > 0 && searchFilter != "") {
      meals = meals.filter((f) =>
        f.strMeal.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    if (catFilters.length > 0)
      meals.forEach((food) => {
        food.strCategory = catFilters[0];
      }); // fix because this api don't return category name in the list of meals
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
};
