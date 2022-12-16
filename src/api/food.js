import conf from "./configapi.js";
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
};
