<script setup>

const { ticket } = useFindOrFailTicket();
const onSubmit = (form) => {
    console.log(form);
};
</script>
<template>
    <div class="container">
        <TicketForm :ticket="ticket" @update:model-value="onSubmit"></TicketForm>
    </div>
</template>