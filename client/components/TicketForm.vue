<script setup lang="ts">
import { TicketForm } from '~~/types/api';
import FileInput from './inputs/FileInput.vue';
import { subjectOptions, barangayOptions, municipalityOptions } from '~~/stores/options';
import TicketService from '~~/services/TicketService';

interface Props {
    ticket?: TicketForm,
}
const ticketService = new TicketService();
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'cancel']);
const formLegend = computed(() => props.ticket ? `#${props.ticket.id} Ticket Update` : 'New Ticket');
const form = ref<TicketForm>({
    id: 0,
    subject: 'General',
    description: '',
    street_address: '',
    purok: '',
    barangay: '',
    municipality: '',
    user: 0,
    photos: [],
    images: [],
    deleted_photos: [],
    status: '',
    publish_status: '',
});
const loading = ref(false);
if (props.ticket) {
    for (const [k, v] of Object.entries(form.value)) {
        if (Object.keys(props.ticket).includes(k)) {
            const defval = k == 'photos' ? [] : '';
            form.value[k] = props.ticket[k] ?? defval;
        }
    }
}
const onSubmit = async () => {
    loading.value = true;
    const payload = Object.assign({}, form.value);
    payload.deleted_photos = [];
    if (payload.photos) for (const photo of payload.photos) {
        if (photo.id && photo.is_deleted) payload.deleted_photos?.push(photo.id);
    }
    try {
        let resp = null;
        if (form.value.id) {
            resp = await ticketService.update(form.value.id, payload);
        } else {
            resp = await ticketService.store(payload);
        }
        form.value = resp.data;
        emit('update:modelValue', resp.data);
    } catch (e) {
        alert(e.message);
    } finally {
        loading.value = false;
    }
};
const onCancel = () => {
    emit('cancel');
};
</script>
<template>
    <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-10 col-lg-7">
            <div class="card p-3 shadow">
                <div class="card-body">
                    <h5 class="card-title">{{ formLegend }}</h5>
                    <hr />
                    <form method="POST" @submit.prevent="onSubmit">
                        <div class="mb-3">
                            <label for="subject" class="form-label">Subject:</label>
                            <select v-model="form.subject" class="form-select" id="subject" required>
                                <option v-for="subject in subjectOptions" :value="subject">{{ subject }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description:</label>
                            <textarea v-model="form.description" class="form-control" id="description" rows="4"
                                required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <label class="checkbox mb-3" for="user_address">
                                    <input type="checkbox" /> Use my address
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-7">
                                <div class="mb-3">
                                    <label for="street_address" class="form-label">Street Address:</label>
                                    <input v-model="form.street_address" type="text" class="form-control"
                                        id="street_address" required />
                                </div>
                            </div>
                            <div class="col-12 col-sm-5">
                                <div class="mb-3">
                                    <label for="purok" class="form-label">Purok:</label>
                                    <input v-model="form.purok" type="text" class="form-control" id="purok" required />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="mb-3">
                                    <label for="barangay" class="form-label">Barangay:</label>
                                    <select v-model="form.barangay" class="form-select" id="barangay" required>
                                        <option value="">Select</option>
                                        <option v-for="item in barangayOptions.Bansalan" :value="item">{{ item }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="mb-3">
                                    <label for="municipality" class="form-label">Municipality:</label>
                                    <select v-model="form.municipality" class="form-select" id="municipality" required>
                                        <option value="">Select</option>
                                        <option v-for="item in municipalityOptions" :value="item">{{ item }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="mb-3">
                                <label for="photos" class="form-label">Photos:</label>
                                <FileInput v-model:modelValue="form.images" v-model:attachments="form.photos" multiple>
                                </FileInput>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-sm-4 col-md-3">
                                <div class="mb-3">
                                    <label for="purok" class="form-label">Publish:</label>
                                    <select v-model="form.publish_status" class="form-select">
                                        <option value="draft">draft</option>
                                        <option value="published">published</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-sm-4 col-md-3">
                                <div class="mb-3">
                                    <label for="purok" class="form-label">Status:</label>
                                    <select v-model="form.status" class="form-select">
                                        <option value="pending">pending</option>
                                        <option value="ongoing">ongoing</option>
                                        <option value="completed">completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 d-flex justify-content-end">
                                <button class="btn btn-primary me-2" style="width:75px;" :disabled="loading">Save</button>
                                <button @click="onCancel" :disabled="loading" type="button" class="btn btn-outline-dark"
                                    style="width:75px;">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>