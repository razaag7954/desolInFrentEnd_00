import api from "./baseApi"
import {PROD_URL} from "../utils/baseURLs";
export const LogIn = async (data) => {
    return await api().post(`${PROD_URL}signin`, data )
}