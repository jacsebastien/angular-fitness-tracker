import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    maxDate;

    constructor() { }

    ngOnInit() {
        this.maxDate = new Date();
        // user cant select a year less than 18 years ago (he needs to be at least 18 yeras old)
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // 18 years ago
    }

    onSubmit(form: NgForm) {
        console.log(form);
    }

}
