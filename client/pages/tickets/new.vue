<script setup>
const onSubmitted = (payload) => {
    navigateTo("/tickets/" + payload.id);
}
const onCancel = () => {
    navigateTo("/tickets");
}
</script>
<template>
    <div class="container">
        <TicketForm @update:modelValue="onSubmitted" @cancel="onCancel"></TicketForm>
    </div>
</template>