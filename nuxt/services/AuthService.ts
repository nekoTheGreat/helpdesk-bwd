import { useAuthStore } from "~~/stores/authStore";

export default class AuthService{
    protected login_url: string = "";
    protected authStore: any;

    constructor(){
        this.authStore = useAuthStore();
        const config = useRuntimeConfig();
        this.login_url = config.public.api_url+"/auth/login/";
    }

    async login(email: string, password: string, remember: boolean = true){
        const resp = await request(this.login_url, "POST", {email: email, password: password});
        this.authStore.loggedIn(resp.data.token);
    }
}