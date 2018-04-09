import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
    authChanged = new Subject<boolean>();

    // private user: User;
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService
    ) { }

    registerUser(authData: AuthData): void {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 1000).toString()
        // };
        this.afAuth.auth
        .createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
            this.afterAuth();
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData): void {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 1000).toString()
        // };

        this.afAuth.auth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
            this.afterAuth();
        })
        .catch(error => {
            console.log(error);
        });

    }

    logout(): void {
        // this.user = null;
        this.trainingService.cancelSubscriptions();
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.authChanged.next(false);
        this.router.navigate(['/login']);
    }

    // getUser(): User {
    //     // return an object with the same properties than this.user but break the reference to avoir external edition of private user
    //     return {... this.user};
    // }

    isAuth():boolean {
        // return true;

        // return true if user is not null
        // return this.user != null;

        return this.isAuthenticated;
    }

    private afterAuth() {
        this.isAuthenticated = true;
        this.authChanged.next(true);
        this.router.navigate(['/training']);
    }
}
