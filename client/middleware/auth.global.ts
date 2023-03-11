import { useAuthStore } from "~~/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if(authStore.authenticated){
        if(to.name == "login") return navigateTo("/");
    }else{
        if(!authStore.guest_route_names.includes(to.name)) return navigateTo('/login');
    }
});