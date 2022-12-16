<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits(['on-cancel']);
const form = reactive({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    purok: '',
    barangay: '',
    city: '',
    munipality: '',
    province: '',
});
const onSubmit = () => {
    console.log(Object.assign({}, form));
};
const onCancel = () => {
    emit('on-cancel');
};
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 col-sm-10">
                <div class="q-px-lg q-mt-lg q-pt-sm q-pb-lg bg-primary">
                    <form method="POST" @submit.prevent="onSubmit">
                        <div class="q-mb-lg">
                            <label class="text-h6 text-weight-bold text-secondary">Register</label>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-4">
                                <q-input type="email" outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.email"
                                    label="Email" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input type="password" outlined class="col-4 q-mb-sm bg-grey-1"
                                    v-model="form.password" label="Password" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input type="password" outlined class="col-4 q-mb-sm bg-grey-1"
                                    v-model="form.confirm_password" label="Confirm Password" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.first_name"
                                    label="First Name" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.middle_name"
                                    label="Middle Name" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.last_name"
                                    label="Last Name" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-8">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.address"
                                    label="Address" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.purok" label="Purok" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.barangay"
                                    label="Barangay" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.munipality"
                                    label="Munipacility" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.city" label="City" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.province"
                                    label="Province" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 text-right">
                                <q-btn type="submit" color="secondary" text-color="primary" class="q-mr-md"
                                    label="Save" />
                                <q-btn color="white" text-color="primary" label="Cancel" @click="onCancel" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </q-page>
</template>