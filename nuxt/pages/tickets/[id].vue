<script setup>
const route = useRoute();
const id = route.params.id * 1;
</script>
<template>
    <div class="container">
        <TicketView :id="id"></TicketView>
    </div>
</template>