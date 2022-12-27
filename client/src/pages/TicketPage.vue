<script setup>
import TicketView from 'src/components/TicketView.vue';
import TicketForm from 'src/components/TicketForm.vue';
import { ref } from 'vue';

const props = defineProps({
    id: { type: Number },
});
const editing = ref(props.id ? false : true);
</script>
<template>
    <div class="q-px-lg">
        <TicketForm v-if="editing"></TicketForm>
        <TicketView v-else></TicketView>
    </div>
</template>