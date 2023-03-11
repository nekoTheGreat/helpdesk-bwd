import { TicketForm } from "~~/types/api";
import BaseApiService from "./BaseApiService";

export default class TicketService extends BaseApiService{
    
    setup(){
        this.setApiUrl(this.base_api_url+"tickets/");
    }

    async store(ticket: TicketForm) {
        delete ticket.photos;
        return await super.store(ticket);
    }

    async update(id: number, ticket: TicketForm) {
        delete ticket.photos;
        return await super.update(id, ticket);
    }
}