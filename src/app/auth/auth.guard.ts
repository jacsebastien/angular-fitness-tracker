import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanLoad,
    Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.manageRedirect();
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.manageRedirect();
    }

    // Allow route to be activated ONLY if isAuth is true, else redirect to login page
    private manageRedirect(): Observable<boolean> | Promise<boolean> | boolean {
        // Observable constantly emit new value, guards only take one so force to use only one and close subscription
        // return this.store.select(fromRoot.getIsAuth).pipe(take(1));

        // Get observable
        const observable = this.store.select(fromRoot.getIsAuth).pipe(take(1));

        // Redirect to login page if user is not authenticated
        observable.subscribe(isAuth => {
            if(!isAuth) {
                this.router.navigate(['login']);
            }
        });

        // Return an Observable which is true or false
        return observable;
    }
}
