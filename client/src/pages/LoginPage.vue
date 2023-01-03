<script setup lang="ts">
import { AuthService } from 'src/services/AuthService';
import { reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const form = reactive({
    email: '',
    password: '',
    remember_me: false,
});
const router = useRouter();
const quasar = useQuasar();
const onSubmit = async () => {
    try {
        quasar.loading.show();
        const authService = new AuthService();
        await authService.login(form.email, form.password, form.remember_me);
        router.replace({ path: '/' });
    } catch (e: any) {
        quasar.notify({ type: 'negative', message: e.message });
    } finally {
        quasar.loading.hide();
    }
};
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-11 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                <div class="q-px-lg q-mt-lg q-pt-sm q-pb-lg bg-primary">
                    <form method="POST" @submit.prevent="onSubmit">
                        <div class="q-mb-lg">
                            <label class="text-h6 text-weight-bold text-secondary">Login</label>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12">
                                <q-input type="email" outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.email"
                                    label="Email" />
                            </div>
                            <div class="col-12">
                                <q-input type="password" outlined class="col-4 q-mb-sm bg-grey-1"
                                    v-model="form.password" label="Password" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-7 text-secondary">
                                <q-checkbox dark class="col-4 q-mb-sm remember-me" keep-color color="secondary"
                                    v-model="form.remember_me" label="Remember me" />
                            </div>
                            <div class="col-5 q-mt-sm text-right">
                                <q-btn type="submit" color="secondary" text-color="primary" label="Login" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 text-center text-secondary q-my-md">
                                OR
                            </div>
                        </div>
                        <q-btn color="blue-fb" text-color="secondary" label="Login via Facebook" class="q-mb-sm"
                            style="width:100%" no-caps />
                        <q-btn color="white" text-color="red-gmail" label="Login via GMail" class="q-mb-sm"
                            style="width:100%" no-caps />
                    </form>
                </div>
            </div>
        </div>
    </q-page>
</template>
<style lang="scss">
.remember-me {
    margin-left: -10px;
}

.remember-me .q-checkbox__truthy {
    color: $primary;
}
</style>