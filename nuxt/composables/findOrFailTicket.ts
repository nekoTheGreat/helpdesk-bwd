import TicketService from '~~/services/TicketService';

export default function useFindOrFailTicket(){
    const route = useRoute();
    const id = route.params.id * 1;
    const ticketService = new TicketService();
    const ticket = ref(null)
    const loading = ref(false);

    onMounted(async () => {
        try {
            loading.value = true;
            const resp = await ticketService.find(id);
            ticket.value = resp.data;
        } catch (e) {
            throw createError({ statusCode: e.status, statusMessage: e.message, fatal: true });
        } finally {
            loading.value = false;
        }
    });

    return { ticket, ticketService, loading };
}