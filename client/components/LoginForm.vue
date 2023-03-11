<script setup lang="ts">
import AuthService from '~~/services/AuthService';

const config = useRuntimeConfig();
const form = reactive({
    email: '',
    password: '',
    remember_me: false,
});
const loading = ref(false);
const onSubmit = async () => {
    grecaptcha?.ready(async function () {
        grecaptcha?.execute(config.public.recaptcha_key, { action: 'submit' }).then(async function (token) {
            login();
        });
    });
};
const login = async () => {
    const authService = new AuthService();
    loading.value = true;
    try {
        await authService.login(form.email, form.password);
        navigateTo("/");
    } catch (e) {
        alert(e.message);
    } finally {
        loading.value = false;
    }
}
</script>
<template>
    <div class="card bg-primary mt-2 col-11 col-sm-7 col-md-5 col-lg-4 shadow text-white" style="max-width:340px;">
        <form method="POST" @submit.prevent="onSubmit">
            <div class="card-header text-center">
                <h4>BWD Login</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="email">Email:</label>
                    <input v-model="form.email" type="email" class="form-control" placeholder="sample@email.com" />
                </div>
                <div class="mb-3">
                    <label for="password">Password:</label>
                    <input v-model="form.password" type="password" class="form-control" />
                </div>
                <div class="mb-3 d-flex">
                    <button class="btn btn-light text ms-auto" :disabled="loading">
                        <div v-if="loading">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Processing...
                        </div>
                        <template v-else>Login</template>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>