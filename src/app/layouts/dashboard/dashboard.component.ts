import { Component } from '@angular/core';
import { CONST_SIDEBAR_MENUS } from '@shared/consts/base-sidebar-menus';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { BaseStore, TreeNode } from 'src/app/store/base.store';

interface Card {
    id: number;
    title: string;
    description: string;
    icon: string;
    iconActive: string;
    enabled?: boolean;
    subcards?: SubCard[];
}

interface SubCard {
    id: number;
    title: string;
    enabled?: boolean;
    sidebarMenus?: TreeNode[];
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false,
})
export class DashboardComponent extends BaseComponent {
    cards: Card[] = [
        {
            id: 1,
            title: 'مركز القيادة و التحكم',
            description: 'command_and_control_desc',
            icon: 'assets/images/icons/command-control-center-logo hover.svg',
            iconActive: 'assets/images/icons/command-control-center-logo.svg',
            enabled: false,
            subcards: [
                {
                    id: 11,
                    title: 'إدارة التحكم و التوجيه',
                    enabled: false,
                    sidebarMenus: [],
                },
                {
                    id: 12,
                    title: 'إدارة الخطط و الاسناد الامني',
                    enabled: false,
                    sidebarMenus: [],
                },
            ],
        },
        {
            id: 2,
            title: 'الإدارة العامة لحماية المنشآت',
            description: 'field_survey_desc',
            enabled: true,
            icon: 'assets/images/icons/camera-hover.svg',
            iconActive: 'assets/images/icons/camera.svg',
            subcards: [
                {
                    id: 21,
                    title: 'إدارة المسح الميداني',
                    enabled: true,
                    sidebarMenus: CONST_SIDEBAR_MENUS,
                },
                {
                    id: 22,
                    title: 'إدارة الحماية الميدانية',
                    enabled: false,
                    sidebarMenus: [],
                },
            ],
        },
        {
            id: 3,
            title: 'الإدارة العامة للسلامة و الأمن الذاتي للمنشآت',
            description: 'security_support_desc',
            enabled: false,
            icon: 'assets/images/icons/general-directorate-safety-security-logo hover.svg',
            iconActive: 'assets/images/icons/general-directorate-safety-security-logo.svg',
            subcards: [
                {
                    id: 31,
                    title: 'إدارة السلامة الصناعية',
                    enabled: false,
                    sidebarMenus: [],
                },
                {
                    id: 32,
                    title: 'إدارة متابعة الأمن الذاتي',
                    enabled: false,
                    sidebarMenus: [],
                },
            ],
        },
    ];

    selectedCard: Card | null = this.cards[1];

    constructor(private baseStore: BaseStore) {
        super();
    }

    selectCard(card: Card) {
        this.selectedCard = card;
    }

    goSubmenuPage(subcard: SubCard) {
        if (subcard.enabled && subcard.sidebarMenus) {
            this.baseStore.setSidebarMenus(subcard.sidebarMenus);
            this.baseStore.setSidebarTitle(subcard.title);
            this.navigateTo('/location/dashboard');
        }
    }
}
