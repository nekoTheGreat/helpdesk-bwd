<script setup>

const { ticket } = useFindOrFailTicket();
const onSubmitted = (payload) => {
    navigateTo("/tickets/" + payload.id);
}
const onCancel = () => {
    navigateTo("/tickets/" + ticket.value.id);
}
</script>
<template>
    <div class="container" v-if="ticket">
        <TicketForm :ticket="ticket" @update:modelValue="onSubmitted" @cancel="onCancel"></TicketForm>
    </div>
</template>