import axios, {InternalAxiosRequestConfig} from "axios";
import useAuthStore from "@/stores/AuthStore";
import {useEffect} from "react";

export function useApi() {

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
// axios.defaults.baseURL = "https://suhail.lilash.dev";
  axios.defaults.baseURL = "http://127.0.0.1:4000";



  const user = useAuthStore(state => state.user);

  useEffect(() => {

    const reqInterceptor = axios.interceptors.request.use( (config:InternalAxiosRequestConfig) => {
      console.log('interceptor token:'  ,user.token)
      if(user.isLoggedIn) {
        config.headers.Authorization =  `Bearer ${user.token}`;
      }
      return config;
    })

    return () => {
      axios.interceptors.request.eject(reqInterceptor);

    }

  }, [user.isLoggedIn]);




  return axios

}
