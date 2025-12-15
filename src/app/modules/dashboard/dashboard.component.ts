import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';

interface Card {
    id: number;
    title: string;
    description: string;
    icon: string;
    subcards?: SubCard[];
}

interface SubCard {
    id: number;
    title: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
})
export class DashboardComponent extends BaseComponent {
    cards: Card[] = [
        {
            id: 1,
            title: 'مركز القيادة و التحكم',
            description: 'command_and_control_desc',
            icon: 'pi pi-sitemap',
            subcards: [
                {
                    id: 11,
                    title: 'إدارة التحكم و التوجيه',
                },
                {
                    id: 12,
                    title: 'إدارة الخطط و الاسناد الامني',
                },
            ],
        },
        {
            id: 2,
            title: 'الإدارة العامة لحماية المنشآت',
            description: 'field_survey_desc',
            icon: 'pi pi-video',
            subcards: [
                {
                    id: 21,
                    title: 'إدارة المسح الميداني',
                },
                {
                    id: 22,
                    title: 'إدارة الحماية الميدانية',
                },
            ],
        },
        {
            id: 3,
            title: 'الإدارة العامة للسلامة و الأمن الذاتي للمنشآت',
            description: 'security_support_desc',
            icon: 'pi pi-shield',
            subcards: [
                {
                    id: 31,
                    title: 'إدارة السلامة الصناعية',
                },
                {
                    id: 32,
                    title: 'إدارة متابعة الأمن الذاتي',
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
