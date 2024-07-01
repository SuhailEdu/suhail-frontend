
import axios from "axios";
import useAuthStore from "@/stores/AuthStore";
import {useEffect} from "react";

//

export function useApi() {
  const user = useAuthStore(state => state.user);

// axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.headers["Accept"] = 'application/json'
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
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


  console.log(user.token)
  // axios

  return axios.create({
    baseURL: "http://134.122.87.199:4000",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

}
