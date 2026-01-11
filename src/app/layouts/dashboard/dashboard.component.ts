import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';

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
                },
                {
                    id: 12,
                    title: 'إدارة الخطط و الاسناد الامني',
                    enabled: false,
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
                },
                {
                    id: 22,
                    title: 'إدارة الحماية الميدانية',
                    enabled: false,
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
                },
                {
                    id: 32,
                    title: 'إدارة متابعة الأمن الذاتي',
                    enabled: false,
                },
            ],
        },
    ];

    selectedCard: Card | null = this.cards[0];

    constructor() {
        super();
    }

    selectCard(card: Card) {
        this.selectedCard = card;
    }
}
