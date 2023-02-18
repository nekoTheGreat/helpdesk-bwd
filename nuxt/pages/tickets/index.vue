<script setup lang="ts">
import TicketService from '~~/services/TicketService';
import { fullAddressFromTicket } from '~~/utils/misc';

const tickets = ref([]);
const ticketService = new TicketService();
onMounted(async () => {
    const resp = await ticketService.list();
    tickets.value = resp.data.results;
});
</script>
<template>
    <div class="container">
        <div class="d-flex justify-content-end mb-2">
            <NuxtLink class="btn btn-primary" to="/tickets/new">Create Ticket</NuxtLink>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Description</th>
                    <th scope="col">Location</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="tickets.length == 0">
                    <td colspan="5" class="text-center">No records found</td>
                </tr>
                <tr v-for="ticket in tickets" :key="ticket.id">
                    <td scope="row">
                        <NuxtLink :to="'/tickets/' + ticket.id">{{ ticket.id }}</NuxtLink>
                    </td>
                    <td>{{ ticket.subject }}</td>
                    <td>{{ ticket.description }}</td>
                    <td>{{ fullAddressFromTicket(ticket) }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>