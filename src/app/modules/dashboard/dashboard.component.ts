import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';

interface Card {
    id: number;
    title: string;
    titleEn: string;
    description: string;
    icon: string;
    subcards?: Card[];
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false
})
export class DashboardComponent extends BaseComponent {
    cards: Card[] = [
        {
            id: 1,
            title: 'مركز القيادة و التحكم',
            titleEn: 'command and control',
            description: 'command_and_control_desc',
            icon: 'pi pi-sitemap',
            subcards: [
                {
                    id: 11,
                    title: 'إدارة التحكم و التوجيه',
                    titleEn: 'Sub Control 1',
                    description: 'sub_desc_1',
                    icon: 'assets/icons/sub1.svg',
                },
                {
                    id: 12,
                    title: 'إدارة الخطط و الاسناد الامني',
                    titleEn: 'Sub Control 2',
                    description: 'sub_desc_2',
                    icon: 'assets/icons/sub2.svg',
                },
            ],
        },
        {
            id: 2,
            title: 'الإدارة العامة لحماية المنشآت',
            titleEn: 'Field Survey',
            description: 'field_survey_desc',
            icon: 'pi pi-video',
            subcards: [
                {
                    id: 21,
                    title: 'إدارة المسح الميداني',
                    titleEn: 'Sub Survey 1',
                    description: 'sub_desc_3',
                    icon: 'assets/icons/sub3.svg',
                },
                {
                    id: 22,
                    title: 'إدارة الحماية الميدانية',
                    titleEn: 'Sub Survey 2',
                    description: 'sub_desc_4',
                    icon: 'assets/icons/sub4.svg',
                },
            ],
        },
        {
            id: 3,
            title: 'الإدارة العامة للسلامة و الأمن الذاتي للمنشآت',
            titleEn: 'Security Support',
            description: 'security_support_desc',
            icon: 'pi pi-shield',
            subcards: [
                {
                    id: 31,
                    title: 'إدارة السلامة الصناعية',
                    titleEn: 'Sub Support 1',
                    description: 'sub_desc_5',
                    icon: 'assets/icons/sub5.svg',
                },
                {
                    id: 32,
                    title: 'إدارة متابعة الأمن الذاتي',
                    titleEn: 'Sub Support 2',
                    description: 'sub_desc_6',
                    icon: 'assets/icons/sub6.svg',
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
