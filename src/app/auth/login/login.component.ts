import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    // use $ to identify properties manages by ngrx
    isLoading$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        // observe the getIsLoading property value which returns a boolean
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);

        this.loginForm = new FormGroup({
            email: new FormControl('', {validators: [
                Validators.required,
                Validators.email
            ]}),
            password: new FormControl('', {validators: [
                Validators.required
            ]})
        });
    }

    onSubmit(): void {
        console.log(this.loginForm);
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        });
    }
}
