import { defineStore } from "pinia";
import { useSessionStorage} from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: useSessionStorage<string>('token', ''),
            guest_route_names: [
                'tickets', 'login', 'index', 'signup',
                'tickets-id',
            ],
        }
    },
    getters: {
        authenticated: (state) => state.token.length > 0
    },
    actions: {
        loggedIn(token: string){
            this.token = token;
        },
        loggedOut(){
            this.token = '';
        },
    }
});