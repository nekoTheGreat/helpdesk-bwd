<script setup>
import useFindOrFailTicketfunction from '~~/composables/findOrFailTicket';


const { ticket } = useFindOrFailTicketfunction();
</script>
<template>
    <div class="container">
        <TicketView v-if="ticket" :ticket="ticket"></TicketView>
    </div>
</template>