import conf from "./configapi.js";
export default {
  getFood: async function (searchString) {
    let result = {
      ok: false,
      data: null,
      error: null,
    };

    const mealRes = await fetch(
      `${conf.getFoodUrl}?app_id=${conf.apiId}&app_key=${conf.apiKey}&ingr=${searchString}`,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!mealRes.ok) {
      result.error = new Error(mealRes.statusText);
      result.error.json = await mealRes.json();
    } else {
      const meals = await mealRes.json();
      result.ok = true;
      result.data = meals ? meals.hints : [];
    }

    return result;
  },
};
