import conf from "./configapi.js";
// rewrite to axios or make common functionality for fetch
export default {
  getFood: async (searchstring) => {
    let result = {
      ok: false,
      data: null,
      error: null,
    };
    const url = `${conf.mainUrl}${conf.apiKey}${
      searchstring ? conf.getSearchProducts : conf.getLatestProducts
    }${searchstring ?? ""}`;

    const mealRes = await fetch(url, {
      method: "get",
    });

    if (!mealRes.ok) {
      result.error = new Error(mealRes.statusText);
      result.error.json = await mealRes.json();
    } else {
      const meals = await mealRes.json();
      result.ok = true;
      result.data = meals && meals.meals ? meals.meals : [];
    }

    return result;
  },
  getFoodById: async (id) => {
    let result = {
      ok: false,
      data: null,
      error: null,
    };

    const url = `${conf.mainUrl}${conf.apiKey}${conf.getFoodByIdUrl}${id}`;
    const food = await fetch(url, {
      method: "get",
    });

    if (!food.ok) {
      result.error = new Error(food.statusText);
      result.error.json = await food.json();
    } else {
      result.ok = true;
      const r = await food.json();
      result.data = r;
    }

    return result;
  },
};
