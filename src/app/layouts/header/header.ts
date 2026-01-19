import { Component, OnInit } from '@angular/core';

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
            this.isGlobalSettings = value['isGlobalSettings'];

            if (this.isGlobalSettings) {
                this.baseStore.setSidebarTitle('الإعدادات العامة');
                this.baseStore.setSidebarMenus([
                    {
                        key: '6-3',
                        label: 'الإعدادات العامة',
                        data: 'Global Settings',
                        icon: 'assets/images/icons/settings-sidebar-logo.svg',
                        children: [
                            {
                                key: '6-3-1',
                                label: 'إعدادات النظام',
                                data: 'Global Settings List',
                                icon: 'pi pi-list',
                                routerLink: '/global-settings/list',
                            },
                        ],
                    },
                    {
                        key: '5',
                        label: 'المستخدمين',
                        data: 'Security Support',
                        icon: 'assets/images/icons/settings-sidebar-logo.svg',
                        children: [
                            {
                                key: '51',
                                label: 'قائمة المستخدمين',
                                data: 'Sub Survey 2',
                                icon: 'pi pi-list',
                                routerLink: '/users/list',
                            },
                            {
                                key: '52',
                                label: 'الادوار',
                                data: 'Sub Survey 2',
                                icon: 'pi pi-list',
                                routerLink: '/users/roles',
                            },
                        ],
                    },
                ]);
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
