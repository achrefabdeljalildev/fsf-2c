import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../../shared/util/animations';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
    standalone: false,
})
export class SidebarComponent {
    store: any;
    isCollapsed: boolean = false;
    expandedItems: { [key: string]: boolean } = {};

    files: any[] = [
        {
            key: '1',
            label: ' المواقع',
            data: 'command and control',
            icon: 'pi pi-sitemap',
            children: [
                {
                    key: '11',
                    label: ' لوحة القيادة',
                    data: 'Sub Control 1',
                    icon: 'pi pi-objects-column',
                    routerLink: '/locations/dashboard',
                },
                {
                    key: '12',
                    label: 'قائمة المواقع',
                    data: 'Sub Control 2',
                    icon: 'pi pi-list',
                    routerLink: '/locations',
                },
            ],
        },
        {
            key: '2',
            label: 'المسح الميداني',
            data: 'Field Survey',
            icon: 'pi pi-video',
            children: [
                {
                    key: '21',
                    label: ' المسح الميداني',
                    data: 'Sub Survey 1',
                    icon: 'pi pi-file',
                    routerLink: '/field-survey',
                },
                {
                    key: '22',
                    label: ' الحماية الميدانية',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-file',
                    routerLink: '/field-protection',
                },
            ],
        },
        {
            key: '3',
            label: 'التقارير',
            data: 'Security Support',
            icon: 'pi pi-shield',
            children: [
                {
                    key: '3َ1',
                    label: ' الحماية الميدانية',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-file',
                    routerLink: '/reports',
                },
            ],
        },
        {
            key: '4',
            label: 'الإعدادات',
            data: 'Security Support',
            icon: 'pi pi-cog',
            children: [
                {
                    key: '41',
                    label: 'الجهات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/settings/entities',
                },
                {
                    key: '42',
                    label: 'المناطق',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/regions',
                },
                {
                    key: '43',
                    label: 'المحافظات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/settings/provinces',
                },
                {
                    key: '44',
                    label: 'التصنيفات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/settings/categories',
                },
            ],
        },
    ];

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private authService: AuthService,
    ) {
        this.initStore();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }

    toggleUserCard() {
        this.isCollapsed = !this.isCollapsed;
    }

    toggleMenuItem(key: string) {
        this.expandedItems[key] = !this.expandedItems[key];
    }

    isExpanded(key: string): boolean {
        return this.expandedItems[key] || false;
    }
}
