import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
    }
}
