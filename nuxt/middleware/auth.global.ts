export default defineNuxtRouteMiddleware((to, from) => {
    console.log('installed auth middleware globally');
});