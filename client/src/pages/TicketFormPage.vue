<script setup>
import { ref, watch } from 'vue';
import { Loading } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    id: { default: () => null },
});
const form = ref({
    title: '',
    description: '',
    street_address: '',
    purok: '',
    barangay: '',
    municipality: '',
});
const imageUploader = ref(null);
const loading = ref(false);
watch(loading, () => {
    if (loading.value) Loading.show();
    else Loading.hide();
});

const imageUploading = () => {
    loading.value = true;
};
const imageUploaded = () => {
    loading.value = false;
};
const imageUploadFailed = () => {
    loading.value = false;
};
const onClickSave = () => {
    imageUploader.value.upload();
};
const onClickCancel = () => {
    let route = { path: '/tickets' };
    if (props.id) route = { name: 'ticket-view', params: { id: props.id } };
    router.replace(route);
};
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 col-sm-9 col-md-9 col-lg-6 col-xl-4 rounded-borders shadow-10 q-pa-md q-mt-md">
                <div class="q-mb-lg">
                    <label class="text-h6 text-weight-bold text-primary">Create Ticket</label>
                </div>
                <form method="POST" @submit.prevent="onSubmit">
                    <div class="row q-col-gutter-lg">
                        <div class="col-12">
                            <label class="text-primary">Details</label>
                            <q-input type="text" outlined class="q-mb-sm bg-grey-1" v-model="form.title"
                                label="Title" />
                            <q-input type="textarea" outlined class="q-mb-sm bg-grey-1" v-model="form.description"
                                label="Description" />
                        </div>
                    </div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12">
                            <label class="text-primary">Images</label>
                            <q-uploader style="width: 100%" class="q-mb-md" :max-files="10" :max-file-size="5000000"
                                hide-upload-btn url="http://localhost:4444/upload" multiple accept=".jpg, image/*"
                                ref="imageUploader" @uploaded="imageUploaded" @uploading="imageUploading"
                                @failed="imageUploadFailed" />
                        </div>
                    </div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12">
                            <label class="text-primary">Address</label>
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.address" label="Street" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.purok" label="Purok" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-input outlined class="q-mb-sm bg-grey-1" v-model="form.barangay"
                                        label="Barangay" />
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
    </q-page>
</template>