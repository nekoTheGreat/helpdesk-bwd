<script setup>
import { useQuasar } from 'quasar';
import UserForm from 'src/components/UserForm.vue';
import { AuthService } from 'src/services/AuthService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authService = new AuthService();
const user = ref(null);
const quasar = useQuasar();
onMounted(async () => {
    try {
        quasar.loading.show();
        const _user = await authService.getUserInfo();
        user.value = _user;
    } finally {
        quasar.loading.hide();
    }
});
const onSubmit = async (payload) => {
    try {
        quasar.loading.show();
        const _user = await authService.saveUserInfo(payload.form);
        user.value = _user;
        quasar.notify({ type: 'positive', message: 'Profile saved', position: 'top' });
    } finally {
        quasar.loading.hide();
    }
};
const onCancel = () => {
    router.back();
};
const onError = (payload) => {
    console.log(payload);
};
</script>
<template>
    <q-page class="q-pa-sm">
        <UserForm :key="user" :user="user" title="Profile" @on-submit="onSubmit" @on-cancel="onCancel"
            @on-error="onError"></UserForm>
    </q-page>
</template>