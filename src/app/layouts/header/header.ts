import { Component, OnInit } from '@angular/core';

import { BaseStore } from 'src/app/store/base.store';
import { toggleAnimation } from 'src/app/shared/util/animations';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    animations: [toggleAnimation],
    standalone: false,
})
export class HeaderComponent extends BaseComponent implements OnInit {
    currentDate!: string;
    currentTime!: string;
    currentLocation: string = 'الرياض';

    constructor(
        private ui: BaseStore,
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

    toggleSidebar() {
        this.ui.toggleSidebar();
    }
}
