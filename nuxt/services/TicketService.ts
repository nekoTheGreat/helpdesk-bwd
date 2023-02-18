import { Dict } from "~~/types/datastructures";

export default class TicketService{
    
    constructor(){
        const config = useRuntimeConfig();
        this.api_url = config.public.api_url+"/tickets/";
    }

    async list(filters?: Dict){
        return await request(this.api_url, "GET");
    }
}