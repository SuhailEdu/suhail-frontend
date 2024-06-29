import axios from "axios";


axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = "http://127.0.0.1:4000";

export default axios