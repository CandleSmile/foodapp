import axios from "axios";

//new api
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://foodapi.somee.com/api"
    : "https://localhost:7266/api";
let axiosNew = axios.create();
axiosNew.defaults.withCredentials = true;
axiosNew.defaults.baseURL = baseUrl;

export { axiosNew, baseUrl };
