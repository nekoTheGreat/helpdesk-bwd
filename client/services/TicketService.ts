import { TicketForm } from "~~/types/api";
import { Dict } from "~~/types/datastructures";

export default class TicketService{
    
    constructor(){
        const config = useRuntimeConfig();
        this.api_url = config.public.api_url+"/tickets/";
    }

    async list(filters?: Dict){
        return await request(this.api_url, "GET");
    }
    
    async find(id: number){
        return await request(`${this.api_url}${id}`);
    }

    async store(ticket: TicketForm) {
        delete ticket.photos;
        return await request(`${this.api_url}`, "POST", ticket, {"Content-Type": "multipart/form-data"});
    }

    async update(id: number, ticket: TicketForm) {
        delete ticket.photos;
        return await request(`${this.api_url}${id}/`, "PUT", ticket, {"Content-Type": "multipart/form-data"});
    }

    async destroy(id: number){
        return await request(`${this.api_url}${id}/`, "DELETE");
    }
}