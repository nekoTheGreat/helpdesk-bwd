<script setup>

const { ticket } = useFindOrFailTicket();
</script>
<template>
    <div class="container">
        <TicketView :ticket="ticket"></TicketView>
    </div>
</template>