<script setup lang="ts">
import TicketService from '~~/services/TicketService';
import { Ticket } from '~~/types/api';
import { fullAddressFromTicket } from '~~/utils/misc';
import { useAuthStore } from '~~/stores/authStore';
import { useListDestroyView } from '~~/composables/CRUDView';
import { NekoDataTableColumn } from '~~/types/neko-components';

const authStore = useAuthStore();
const ticketService = new TicketService();
const { items: tickets, deleteData: deleteTicket, paging, getData } = useListDestroyView(ticketService);

let datatable_columns = [
    { name: 'id', label: 'Id', slot: true },
    { name: 'subject', label: 'Subject' },
    { name: 'description', label: 'Description' },
    { name: 'address', label: 'Address', slot: true },
    { name: 'publish_status', label: 'Published', class: 'text-center', style: 'width: 70px;', slot: true },
    { name: 'status', label: 'Status', class: 'text-center', style: 'width: 70px;' },
] as NekoDataTableColumn[];
if (authStore.authenticated) {
    datatable_columns.push({ name: 'actions', label: 'Actions', slot: true, class: 'text-center', style: 'width: 70px;' });
}

const onDeleteTicket = async (ticket: Ticket) => {
    const confirmed = confirm(`Are you sure you want to delete ticket #${ticket.id}`);
    if (!confirmed) return;
    await deleteTicket(ticket.id);
}

getData();
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
            <template #publish_status="slotProps">
                {{ slotProps.data.publish_status == 'published' ? 'Yes' : 'No' }}
            </template>
            <template #actions="slotProps">
                <a href="#" @click.prevent="onDeleteTicket(slotProps.data)" class="me-2" alt="Delete Ticket">
                    <i class="bi bi-trash3"></i>
                </a>
            </template>
        </NekoDataTable>
        <NekoPaging v-model="paging.page" @update:model-value="getData()"></NekoPaging>
    </div>
</template>