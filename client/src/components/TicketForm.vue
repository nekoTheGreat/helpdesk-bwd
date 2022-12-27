<script setup>
import { ref } from 'vue';

const form = ref({
    title: '',
    description: '',
    street_address: '',
    purok: '',
    barangay: '',
    municipality: '',
});
const onClickSave = () => 1;
const onClickCancel = () => 1;
</script>
<template>
    <div class="row justify-center">
        <div class="col-12 col-sm-9 col-md-9 col-lg-7 col-xl-6 rounded-borders shadow-10 q-pa-md q-mt-md">
            <div class="q-mb-lg">
                <label class="text-h6 text-weight-bold text-primary">Create Ticket</label>
            </div>
            <form method="POST" @submit.prevent="onSubmit">
                <div class="row q-col-gutter-lg">
                    <div class="col-12 col-md-6">
                        <label class="text-primary">Details</label>
                        <q-input type="text" outlined class="q-mb-sm bg-grey-1" v-model="form.title" label="Title" />
                        <q-input type="textarea" outlined class="q-mb-sm bg-grey-1" v-model="form.description"
                            label="Description" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label class="text-primary">Address</label>
                        <div class="row q-col-gutter-md">
                            <div class="col-12">
                                <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.address" label="Street" />
                            </div>
                            <div class="col-12 col-sm-6">
                                <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.purok" label="Purok" />
                            </div>
                            <div class="col-12 col-sm-6">
                                <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.barangay" label="Barangay" />
                            </div>
                            <div class="col-12 col-sm-6">
                                <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.munipality"
                                    label="Munipacility" />
                            </div>
                            <div class="col-12 col-sm-6">
                                <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.city" label="City" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row q-col-gutter-md">
                    <div class="col-12 text-right q-mt-sm">
                        <q-btn type="submit" color="primary" text-color="secondary" class="q-mr-md" label="Save"
                            style="max-width: 70px;" @click="onClickSave" />
                        <q-btn color="white" text-color="primary" label="Cancel" style="max-width: 70px;"
                            @click="onClickCancel" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>