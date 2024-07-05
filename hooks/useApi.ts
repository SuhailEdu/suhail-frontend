import axios from "axios";
import useAuthStore from "@/stores/AuthStore";

//

export function useApi() {

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
  axios.defaults.baseURL = "http://127.0.0.1:4000";
// axios.defaults.baseURL = "http://134.122.87.199:4000";
//
// axios.interceptors.request.use((config) => {
//   if(!config.headers.Authorization) {
//     console.log(user.token)
//
//   }
//   return config
//
// })

  // return axios;
  const token = useAuthStore(state => state.user.token);

  axios.interceptors.request.use(function (config) {
    console.log(token)
    if(token) {
      config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
  });

  return axios


  // axios

  // return axios.create({
  //   // baseURL: "http://134.122.87.199:4000",
  //   baseURL: "http://127.0.0.1:4000",
  //   headers: {
  //     Authorization: `Bearer ${user.token}`,
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   }
  // })

}
