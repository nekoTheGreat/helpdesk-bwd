import { useAuth } from 'src/stores/auth';

export class AuthService{
    private auth: any;

    constructor(){
        this.auth = useAuth();
    }

    async login(email: string, password: string, rememberMe = false){
        const user = {email: email, first_name: 'Juan', last_name: 'dela Cruz'};
        return new Promise((resolve) => {
            setTimeout(() => {
                this.auth.loggedIn(user);
                resolve(user);
            }, 2000);
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