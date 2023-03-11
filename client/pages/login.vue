<script setup lang="ts">

const config = useRuntimeConfig();
useHead({
    script: [
        { src: `https://www.google.com/recaptcha/api.js?render=${config.public.recaptcha_key}`, body: true }
    ]
})
</script>
<template>
    <div class="row justify-content-center">
        <LoginForm></LoginForm>
    </div>
</template>