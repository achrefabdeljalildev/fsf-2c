import { Component } from '@angular/core';
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
    styleUrls: ['./dashboard.component.css'],
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
                    sidebarMenus: [
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
                            label: 'مخاطر المواقع',
                            data: 'Location Risks',
                            icon: 'assets/images/icons/field-survey-sidebar.svg',
                            children: [
                                {
                                    key: '31',
                                    label: 'قائمة مخاطر المواقع',
                                    data: 'Location Risks List',
                                    icon: 'pi pi-list',
                                    routerLink: '/location-risk/list',
                                },
                            ],
                        },
                        {
                            key: '6',
                            label: 'الإعدادات',
                            data: 'Security Support',
                            icon: 'assets/images/icons/settings-sidebar-logo.svg',
                            children: [
                                {
                                    key: '6-1',
                                    label: 'اعدادات سجل المخاطر',
                                    data: 'Sub Survey 2',
                                    icon: 'assets/images/icons/settings-sidebar-logo.svg',
                                    children: [
                                        {
                                            key: '6-1-1',
                                            label: 'تصنيف نوع الخطر',
                                            data: 'Sub Survey 3',
                                            routerLink:
                                                '/risk-register-settings/classification-of-risk-type/list',
                                        },
                                        {
                                            key: '6-1-2',
                                            label: 'تصنيف احتمال الوقوع',
                                            data: 'Sub Survey 3',
                                            routerLink:
                                                '/risk-register-settings/falling-load-classification/list',
                                        },
                                        {
                                            key: '6-1-3',
                                            label: 'تصنيف أثر الخطر',
                                            data: 'Sub Survey 3',
                                            routerLink:
                                                '/risk-register-settings/classification-of-risk-impact/list',
                                        },
                                        {
                                            key: '6-1-4',
                                            label: 'تصنيف حالات الخطر',
                                            data: 'Sub Survey 3',
                                            routerLink:
                                                '/risk-register-settings/classification-of-risk-situations/list',
                                        },
                                    ],
                                },
                                {
                                    key: '6-2',
                                    label: 'إعدادات الموقع',
                                    data: 'Sub Survey 2',
                                    icon: 'assets/images/icons/location-sidebar.svg',
                                    children: [
                                        {
                                            key: '6-2-1',
                                            label: 'الجهات',
                                            data: 'Sub Survey 2',
                                            routerLink: '/organization/list',
                                        },
                                        {
                                            key: '6-2-2',
                                            label: 'المناطق',
                                            data: 'Sub Survey 2',
                                            routerLink: '/regions/list',
                                        },
                                        {
                                            key: '6-2-3',
                                            label: 'المحافظات',
                                            data: 'Sub Survey 2',
                                            routerLink: '/province/list',
                                        },
                                        {
                                            key: '6-2-4',
                                            label: 'التصنيفات',
                                            data: 'Sub Survey 2',
                                            routerLink: '/location-classification/list',
                                        },
                                        {
                                            key: '6-2-5',
                                            label: 'معايير المسح الميداني',
                                            data: 'Sub Survey 2',
                                            routerLink: '/entity-classification/list',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            key: '7',
                            label: 'إعدادات الفرضيات',
                            data: 'Sub Survey 2',
                            icon: 'assets/images/icons/assumption-settings-sidebar.svg',
                            children: [
                                {
                                    key: '7-1',
                                    label: 'اعداد الجهات المشاركة',
                                    data: 'Sub Survey 2',
                                    routerLink:
                                        '/assumption-settings/number-of-participating-entities/list',
                                },
                                {
                                    key: '7-2',
                                    label: 'اعداد مسميات الفرضيات',
                                    data: 'Sub Survey 2',
                                    routerLink:
                                        '/assumption-settings/preparing-the-names-of-hypotheses/list',
                                },
                                {
                                    key: '7-3',
                                    label: 'اعداد انواع الفرضيات',
                                    data: 'Sub Survey 2',
                                    routerLink: '/assumption-settings/Types-of-hypotheses/list',
                                },
                            ],
                        },
                    ],
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
