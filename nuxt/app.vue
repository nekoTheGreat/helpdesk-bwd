<script setup lang="ts">

const layout = ref<string>('default');
setTimeout(() => {
  layout.value = 'authenticated';
}, 2000);
</script>
<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
