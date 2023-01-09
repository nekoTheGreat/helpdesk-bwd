import { AxiosRequestConfig, Method } from 'axios';
import { api } from 'src/boot/axios';
import { ErrorResponse } from 'src/types/common';

export class APIService
{
    basepath: string;

    constructor(basepath?: string){
        this.basepath = basepath ?? '';
    }

    private generateFullUrl(url: string){
        const tokens = [];
        if(this.basepath){
            tokens.push(this.basepath.replace(/\/\s+$/, ''));
        }
        tokens.push(url);
        return tokens.join('');
    }

    async request(url: string, method: string, payload?: any){
        const config: AxiosRequestConfig = {
            url: this.generateFullUrl(url),
            method: method as Method,
            params: undefined as any[] | undefined,
            data: undefined as any[] | undefined,
        }
        if(method == 'GET') config.params = payload;
        else config.data = payload;

        return new Promise((resolve, reject) => {
            api.request(config).then((resp) => {
                resolve(resp.data);
            }).catch(resp => {
                const error: ErrorResponse = {message: 'Unknown error', status_code: 500};
                if(resp?.response?.data){
                    if(resp?.response?.data?.errors?.non_field_errors){
                        error.message = resp?.response?.data?.errors?.non_field_errors[0] as string;
                    }else{
                        error.message = resp?.response?.data;
                    }
                }
                reject(error);
            });
        });      
    }

    async get(url: string, params?: any){
        return this.request(url, 'GET', params);
    }

    async post(url: string, payload?: any){
        return this.request(url, 'POST', payload);
    }

    async put(url: string, payload?: any){
        return this.request(url, 'PUT', payload);
    }

    async delete(url: string, payload?: any){
        return this.request(url, 'DELETE', payload);
    }
}