import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    private loadingSubscription: Subscription;

    loginForm: FormGroup;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private uiService: UiService
    ) { }

    ngOnInit() {
        this.loadingSubscription = this.uiService
        .loadingStateChanged.subscribe(loadingState => {
            this.isLoading = loadingState;
        });

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

    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
    }

}
