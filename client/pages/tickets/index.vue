<script setup lang="ts">
import useDestroyTicket from '~~/composables/destroryTicket';
import TicketService from '~~/services/TicketService';
import { Ticket } from '~~/types/api';
import { fullAddressFromTicket } from '~~/utils/misc';
import { useAuthStore } from '~~/stores/authStore';
import { NekoDataTableColumn } from '~~/types/neko-components';

const authStore = useAuthStore();
const tickets = ref<Ticket[]>([]);
const ticketService = new TicketService();
const destroyTicket = useDestroyTicket();
let datatable_columns = [
    { name: 'id', label: 'Id', slot: true },
    { name: 'subject', label: 'Subject' },
    { name: 'description', label: 'Description' },
    { name: 'address', label: 'Address', slot: true },
] as NekoDataTableColumn[];
if (authStore.authenticated) {
    datatable_columns.push({ name: 'actions', label: 'Actions', slot: true, class: 'text-center', style: 'width: 70px;' });
}

const onDeleteTicket = async (ticket: Ticket) => {
    const res = await destroyTicket.destroy(ticket, { disableRedirect: true });
    if (res) {
        const index = tickets.value.findIndex(it => it.id == ticket.id);
        if (index > -1) tickets.value.splice(index, 1);
    }
}

onMounted(async () => {
    const resp = await ticketService.list();
    tickets.value = resp.data.results as Ticket[];
});
</script>
<template>
    <div class="container">
        <div class="d-flex justify-content-end mb-2">
            <NuxtLink v-if="authStore.authenticated" class="btn btn-primary" to="/tickets/new">Create Ticket</NuxtLink>
        </div>
        <NekoDataTable :columns="datatable_columns" :items="tickets">
            <template #id="slotProps">
                <NuxtLink :to="'/tickets/' + slotProps.data.id">{{ slotProps.data.id }}</NuxtLink>
            </template>
            <template #address="slotProps">
                {{ fullAddressFromTicket(slotProps.data) }}
            </template>
            <template #actions="slotProps">
                <a href="#" @click.prevent="onDeleteTicket(slotProps.data)" class="me-2" alt="Delete Ticket">
                    <i class="bi bi-trash3"></i>
                </a>
            </template>
        </NekoDataTable>
    </div>
</template>