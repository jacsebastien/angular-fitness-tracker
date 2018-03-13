import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
    @Output() sidenavClose = new EventEmitter<void>();

    authSubscription: Subscription;
    isAuth = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authSubscription = this.authService.authChanged
        .subscribe((authStatus: boolean) => {
            this.isAuth = authStatus;
        });
    }

    onCloseSidenav() {
        this.sidenavClose.emit();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}
