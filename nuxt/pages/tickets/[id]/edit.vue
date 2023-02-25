<script setup>

const { ticket } = useFindOrFailTicket();
const onCancel = () => {
    navigateTo("/tickets");
}
</script>
<template>
    <div class="container" v-if="ticket">
        <TicketForm :ticket="ticket" @cancel="onCancel"></TicketForm>
    </div>
</template>