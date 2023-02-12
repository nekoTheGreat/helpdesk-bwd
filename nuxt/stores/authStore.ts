import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: '',
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