import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { slideDownUp } from '../../shared/animations';
import { TreeNode } from 'primeng/api';

interface SidebarItem {
    count?: number;
    routerLink: string;
    href?: string | null;
    label: string;
    icon: string;
    action?: () => void;
}

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent implements OnDestroy {
    url: string | ArrayBuffer | null = '../../assets/images/DefaultUser.jpg';
    showProfileImage: boolean = false;
    isHidden: boolean = false;
    employeeId: number | undefined;
    active = false;
    store: any;
    activeDropdown: string[] = [];
    activeItem: string = '';
    parentDropdown: string = '';
    sidebarItems: SidebarItem[] = [
        {
            routerLink: '/services',
            label: 'app.sidebar.services',
            icon: 'ma-services',
        },
        {
            routerLink: '/approval-center',
            label: 'app.sidebar.approvalCenter',
            icon: 'ma-approval-center',
            count: 4,
        },
        // {
        //     routerLink: '/forum',
        //     label: 'app.sidebar.forum',
        //     icon: 'ma-forum',
        // },
        // {
        //     routerLink: '/my-decisions',
        //     label: 'app.sidebar.myDecisions',
        //     icon: 'ma-decision',
        // },
        // {
        //     routerLink: '/documents',
        //     label: 'app.sidebar.documents',
        //     icon: 'ma-documents',
        // },
        {
            routerLink: '/systems',
            label: 'app.sidebar.systems',
            icon: 'ma-systems',
        },
        {
            routerLink: '/knowledge-center',
            label: 'app.sidebar.knowledgeCenter',
            icon: 'ma-knowledge-center',
        },
        // {
        //     routerLink: '/kpi-dashboard',
        //     label: 'app.sidebar.kpiDashboard',
        //     icon: 'ma-kpi-dashboard',
        // },
        {
            routerLink: '/media-center',
            label: 'app.sidebar.mediaCenter',
            icon: 'ma-media-center',
        },
        {
            routerLink: '/help-center',
            label: 'app.sidebar.helpCenter',
            icon: 'ma-help-center',
        },
        {
            routerLink: '/calendar',
            label: 'app.sidebar.calendar',
            icon: 'ma-calendar',
        },
        // {
        //     routerLink: '/settings',
        //     label: 'app.sidebar.settings',
        //     icon: 'ma-settings',
        // },
    ];

    files: TreeNode[] = [
        {
            key: '1',
            label: 'القيادة و التحكم',
            data: 'command and control',
            icon: 'pi pi-sitemap',
            children: [
                {
                    key: '11',
                    label: ' التحكم و التوجيه',
                    data: 'Sub Control 1',
                    icon: 'pi pi-file',
                },
                {
                    key: '12',
                    label: ' الخطط و الاسناد الامني',
                    data: 'Sub Control 2',
                    icon: 'pi pi-file',
                },
            ],
        },
        {
            key: '2',
            label: 'حماية المنشآت',
            data: 'Field Survey',
            icon: 'pi pi-video',
            children: [
                {
                    key: '21',
                    label: ' المسح الميداني',
                    data: 'Sub Survey 1',
                    icon: 'pi pi-file',
                },
                {
                    key: '22',
                    label: ' الحماية الميدانية',
                    data: 'Sub Survey 2',
                    icon: 'pi pi-file',
                },
            ],
        },
        {
            key: '3',
            label: 'الأمن الذاتي للمنشآت',
            data: 'Security Support',
            icon: 'pi pi-shield',
            children: [
                {
                    key: '31',
                    label: ' السلامة الصناعية',
                    data: 'Sub Support 1',
                    icon: 'pi pi-file',
                },
                {
                    key: '32',
                    label: ' متابعة الأمن الذاتي',
                    data: 'Sub Support 2',
                    icon: 'pi pi-file',
                },
            ],
        },
    ];

    loading = false;
    private subscription: Subscription = new Subscription();

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private sanitizer: DomSanitizer,
    ) {
        this.initStore();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                let index = this.sidebarItems.findIndex(
                    (e) => e.label === 'app.sidebar.approvalCenter',
                );
                this.sidebarItems[index].count = d.totalAwaitingApproval;
                this.store = d;
            });
    }

    ngOnInit(): void {}

    setActiveDropdown() {
        const selector = document.querySelector(
            '.sidebar ul a[routerLink="' + window.location.pathname + '"]',
        );
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any =
                    ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }

    logout() {
        // navigate to logout route
        this.router.navigate(['/auth/login']);
    }
    setActiveItem(item: string): void {
        this.activeItem = item;
    }

    sanitizeSvg(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }

    isActive(item: any): string {
        const url = this.router.url;

        // Special case for approval center
        const isApprovalCenter =
            url.includes('approvalCenter=true') && url.startsWith('/services');

        if (isApprovalCenter) {
            return item.routerLink === '/approval-center'
                ? 'active text-white'
                : '';
        }

        // normal case for other items
        return url.startsWith(item.routerLink) ? 'active text-white' : '';
    }
}
