import { useAuth } from 'src/stores/auth';
import { ErrorResponse } from 'src/types/common';
import { APIService } from './APIService';

interface AuthTokenData{
    expiry: string,
    token: string,
    email: string,
}

export class AuthService{
    private auth: any;
    private api: APIService;

    constructor(){
        this.auth = useAuth();
        this.api = new APIService(window.process.env.API_URL);
    }

    async login(email: string, password: string, rememberMe = false){
        const data = await this.api.post('/auth/login/', {email: email, password: password}) as AuthTokenData;
        data.email = email;
        this.auth.loggedIn(data, rememberMe);
    }

    async logout(){
        return new Promise((resolve) => {
            setTimeout(() => {
                this.auth.loggedOut();
                resolve(true);
            }, 2000);
        });
    }

    async getUserInfo(){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.auth.user);
            }, 2000);
        });
    }
    
    async saveUserInfo(data: any){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 2000)
        });
    }
}