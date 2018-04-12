import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from './app.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private store: Store<fromRoot.State>,
        private router: Router
    ) {}

    ngOnInit() {
        this.store.select(fromRoot.getIsAuth)
        .subscribe(isAuth => {
            if(!isAuth) {
                this.router.navigate(['']);
            }
        });
    }
}
