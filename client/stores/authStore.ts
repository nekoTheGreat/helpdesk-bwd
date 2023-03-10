import { defineStore } from "pinia";
import { useLocalStorage} from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: useLocalStorage<string>('token', ''),
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