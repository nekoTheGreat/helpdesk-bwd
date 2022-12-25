<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['on-submit', 'on-cancel'])
const form = reactive({
    subject: '',
    description: '',
    address: '',
    user: '',
});
const onClickSearch = () => {
    emit('on-submit', Object.assign({}, form));
}
const onClickCancel = () => {
    emit('on-cancel');
}
</script>
<template>
    <div class="row justify-center">
        <div class="col-12">
            <q-input type="text" outlined class="q-mb-sm bg-grey-1" dense label="Subject" v-model="form.subject" />
        </div>
        <div class="col-12">
            <q-input type="text" outlined class="q-mb-sm bg-grey-1" dense label="Description"
                v-model="form.description" />
        </div>
        <div class="col-12">
            <q-input type="text" outlined class="q-mb-sm bg-grey-1" dense label="Address" v-model="form.address" />
        </div>
        <div class="col-12">
            <q-input type="text" outlined class="q-mb-sm bg-grey-1" dense label="User" v-model="form.user" />
        </div>
        <div class="col-12">
            <q-btn type="button" color="primary" text-color="secondary" class="q-mb-sm q-mr-sm" label="Search"
                @click="onClickSearch" />
            <q-btn type="button" color="white" text-color="dark" class="q-mb-sm" label="Cancel"
                @click="onClickCancel" />
        </div>
    </div>
</template>