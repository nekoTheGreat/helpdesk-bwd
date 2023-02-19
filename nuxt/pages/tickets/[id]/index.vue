<script setup>
import TicketService from '~~/services/TicketService';

const route = useRoute();
const id = route.params.id * 1;
const ticketService = new TicketService();
const ticket = ref(null)
onMounted(async () => {
    try {
        const resp = await ticketService.find(id);
        ticket.value = resp.data;
    } catch (e) {
        throw createError({ statusCode: e.status, statusMessage: e.message, fatal: true });
    }
});
</script>
<template>
    <div class="container">
        <TicketView :ticket="ticket"></TicketView>
    </div>
</template>