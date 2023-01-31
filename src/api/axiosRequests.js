import { axiosNew, baseUrl } from "./configapi";
import { statusCodes } from "./consts/statusCodes";

const postAxiosRequest = async (url, data) =>
  await axiosAnyRequest(url, "POST", null, data);
const getAxiosRequest = async (url, data) =>
  await axiosAnyRequest(url, "GET", null, data);

const axiosAnyRequest = async (url, method, params, data) => {
  let result = {
    status: null,
    data: null,
    error: null,
  };

  try {
    let response = await axiosNew({
      url: url,
      method: method,
      params: params,
      data: data,
      withCredentials: true,
      baseURL: baseUrl,
    });

    return { status: statusCodes.OK, data: response.data, error: null }; //return the original response
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && error.response.data) {
        if (error.response.data.errorCode == statusCodes.TokenWasRefreshed)
          return await axiosAnyRequest(url, method, params, data);
        else {
          result.error = new Error(error.response.data?.message);
        }
      } else if (error.response.status == 400 || error.response.status == 404) {
        result.error = new Error(error.response.data?.message);
      } else {
        result.error = new Error(
          error.response.data.title ?? error.response.data
        );
      }
    } else if (error.request) {
      result.error = new Error(error.request);
    } else {
      result.error = new Error(error.message);
    }
  }

  return result;
};

export {
  postAxiosRequest as post,
  getAxiosRequest as get,
  axiosAnyRequest as anyRequest,
};
