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
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // allow route to be activated ONLY if isAuth is true, else redirect to login page
        if(this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        // allow route to be activated ONLY if isAuth is true, else redirect to login page
        if(this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
