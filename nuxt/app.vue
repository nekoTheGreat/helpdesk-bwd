<script setup lang="ts">
import 'bootstrap/scss/bootstrap.scss';
import '~/assets/css/app.scss';
import { usePageLayout } from './stores/pageSettings';

const layout = usePageLayout();
</script>
<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
