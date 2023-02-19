<script setup lang="ts">
import { subjectOptions } from '~~/stores/options';

const form = reactive({
    subject: '',
    description: '',
    address: '',
});
</script>
<template>
    <div class="container mb-3">
        <div class="row">
            <div class="col-12 col-md-7 col-lg-6 mb-3">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h4 style="font-size:2.5rem" class="text-center">Welcome to Bansalan Water District</h4>
                    <div style="max-width:250px;" class="q-ma-auto">
                        <img src="~/assets/headphones.png" style="width:250px;" />
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5 col-lg-5 offset-lg-1 col-xl-3 d-flex justify-content-center">
                <div class="card bg-primary rounded-4 p-2 text-white" style="max-width:330px">
                    <form class="row p-3">
                        <div class="col-12">
                            <h4 class="text-center">Ask a Question</h4>
                        </div>
                        <div class="col-12 pb-1">
                            <label for="subject" class="form-label">Subject</label>
                            <select class="form-select">
                                <option v-for="item in subjectOptions" :value="item">{{ item }}</option>
                            </select>
                        </div>
                        <div class="col-12 pb-1">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="form.description" class="form-control" id="description" rows="3"
                                autocomplete="Off" style="resize:none"></textarea>
                        </div>
                        <div class="col-12 pb-1">
                            <label for="address" class="form-label">Address</label>
                            <textarea v-model="form.address" class="form-control" id="address" rows="2"
                                autocomplete="new-password" style="resize:none"></textarea>
                        </div>
                        <div class="col-12 d-flex mt-2">
                            <div class="ms-auto">
                                <button class="btn btn-default bg-white text-dark">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>