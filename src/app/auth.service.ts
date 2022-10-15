export class AuthService{

    loggedIn = false;

    isAuthenticated(){
        const promise = new Promise<boolean>((resolve, reject) => {
            setTimeout(() => { resolve(this.loggedIn);}, 10)
        })

        return promise;
    }
    login(){
        this.loggedIn = true;
    }

    logOut(){
        this.loggedIn = false;
    }
}