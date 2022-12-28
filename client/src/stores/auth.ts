import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuth = defineStore('auth', {
  state: () => ({
    authenticated: useLocalStorage('bwd.heldesk.authenticated', false),
    user: useLocalStorage('bwd.heldesk.user', {
      email: '',
      first_name: '',
      last_name: '',
    }),
  }),

  getters: {
    isAuthenticated(state){
      return state.authenticated;
    },
    userName(state){
      return `${state.user.last_name}, ${state.user.first_name}`;
    },
    userEmail(state){
      return state.user.email;
    },
  },

  actions: {
    loggedIn(user: any) {
      this.user.email = user.email;
      this.user.first_name = user.first_name;
      this.user.last_name = user.last_name;
      this.authenticated = true;
    },
    loggedOut(){
      this.user.email = this.user.first_name = this.user.last_name = '';
      this.authenticated = false;
    }
  }
});
