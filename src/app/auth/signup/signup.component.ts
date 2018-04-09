import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UiService } from '../../shared/ui.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    private loadingSubscription: Subscription;

    maxDate: Date;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private uiService: UiService
    ) { }

    ngOnInit() {
        this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loadingState => {
            this.isLoading = loadingState;
        });

        this.maxDate = new Date();
        // user cant select a year less than 18 years ago (he needs to be at least 18 yeras old)
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // 18 years ago
    }

    onSubmit(form: NgForm) {
        console.log(form);
        this.authService.registerUser({
            email: form.value.email,
            password: form.value.password
        });
    }

    ngOnDestroy() {
        if(this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
}
