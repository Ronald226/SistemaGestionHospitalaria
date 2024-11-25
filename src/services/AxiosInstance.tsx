import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_RUTA_API;


const axiosInstance = axios.create();

export default axiosInstance;