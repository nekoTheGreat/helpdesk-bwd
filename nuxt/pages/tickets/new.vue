<script setup>

const onSubmit = (form) => {
    console.log(form);
};
</script>
<template>
    <div class="container">
        <TicketForm @update:model-value="onSubmit"></TicketForm>
    </div>
</template>