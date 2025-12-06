import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';

interface Card {
    id: number;
    title: string;
    titleEn: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseComponent {
    cards: Card[] = [
        {
            id: 1,
            title: 'التحكم والتوجيه',
            titleEn: 'command and control',
            description: 'command_and_control_desc',
            icon: 'assets/icons/command_control.svg',
        },
        {
            id: 2,
            title: 'المسح الميداني',
            titleEn: 'Field Survey',
            description: 'field_survey_desc',
            icon: 'assets/icons/field_survey.svg',
        },
        {
            id: 3,
            title: 'الإسناد الأمني',
            titleEn: 'Security Support',
            description: 'security_support_desc',
            icon: 'assets/icons/security_support.svg',
        },
        {
            id: 4,
            title: 'الحماية الميدانية',
            titleEn: 'Field Protection',
            description: 'field_protection_desc',
            icon: 'assets/icons/field_protection.svg',
        },
        {
            id: 5,
            title: 'التجهيزات الأمنية',
            titleEn: 'Security Equipment',
            description: 'security_equipment_desc',
            icon: 'assets/icons/security_equipment.svg',
        },
        {
            id: 6,
            title: 'الإعدادات العامة',
            titleEn: 'General Settings',
            description: 'general_settings_desc',
            icon: 'assets/icons/general_settings.svg',
        },
    ];

    toggleLanguage() {
        const newLang = this.isArabeMode() ? 'en' : 'ar';
        this.translateService.use(newLang);
        localStorage.setItem('i18n_locale', newLang);

        window.location.reload();
    }
}
