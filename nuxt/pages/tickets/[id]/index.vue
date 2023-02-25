<script setup>

const { ticket } = useFindOrFailTicket();
</script>
<template>
    <div class="container">
        <TicketView v-if="ticket" :ticket="ticket"></TicketView>
    </div>
</template>