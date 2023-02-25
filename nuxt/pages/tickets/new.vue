<script setup>
const onCancel = () => {
    navigateTo("/tickets");
}
</script>
<template>
    <div class="container">
        <TicketForm @cancel="onCancel"></TicketForm>
    </div>
</template>