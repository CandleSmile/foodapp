import axios from "axios";

//old api
const apiKey = "9973533";
const mainUrl = "https://www.themealdb.com/api/json/v2/";

let axiosOld = axios.create();
axiosOld.defaults.baseURL = `${mainUrl}${apiKey}`;
export { apiKey, mainUrl, axiosOld };
