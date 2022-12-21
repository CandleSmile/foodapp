import axios from "axios";
import conf from "./configapi.js";
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
  getFood: async (searchstring) => {
    const url = `${
      searchstring ? conf.getSearchProducts : conf.getLatestProducts
    }${searchstring ?? ""}`;
    const res = await getAxiosReq(url);
    return {
      ok: res.ok,
      data: res.data.meals,
      error: res.error,
    };
  },
  getFoodById: async (id) => {
    const url = `${conf.getFoodByIdUrl}${id}`;
    return await getAxiosReq(url);
  },
};
