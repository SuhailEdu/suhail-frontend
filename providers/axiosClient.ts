import axios from "axios";


axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default axios