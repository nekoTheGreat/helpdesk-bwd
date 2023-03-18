import { defineStore } from "pinia";


export const usePageLayout = () => useState('pageLayout', () => 'default');

export const usePendingStore = defineStore('pending', {
    state: () => {
        return {
            counter: 0,
        }
    },
    getters: {
        pending: (state) => state.counter > 0
    },
    actions: {
        reset(){
            this.counter = 0;
        },
        sub(){
            this.counter++;
        },
        unsub(){
            this.counter--;
            if(this.counter < 0) this.counter = 0;
        }
    }
});