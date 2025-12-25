import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../../shared/util/animations';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
    standalone: false,
})
export class SidebarComponent implements OnInit {
    store: any;
    isCollapsed: boolean = false;
    expandedItems: { [key: string]: boolean } = {};

    files: any[] = [
        {
            key: '1',
            label: ' المواقع',
            data: 'command and control',
            icon: 'assets/images/icons/location-sidebar.svg',
            children: [
                {
                    key: '11',
                    label: ' لوحة القيادة',
                    data: 'Sub Control 1',
                    icon: 'pi pi-objects-column',
                    routerLink: '/location/dashboard',
                },
                {
                    key: '12',
                    label: 'قائمة المواقع',
                    data: 'Sub Control 2',
                    icon: 'pi pi-list',
                    routerLink: '/location/list',
                },
            ],
        },
        {
            key: '2',
            label: 'المسح الميداني',
            data: 'Field Survey',
            icon: 'assets/images/icons/field-survey-sidebar.svg',
            children: [
                {
                    key: '20',
                    label: 'لوحة المسح الميداني',
                    data: 'Sub Survey Dashboard',
                    icon: 'pi pi-chart-bar',
                    routerLink: '/field-survey/dashboard',
                },
                {
                    key: '21',
                    label: 'قائمة المسح الميداني',
                    data: 'Sub Survey 1',
                    icon: 'pi pi-file',
                    routerLink: '/field-survey/list',
                },
            ],
        },
        {
            key: '3',
            label: 'التقارير',
            data: 'Security Support',
            icon: 'assets/images/icons/reborts-sidebar-logo.svg',
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
            icon: 'assets/images/icons/settings-sidebar-logo.svg',
            children: [
                {
                    key: '41',
                    label: 'الجهات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/organization',
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
                    routerLink: '/province',
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

    ngOnInit() {
        // Expand current route on init
        this.expandCurrentRoute();

        // Listen to route changes and expand accordingly
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.expandCurrentRoute();
        });
    }

    expandCurrentRoute() {
        const currentUrl = this.router.url;

        // Find the parent item that contains the current route
        for (const item of this.files) {
            if (item.children) {
                const hasActiveChild = item.children.some(
                    (child: any) => child.routerLink && currentUrl.startsWith(child.routerLink),
                );

                if (hasActiveChild) {
                    this.expandedItems[item.key] = true;
                }
            }
        }
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
