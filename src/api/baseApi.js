import axios from "axios";
import {PROD_URL} from "../utils/baseURLs";



// base Generics function for any request
export default function api( endpoint = PROD_URL, auth = true ) {
    const instance = axios.create({
        baseURL: endpoint
    });
    instance.interceptors.request.use(
        async (config) => {
            config.headers.Accept = "application/json";
            config.headers["Content-Type"] = "application/json";
            return config;
        },
        (error) => Promise.reject(error)
    );
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            return Promise.reject(error);
        }
    );
    return instance;
}
