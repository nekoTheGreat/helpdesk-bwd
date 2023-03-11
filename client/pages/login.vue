<script setup lang="ts">
useHead({
    script: [
        { src: "https://www.google.com/recaptcha/api.js?render=6LeU2u8kAAAAAMs1runBW0D-47lM4c07LGO5HMkL", body: true }
    ]
})
</script>
<template>
    <div class="row justify-content-center">
        <LoginForm></LoginForm>
    </div>
</template>