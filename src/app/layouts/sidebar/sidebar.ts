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

    treeNodes: any[] = [
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
                    routerLink: '/roles',
                },
                {
                    key: '53',
                    label: 'الصلاحيات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/permissions',
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
                    routerLink: '/organization/list',
                },
                {
                    key: '42',
                    label: 'المناطق',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/regions/list',
                },
                {
                    key: '43',
                    label: 'المحافظات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/province/list',
                },
                {
                    key: '44',
                    label: 'التصنيفات',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/location-classification/list',
                },
                {
                    key: '45',
                    label: 'معايير المسح الميداني',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-list',
                    routerLink: '/entity-classification/list',
                },
            ],
        },
        {
            key: '46',
            label: 'اعدادات سجل المخاطر',
            data: 'Sub Survey 2',
            icon: 'pi pi-list',
            routerLink: '/risk-register-settings',
            children: [
                {
                    key: '461',
                    label: 'تصنيف نوع الخطر',
                    data: 'Sub Survey 3',
                    icon: 'pi pi-list',
                    routerLink: '/risk-register-settings/classification-of-risk-type/list',
                },
                {
                    key: '462',
                    label: 'تصنيف احتمال الوقوع',
                    data: 'Sub Survey 3',
                    icon: 'pi pi-list',
                    routerLink: '/risk-register-settings/falling-load-classification/list',
                },
                {
                    key: '463',
                    label: 'تصنيف أثر الخطر',
                    data: 'Sub Survey 3',
                    icon: 'pi pi-list',
                    routerLink: '/risk-register-settings/classification-of-risk-impact/list',
                },
                {
                    key: '464',
                    label: 'تصنيف حالات الخطر',
                    data: 'Sub Survey 3',
                    icon: 'pi pi-list',
                    routerLink: '/risk-register-settings/classification-of-risk-situations/list',
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
        for (const item of this.treeNodes) {
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
