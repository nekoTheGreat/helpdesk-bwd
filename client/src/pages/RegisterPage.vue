<script setup lang="ts">
import RegisterForm from 'src/components/RegisterForm.vue';
import { ref } from 'vue';

const showForm = ref<boolean>(false);
const onFormCancel = () => {
    showForm.value = false;
}
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center" v-if="!showForm">
            <div class="col-12 col-sm-5 col-md-3 col-lg-3 col-xl-2">
                <div class="q-px-xl q-mt-lg q-pt-sm q-pb-lg bg-primary">
                    <form method="POST" @submit.prevent="">
                        <div class="q-mb-lg">
                            <label class="text-h6 text-weight-bold text-secondary">Registration</label>
                        </div>
                        <q-btn color="grey-1" text-color="black" label="Register using Email" style="width:100%"
                            class="q-mb-sm" no-caps @click.prevent="showForm = true" />
                        <q-btn color="blue-fb" text-color="secondary" label="Register via Facebook" class="q-mb-sm"
                            style="width:100%" no-caps />
                        <q-btn color="white" text-color="red-gmail" label="Register via GMail" class="q-mb-sm"
                            style="width:100%" no-caps />
                    </form>
                </div>
            </div>
        </div>
        <RegisterForm v-else @on-cancel="onFormCancel"></RegisterForm>
    </q-page>
</template>