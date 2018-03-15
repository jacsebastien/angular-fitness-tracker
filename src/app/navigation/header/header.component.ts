import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() sidenavToggle = new EventEmitter<void>();
    authSubscription: Subscription;
    isAuth = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isAuth = this.authService.isAuth();

        this.authSubscription = this.authService.authChanged
        .subscribe((authStatus: boolean) => {
            this.isAuth = authStatus;
        });
    }

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}
