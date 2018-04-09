import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChanged = new Subject<boolean>();

    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackBar: MatSnackBar,
        private uiService: UiService
    ) { }

    registerUser(authData: AuthData): void {
        // Use a global service to manage loading state
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
        .createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            console.log(result);
            this.afterAuth();
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            console.log(error);
            this.snackBar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    login(authData: AuthData): void {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            console.log(result);
            this.afterAuth();
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            console.log(error);
            this.snackBar.open(error.message, null, {
                duration: 3000
            });
        });

    }

    logout(): void {
        this.trainingService.cancelSubscriptions();
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.authChanged.next(false);
        this.router.navigate(['/login']);
    }

    isAuth():boolean {
        return this.isAuthenticated;
    }

    private afterAuth() {
        this.isAuthenticated = true;
        this.authChanged.next(true);
        this.router.navigate(['/training']);
    }
}
