import axios from "axios";

//new api
//const baseUrl = "https://foodapi.somee.com/api";
const baseUrl = "https://localhost:7266/api";
let axiosNew = axios.create();
axiosNew.defaults.withCredentials = true;
axiosNew.defaults.baseURL = baseUrl;

export { axiosNew, baseUrl };
