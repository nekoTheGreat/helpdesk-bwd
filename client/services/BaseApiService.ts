import { Dict } from "~~/types/datastructures";
import { ApiResponse, PagingConfig } from "~~/types/api";

export default class BaseApiService{
    protected base_api_url: string = '';
    protected api_url: string = '';

    constructor(){
        const config = useRuntimeConfig();
        this.base_api_url = config.public.api_url;
        this.setup();
    }

    setup(){
        // Custom logic
    }

    setApiUrl(url: string){
        this.api_url = url;
    }
    getApiUrl() : string {
        return this.api_url;
    }

    async list(filters?: Dict, pageConfig?: PagingConfig, sortBy?: Dict){
        const payload = Object.assign({}, filters, pageConfig, sortBy);
        const { data, status } = await request(this.api_url, "GET", payload);
        return {data: data.results, status: status} as ApiResponse;
    }
    
    async find(id: number, options?: Dict){
        return await request(`${this.api_url}${id}`, 'GET', options);
    }

    async store(data: any) {
        return await request(`${this.api_url}`, "POST", data, {"Content-Type": "multipart/form-data"});
    }

    async update(id: number, data: any) {
        return await request(`${this.api_url}${id}/`, "PUT", data, {"Content-Type": "multipart/form-data"});
    }

    async destroy(id: number){
        return await request(`${this.api_url}${id}/`, "DELETE");
    }
}