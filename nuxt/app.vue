<script setup lang="ts">
import '~~/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '~/assets/css/app.scss';
import { usePageLayout } from './stores/pageSettings';

const layout = usePageLayout();
</script>
<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
