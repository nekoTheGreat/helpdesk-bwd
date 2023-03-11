import { useAuthStore } from "~~/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if(to.path == "/login" && authStore.authenticated) return navigateTo("/");
});