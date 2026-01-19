import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BaseStore } from 'src/app/store/base.store';
import { slideDownUp } from '../../shared/util/animations';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
    standalone: false,
})
export class SidebarComponent implements OnInit {
    isCollapsed: boolean = true;
    expandedItems: { [key: string]: boolean } = {};
    expandedChildItems: { [key: string]: boolean } = {};
    // Signals from the UI store
    semidark = this.baseStore.semidark;
    treeNodes = this.baseStore.sidebarMenus;
    sidebarTitle = this.baseStore.sidebarTitle;

    constructor(
        public translate: TranslateService,
        public router: Router,
        private authService: AuthService,
        private baseStore: BaseStore,
    ) {}

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

        // Find the parent item and child items that contain the current route
        for (const item of this.treeNodes()) {
            if (item.children) {
                // Check second-level children for direct route match
                for (const child of item.children) {
                    // Direct route match on second-level
                    if (child.routerLink && currentUrl.startsWith(child.routerLink)) {
                        this.expandedItems[item.key] = true;
                        break;
                    }

                    // Check third-level children for route match
                    if (child.children?.length) {
                        const hasActiveGrandchild = child.children.some(
                            (grand: any) =>
                                grand.routerLink && currentUrl.startsWith(grand.routerLink),
                        );

                        if (hasActiveGrandchild) {
                            this.expandedItems[item.key] = true;
                            this.expandedChildItems[child.key] = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    // Using signal store; no NgRx subscription needed

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

    toggleChildItem(key: string) {
        this.expandedChildItems[key] = !this.expandedChildItems[key];
    }

    isChildExpanded(key: string): boolean {
        return this.expandedChildItems[key] || false;
    }
}
