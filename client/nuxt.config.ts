import { processExpression } from "@vue/compiler-core";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig:{
        api_url: process.env.API_URL,
        public: {
            api_url: process.env.API_URL,
            recaptcha_key: process.env.reCaptchaKey,
        }
    },
    debug: process.env.DEBUG,
    ssr: false,
})
