import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
// import all from "app.reducer" in property "fromApp"
// use first letter lower case for reducers
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
    authChanged = new Subject<boolean>();

    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UiService,
        // import store which is an object with ui property type of State (from reducer file)
        private store: Store<{ui: fromRoot.State}>
    ) { }

    registerUser(authData: AuthData): void {
        // use central store to manage loading state with redux
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
        .createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.store.dispatch(new UI.StopLoading());
            console.log(result);
            this.afterAuth();
        })
        .catch(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
        });
    }

    login(authData: AuthData): void {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.store.dispatch(new UI.StopLoading());
            console.log(result);
            this.afterAuth();
        })
        .catch(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
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
