import { Dict } from "~~/utils/datastructures"
import axios, { AxiosError } from 'axios';

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
    } as UseFetchOptions;
    if(headers){
        config.headers = Object.assign(config.headers, headers);
    }
    if(method.toLocaleLowerCase() == 'GET'){
        if(typeof payload == 'object') url += "?" + http_build_query(payload);
        else if(typeof payload == 'string') url += "?" + payload;
    }else{
        for(var prop in headers){
            var _prop = prop.toLowerCase();
            var val = headers[prop];
            if(_prop == 'content-type'){
                const _val = val.toLowerCase();
                if(typeof payload == "object"){
                    if(_val != "application/json"){
                        config.body = toFormData(payload);
                    }else{
                        config.body = JSON.stringify(payload);
                    }
                }
            }
        }
        config.body = payload;
    }
    try{
        const resp = await axios(config);
        const data = resp.data;
        return Promise.resolve({data: Object.assign({}, data), status: resp.status});
    }catch(e){
        const axiosErr = e as AxiosError;
        let message = axiosErr.response?.data ?axiosErr.response.data : axiosErr.message;
        return Promise.reject({error: message, status: axiosErr.status});
    }
}