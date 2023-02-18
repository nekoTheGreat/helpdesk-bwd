<script setup>
import TicketService from '~~/services/TicketService';

const route = useRoute();
const id = route.params.id * 1;
const ticketService = new TicketService();
const ticket = ref(null)
onMounted(async () => {
    const resp = await ticketService.find(id);
    ticket.value = resp.data;
});
</script>
<template>
    <div class="container">
        <TicketView :ticket="ticket"></TicketView>
    </div>
</template>