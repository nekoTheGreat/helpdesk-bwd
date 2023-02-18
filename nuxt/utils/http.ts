import { Dict } from "~~/types/datastructures"
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from "~~/types/api";
import { useAuthStore } from "~~/stores/authStore";

export function http_build_query(data: Dict) : string{
    let items: string[] = [];
    for(var prop in data){
        const val: any = data[prop];
        items.push(`${prop}=${ encodeURI(val) }`);
    }
    return items.join('&');
}
export function toURLSearchParams(data: Dict): URLSearchParams{
    const params = new URLSearchParams();
    for(var prop in data){
        const val: any = data[prop];
        params.append(prop, val);
    }
    return params;
}
export function toFormData(data: Dict): FormData{
    const form = new FormData();
    for(var prop in data){
        const val: any = data[prop];
        form.append(prop, val);
    }
    return form;
}
export async function request(url: string, method: string = "GET", payload?: Dict, headers?: Dict)
{
    let config = {
        url: url,
        method: method, 
        body: null,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    } as AxiosRequestConfig;
    if(headers){
        config.headers = Object.assign(config.headers, headers);
    }
    config.headers = Object.assign(config.headers, getAuthTokenHeader());
    if(method.toLocaleLowerCase() == 'GET'){
        config.params = payload;
    }else{
        config.data = payload;
    }
    try{
        const resp = await axios(config);
        const data = resp.data;
        return Promise.resolve({data: Object.assign({}, data), status: resp.status});
    }catch(e){
        const axiosErr = e as AxiosError;
        const data = axiosErr.response?.data ?axiosErr.response.data : axiosErr.message;
        let payload = { message: "", errors: [], status: 500};
        if(typeof(data) == 'string') payload.message = data;
        else if(typeof(data) == 'object' && data.hasOwnProperty('errors')){
            const apiData = data as ApiError;
            let messages = [] as string[];
            if(apiData.errors) for(const [k, v] of Object.entries(apiData.errors)){
                messages.push(v);
            }
            payload.message = messages.join(' ');
            payload.errors = apiData.errors;
            payload.status = apiData.status_code;
        }
        return Promise.reject(payload);
    }
}
export function getAuthTokenHeader(){
    const headers = {} as Dict;
    const authStore = useAuthStore();
    if(authStore.authenticated){
        headers['Authorization'] = "Token "+authStore.token;
    }
    return headers;
}