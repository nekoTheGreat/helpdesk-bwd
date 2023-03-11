<script setup lang="ts">
import 'bootstrap/scss/bootstrap.scss';
import '~/assets/css/app.scss';
import { usePageLayout } from './stores/pageSettings';

const layout = usePageLayout();
const props = defineProps({
    error: Object
})
</script>
<template>
    <NuxtLayout :name="layout">
        <div class="row d-flex justify-content-center">
            <div class="card shadow col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center p-4 text-danger">
                <h4>Sorry, an error has occured: </h4>
                <h4>{{ error.message }}</h4>
            </div>
        </div>
    </NuxtLayout>
</template>
