import { parseCookies } from 'nookies';
import axios from 'axios';



export function getApiClient(ctx) {

    const { 'token-name': token } = parseCookies(ctx); 

    const api = axios.create({
        baseURL: "http://200.129.18.20"
    })

    api.interceptors.request.use((config) => {
        return config
    })
    if (token) {
        api.defaults.headers['x-access-token'] = token;
    }

    return api
}