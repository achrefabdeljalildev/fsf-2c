import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../../shared/animations';
import { TreeNode } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
    standalone: false
})
export class SidebarComponent {
    store: any;
    isCollapsed: boolean = false;

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

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
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
        this.router.navigate(['/auth/login']);
    }

    toggleUserCard() {
        this.isCollapsed = !this.isCollapsed;
    }
}
