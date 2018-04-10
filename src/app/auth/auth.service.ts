import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UiService,
        // import store which is an object with property type of State (from reducer file)
        private store: Store<fromRoot.State>
    ) { }

    registerUser(authData: AuthData): void {
        // use central store to manage loading state with redux
        this.store.dispatch(new UI.StartLoading());

        this.afAuth.auth
        .createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
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

        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
    }

    private afterAuth() {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
    }
}
