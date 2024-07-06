import axios from "axios";
import useAuthStore from "@/stores/AuthStore";

//

export function useApi() {

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
  // axios.defaults.baseURL = "http://134.122.87.199:4000";
  // axios.defaults.baseURL = process.env.API_URL;
  axios.defaults.baseURL = "https://suhail.lilash.dev";


  const token = useAuthStore(state => state.user.token);

  axios.interceptors.request.use(function (config) {
    console.log(token)
    if(token) {
      config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
  });

  return axios

}
