import axios from "axios";
import conf from "./configapi";
axios.defaults.baseURL = `${conf.mainUrl}${conf.apiKey}`;

const getAxiosReq = async (url, parameters) => {
  let result = {
    ok: false,
    data: null,
    error: null,
  };
  try {
    const response = await axios.get(url, { params: parameters });
    result.ok = true;
    result.data = response.data;
  } catch (error) {
    if (error.response) {
      result.Error = new Error(error.response.data);
    } else if (error.request) {
      result.Error = new Error(error.request);
    } else {
      result.Error = new Error(error.message);
    }
  }

  return result;
};

export { getAxiosReq };
