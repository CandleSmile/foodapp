import axios from "axios";
const apiKey = "9973533";
const mainUrl = "https://www.themealdb.com/api/json/v2/";
axios.defaults.baseURL = `${mainUrl}${apiKey}`;

export { apiKey, mainUrl, axios };
