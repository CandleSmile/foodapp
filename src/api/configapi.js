import axios from "axios";

//old api
const apiKey = "9973533";
const mainUrl = "https://www.themealdb.com/api/json/v2/";

let axiosOld = axios.create();
axiosOld.defaults.baseURL = `${mainUrl}${apiKey}`;

//new api
const baseUrl = "https://localhost:7266/api";

let axiosNew = axios.create();
axiosNew.defaults.withCredentials = true;
axiosNew.defaults.baseURL = baseUrl;

export { apiKey, mainUrl, axiosOld, axiosNew, baseUrl };
