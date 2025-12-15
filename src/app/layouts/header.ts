import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { toggleAnimation } from 'src/app/shared/animations';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'header',
    templateUrl: './header.html',
    animations: [toggleAnimation],
    standalone: false,
})
export class HeaderComponent extends BaseComponent implements OnInit {
    @Input() hasBreadcrumb: boolean = true;

    currentDate!: string;
    currentTime!: string;
    currentLocation: string = 'الرياض';

    constructor(
        public storeData: Store<any>,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit() {
        this.updateDateTime();
        setInterval(() => {
            this.updateDateTime();
        }, 60000);
    }

    private updateDateTime() {
        const now = new Date();
        this.currentDate = now.toLocaleDateString('ar-SA');
        this.currentTime = now.toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
