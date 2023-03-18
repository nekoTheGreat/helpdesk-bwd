<script setup lang="ts">
import { usePendingStore } from '~~/stores/pageSettings';

const pendingStore = usePendingStore();
</script>
<template>
    <ClientOnly>
        <NavBar></NavBar>
        <template #fallback>
            <!-- this will be rendered on server side -->
            <div class="w-100 bg-primary text-center text-white">Loading navbar...</div>
        </template>
    </ClientOnly>
    <NekoProgressBar v-if="pendingStore.pending"></NekoProgressBar>
    <div class="container-fluid mt-3">
        <slot />
    </div>
</template>