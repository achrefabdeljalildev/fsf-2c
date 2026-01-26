import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { BaseStore, Card, SubCard } from 'src/app/store/base.store';

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
                    key: '',
                    title: 'إدارة التحكم و التوجيه',
                    enabled: false,
                    routerLink: '/location/dashboard',
                },
                {
                    id: 12,
                    key: '',
                    title: 'إدارة الخطط و الاسناد الامني',
                    enabled: false,
                    routerLink: '/location/dashboard',
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
                    key: 'fieldSurvey',
                    routerLink: '/location/dashboard',
                    title: 'إدارة المسح الميداني',
                    enabled: true,
                },
                {
                    id: 22,
                    key: 'hypothese',
                    title: 'إدارة الحماية الميدانية',
                    enabled: true,
                    routerLink: '/hypothese/dashboard',
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
                    key: '',
                    title: 'إدارة السلامة الصناعية',
                    enabled: false,
                    routerLink: '/location/dashboard',
                },
                {
                    id: 32,
                    key: '',
                    title: 'إدارة متابعة الأمن الذاتي',
                    enabled: false,
                    routerLink: '/location/dashboard',
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
        if (subcard.enabled && subcard.routerLink) {
            this.navigateTo(subcard.routerLink);
        }
    }
}
