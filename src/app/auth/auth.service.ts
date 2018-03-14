import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    authChanged = new Subject<boolean>();

    private user: User;

    constructor(private router: Router) { }

    registerUser(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };

        this.afterAuth();
    }

    login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };

        this.afterAuth();
    }

    logout(): void {
        this.user = null;
        this.authChanged.next(false);
        this.router.navigate(['/login']);
    }

    getUser(): User {
        // return an object with the same properties than this.user but break the reference to avoir external edition of private user
        return {... this.user};
    }

    isAuth():boolean {
        // return true if user is not null
        // return this.user != null;
        return true;
    }

    private afterAuth() {
        this.authChanged.next(true);
        this.router.navigate(['/training']);
    }
}
