import { defineStore } from 'pinia';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';

const TOKEN_STORAGE_KEY = 'bwd.heldesk.token';

export const useAuth = defineStore('auth', {
  state: () => ({
    token: useLocalStorage(TOKEN_STORAGE_KEY, ''),
    user: useLocalStorage('bwd.heldesk.user', {
      email: '',
      first_name: '',
      last_name: '',
    }),
  }),

  getters: {
    isAuthenticated(state){
      return state.token != '';
    },
    userEmail(state){
      return state.user.email;
    },
    getToken(state){
      return state.token;
    }
  },

  actions: {
    loggedIn(data: any, rememberMe: boolean) {
      this.user.email = data.email;
      this.user.first_name = data.first_name;
      this.user.last_name = data.last_name;
      this.token = data.token;
      if(rememberMe){
        useLocalStorage(TOKEN_STORAGE_KEY, data.token);
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      }else{
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        useSessionStorage(TOKEN_STORAGE_KEY, data.token);
      }
    },
    loggedOut(){
      this.user.email = this.user.first_name = this.user.last_name = '';
      this.token = '';
    }
  }
});
