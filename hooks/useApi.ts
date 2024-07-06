import axios from "axios";
import useAuthStore from "@/stores/AuthStore";

//

export function useApi() {

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
  axios.defaults.baseURL = process.env.API_URL;


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
