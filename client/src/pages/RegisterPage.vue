<script setup>
import { useQuasar } from 'quasar';
import UserForm from 'src/components/UserForm.vue';
import { AuthService } from 'src/services/AuthService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const quasar = useQuasar();
const router = useRouter();
const authService = new AuthService();
const showForm = ref(false);
const onSubmit = async (payload) => {
    quasar.loading.show();
    await authService.saveUserInfo(payload.form);
    quasar.notify({
        position: 'top', type: 'positive', message: 'User registered', timeout: 600,
        onDismiss: () => {
            router.replace({ path: '/login' });
            quasar.loading.hide();
        }
    });
}
const onCancel = () => {
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
        <UserForm v-else title="Register" :additional-required-fields="['password']" @on-submit="onSubmit"
            @on-cancel="onCancel">
        </UserForm>
    </q-page>
</template>