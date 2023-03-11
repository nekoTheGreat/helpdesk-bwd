import TicketService from '~~/services/TicketService';
import { Ticket } from '~~/types/api';

export interface DestroyTicketOptions{
    disableRedirect?: boolean,
    redirect?: string,
}
export default function useDestroyTicket(){
    const loading = ref(false);
    const ticketService = new TicketService();

    const destroy = async (ticket: Ticket, options?: DestroyTicketOptions) => {
        const confirmed = confirm("Are you sure you want to delete this ticket?");
        if (!confirmed) return;

        const _options = Object.assign({
            disableRedirect: false,
            redirect: '/tickets',
        }, options) as DestroyTicketOptions;
        
        try{
            loading.value = true;
            await ticketService.destroy(ticket.id);
            if(!_options.disableRedirect){
                navigateTo(_options.redirect);
            }
            return true;
        } catch(e){
            alert(e.error);
            return false;
        } finally {
            loading.value = false;
        }
    }

    return { destroy, loading };
}