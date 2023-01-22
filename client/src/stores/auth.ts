import { defineStore } from 'pinia';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import { LocalStorage, SessionStorage } from 'quasar';

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
      return state.token != '' ||
        LocalStorage.getItem(TOKEN_STORAGE_KEY) ||
        SessionStorage.getItem(TOKEN_STORAGE_KEY)
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
      LocalStorage.remove(TOKEN_STORAGE_KEY);
      if(rememberMe){
        LocalStorage.set(TOKEN_STORAGE_KEY, data.token);
      }else{
        SessionStorage.set(TOKEN_STORAGE_KEY, data.token);
      }
    },
    loggedOut(){
      this.user.email = this.user.first_name = this.user.last_name = '';
      this.token = '';
      LocalStorage.remove(TOKEN_STORAGE_KEY);
      SessionStorage.remove(TOKEN_STORAGE_KEY);
    },
  }
});
