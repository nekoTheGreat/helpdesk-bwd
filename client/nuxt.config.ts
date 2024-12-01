import { processExpression } from "@vue/compiler-core";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    axios: {
        proxy: true,
    },
    proxy: {
        "/api": {
            target: process.env.API_URL,
            pathRewrite: { "^/api": "/api" },
            changeOrigin: true,
        }
    },
    runtimeConfig:{
        api_url: process.env.API_URL,
        public: {
            api_url: "/api/",
            recaptcha_key: process.env.reCaptchaKey,
        }
    },
    debug: process.env.DEBUG,
    ssr: false,
})
