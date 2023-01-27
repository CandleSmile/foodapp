import { axiosOld, axiosNew, baseUrl } from "./configapi";
import { statusCodes } from "./consts/statusCodes";
const getAxiosReq = async (url, params) => {
  let result = {
    ok: false,
    data: null,
    error: null,
  };
  try {
    const response = await axiosOld.get(url, { params });
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

const postAxiosRequest = async (url, data) => {
  let result = {
    status: null,
    data: null,
    error: null,
  };

  try {
    const response = await axiosNew({
      url: url,
      method: "POST",
      data: data,
    });

    result.status = statusCodes.OK;
    result.data = response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status == 400) {
        result.error = new Error(error.response.data?.message);
      } else {
        result.error = new Error(error.response.data);
      }
    } else if (error.request) {
      result.error = new Error(error.request);
    } else {
      result.error = new Error(error.message);
    }
  }

  return result;
};
const axiosRequestWithToken = async (url, method, params, data) => {
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
        console.log(error.response);
        console.log(error.response.data.errorCode);
        console.log(statusCodes.TokenWasRefreshed);
        if (error.response.data.errorCode == statusCodes.TokenWasRefreshed)
          return await axiosRequestWithToken(url, method, params, data);
        else {
          result.error = new Error(error.response.data?.message);
        }
      } else if (error.response.status == 400) {
        result.error = new Error(error.response.data?.message);
      } else {
        result.error = new Error(error.response.data);
      }
    } else if (error.request) {
      result.error = new Error(error.request);
    } else {
      result.error = new Error(error.message);
    }
  }

  return result;
};

export { axiosRequestWithToken, getAxiosReq, postAxiosRequest };
