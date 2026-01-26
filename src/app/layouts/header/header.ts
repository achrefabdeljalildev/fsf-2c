import { Component, Input, OnInit } from '@angular/core';
import { SIDEBAR_MENUS_KEYS } from '@shared/consts/base-sidebar-menus';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { toggleAnimation } from 'src/app/shared/util/animations';
import { BaseStore } from 'src/app/store/base.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    animations: [toggleAnimation],
    standalone: false,
})
export class HeaderComponent extends BaseComponent implements OnInit {
    @Input() hasMenuButton: boolean = true;

    currentDate!: string;
    currentTime!: string;
    currentLocation: string = 'الرياض';
    isGlobalSettings: boolean = false;

    constructor(
        private baseStore: BaseStore,
        private authService: AuthService,
    ) {
        super();

        this.route.data.subscribe((value) => {
            this.isGlobalSettings = value['key'] === 'globalSettings';
            const key = value['key'];

            if (key) {
                const menuConfig = SIDEBAR_MENUS_KEYS.find((m) => m.key === key);
                if (menuConfig) {
                    this.baseStore.setSidebarMenus(menuConfig.sidebarMenus);
                    this.baseStore.setSidebarTitle(menuConfig.title);
                }
            }
        });
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
        this.baseStore.toggleSidebar();
    }

    goSettings() {
        this.router.navigate(['global-settings/list']);
    }
}
