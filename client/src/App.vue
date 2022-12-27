<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeKey = computed(() => route.fullPath);
</script>
<template>
  <router-view :key="routeKey">
  </router-view>
</template>