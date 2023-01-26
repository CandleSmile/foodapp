import { axios } from "./configapi";
import { statusCodes } from "./consts/statusCodes";
import { setCookie, getCookie } from "@/helpers/cookieHelper";

const getAxiosReq = async (url, params) => {
  let result = {
    ok: false,
    data: null,
    error: null,
  };
  try {
    const response = await axios.get(url, { params });
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
    const response = await axios({
      url: url,
      method: "POST",
      data: data,
    });

    result.status = statusCodes.OK;
    result.data = response.data;
  } catch (error) {
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
const axiosRequestAndRefreshToken = async (
  url,
  method,
  params,
  data,
  headers
) => {
  let result = {
    status: null,
    data: null,
    error: null,
  };
  const jwtToken = getCookie("token");
  headers = headers || {};
  headers["Authorization"] = "Bearer " + jwtToken;
  try {
    let response = await axios({
      url: url,
      method: method,
      params: params,
      data: data,
      headers: headers,
    });

    response = await processResponseOnTokens(
      response,
      jwtToken,
      url,
      method,
      params,
      data,
      headers
    );

    result.status = statusCodes.OK;
    result.data = response.data;
  } catch (error) {
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

const processResponseOnTokens = async (
  response,
  jwtToken,
  url,
  method,
  params,
  data,
  headers
) => {
  if (response.status === 401 && response.headers.has("Token-Expired")) {
    const refreshToken = getCookie("refreshToken");
    let refreshResponse = null;
    try {
      refreshResponse = await refresh(jwtToken, refreshToken);
    } catch {
      return response; //failed to refresh so return original 401 response
    }
    const jsonRefreshResponse = refreshResponse.response; //read the json with the new tokens

    setCookie("token", jsonRefreshResponse.token, 1);
    setCookie("refreshToken", jsonRefreshResponse.refreshToken, 1);
    await axiosRequestAndRefreshToken(url, method, params, data, headers); //repeat the original request
  } else {
    return response; //return the original 401 response
  }
};

const refresh = async (jwtToken, refreshToken) => {
  return await axios.post("token/refresh", {
    body: `token=${encodeURIComponent(
      jwtToken
    )}&refreshToken=${encodeURIComponent(refreshToken)}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { axiosRequestAndRefreshToken, getAxiosReq, postAxiosRequest };
