import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter<void>();

    isAuth$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }

    onCloseSidenav() {
        this.sidenavClose.emit();
    }

    onLogout() {
        this.authService.logout();
    }
}
