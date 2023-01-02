import { api } from 'src/boot/axios';
import { useAuth } from 'src/stores/auth';
import { ErrorResponse } from 'src/types/common';

interface AuthTokenData{
    expiry: string,
    token: string,
    email: string,
}

export class AuthService{
    private auth: any;

    constructor(){
        this.auth = useAuth();
    }

    async login(email: string, password: string, rememberMe = false){
        return new Promise(async (resolve, reject) => {
            try{
                const resp = await api.post(window.process.env.API_URL+'/auth/login/', {email: email, password: password});
                const data = resp.data as AuthTokenData;
                data.email = email;
                this.auth.loggedIn(data, rememberMe);
                resolve(data);
            }catch(resp: any){
                const error: ErrorResponse = {message: 'Unknown error', status_code: 500};
                if(resp?.response?.data){
                    if(resp?.response?.data?.errors?.non_field_errors){
                        error.message = resp?.response?.data?.errors?.non_field_errors[0] as string;
                    }else{
                        error.message = resp?.response?.data;
                    }
                }
                reject(error);
            }
        });
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