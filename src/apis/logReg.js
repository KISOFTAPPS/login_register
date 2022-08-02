import axios from "axios";
import { getEnvVariables } from "../helpers";

// Con el uso de la funcion de helpers llamas a la variable de entorno del endpoint
const { VITE_API_URL } = getEnvVariables();

// Obtiene el endpoint de la API
const logReg = axios.create({
    baseURL: VITE_API_URL,
});



//Interceptores para optener token de autenticacion
logReg.interceptors.request.use(config =>{
    config.headers = {
        ...config.headers,
        "x-token": localStorage.getItem("token")
    }
    return config;
})

export default logReg;