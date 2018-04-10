import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // private loadingSubscription: Subscription;

    loginForm: FormGroup;
    // use $ to identify properties manages by ngrx
    isLoading$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private uiService: UiService,
        private store: Store<{ui: fromRoot.State}>
    ) { }

    ngOnInit() {
        // observe the getIsLoading property value which returns a boolean
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);

        // this.loadingSubscription = this.uiService
        // .loadingStateChanged.subscribe(loadingState => {
        //     this.isLoading = loadingState;
        // });

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

    // ngOnDestroy(): void {
    //     if(this.loadingSubscription) {
    //         this.loadingSubscription.unsubscribe();
    //     }
    // }

}
