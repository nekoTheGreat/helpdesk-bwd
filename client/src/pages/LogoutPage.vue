<script setup>
import { AuthService } from 'src/services/AuthService';
import { Loading } from 'quasar';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authService = new AuthService();
const router = useRouter();
onMounted(async () => {
    try {
        Loading.show();
        await authService.logout();
        router.replace({ path: '/' });
    } finally {
        Loading.hide();
    }
});
</script>
<template>
    <div></div>
</template>