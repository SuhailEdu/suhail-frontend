import axios from "axios";


axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = 'application/json'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.baseURL = process.env.API_URL;
axios.defaults.baseURL = "http://134.122.87.199:4000";

export default axios