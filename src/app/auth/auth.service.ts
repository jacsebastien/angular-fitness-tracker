import { Subject } from 'rxjs/Subject';

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    authChanged = new Subject<boolean>();

    private user: User;

    constructor() { }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };

        this.authChanged.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };

        this.authChanged.next(true);
    }

    logout() {
        this.user = null;
        this.authChanged.next(false);
    }

    getUser(): User {
        // return an object with the same properties than this.user but break the reference to avoir external edition of private user
        return {... this.user};
    }

    isAuth():boolean {
        // return true if user is not null
        return this.user != null;
    }
}
