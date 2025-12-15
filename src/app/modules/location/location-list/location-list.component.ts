import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG 18
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';

type ActionSeverity = 'success' | 'info' | 'warn' | 'danger';

interface StatCard {
    icon: string;
    value: string;
    label: string;
}

interface ActionLogItem {
    team: string;
    statusLabel: string;
    severity: ActionSeverity;
    description: string;
}

interface RankedItem {
    title: string;
    subtitle: string;
    dateText: string;
}

interface SiteRow {
    selected: boolean;
    code: string;
    name: string;
    mobileRounds: number;
    fixedRounds: number;
    equipment: string;
}

@Component({
    selector: 'app-location-list',
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        BadgeModule,
        TagModule,
        TableModule,
        InputTextModule,
        CheckboxModule,
        DividerModule,
    ],
    templateUrl: './location-list.component.html'
})
export class LocationListComponent extends BaseComponent {
    // Top stats
    stats: StatCard[] = [
        { icon: 'pi pi-map-marker', value: '15', label: 'عدد مواقع المنطقة' },
        {
            icon: 'pi pi-percentage',
            value: '25%',
            label: 'نسبة المواقع المرممة',
        },
        { icon: 'pi pi-home', value: '10', label: 'المواقع بإنتظار التنشيط' },
        { icon: 'pi pi-id-card', value: '08', label: 'بإنتظار التحقق' },
    ];

    // Action log
    actionLog: ActionLogItem[] = [
        {
            team: 'الفريق 150',
            statusLabel: 'تفقد',
            severity: 'success',
            description: 'وصف سريع يتناسب مع هذه الجزئية بشكل مبسط وسلس...',
        },
        {
            team: 'الفريق 150',
            statusLabel: 'تفقد',
            severity: 'success',
            description: 'وصف سريع يتناسب مع هذه الجزئية بشكل مبسط وسلس...',
        },
        {
            team: 'الفريق 150',
            statusLabel: 'تفقد',
            severity: 'success',
            description: 'وصف سريع يتناسب مع هذه الجزئية بشكل مبسط وسلس...',
        },
        {
            team: 'الفريق 150',
            statusLabel: 'وسم',
            severity: 'warn',
            description: 'وصف سريع يتناسب مع هذه الجزئية بشكل مبسط وسلس...',
        },
    ];

    // Ranking list
    ranking: RankedItem[] = Array.from({ length: 4 }).map(() => ({
        title: 'شركة أرامكو للبترول',
        subtitle: 'آخر تحديث لاستماراة المسح الميداني',
        dateText: 'يوم 5 نوفمبر 2025',
    }));

    // Table
    searchText = '';

    rows: SiteRow[] = [
        {
            selected: false,
            code: 'A-87650RT',
            name: 'أرامكو للبترول',
            mobileRounds: 5,
            fixedRounds: 9,
            equipment: 'الدراعية',
        },
        {
            selected: false,
            code: 'A-87650RT',
            name: 'أرامكو للبترول',
            mobileRounds: 10,
            fixedRounds: 10,
            equipment: 'المجمعة',
        },
        {
            selected: false,
            code: 'A-87650RT',
            name: 'أرامكو للبترول',
            mobileRounds: 12,
            fixedRounds: 10,
            equipment: 'الغاط',
        },
        {
            selected: false,
            code: 'A-87650RT',
            name: 'أرامكو للبترول',
            mobileRounds: 0,
            fixedRounds: 20,
            equipment: 'الدراعية',
        },
    ];

    constructor() {
        super();

        this.breadcrumbService.setItems([
            { label: 'الصفحة الرئيسية', route: '/' },
            { label: 'صفحة تجريبية', route: '/services' },
            { label: 'صفحة تجريبية', route: '/services' },
            { label: 'صفحة تجريبية', route: '/services' },
            { label: 'صفحة تجريبية', route: '/services' },
        ]);
    }

    get filteredRows(): SiteRow[] {
        return this.rows;
        // const q = (this.searchText || '').trim().toLowerCase();
        // if (!q) return this.rows;

        // return this.rows.filter(
        //     (r) =>
        //         r.code.toLowerCase().includes(q) ||
        //         r.name.toLowerCase().includes(q) ||
        //         r.equipment.toLowerCase().includes(q),
        // );
    }

    clearSearch(): void {
        this.searchText = '';
    }

    // Dummy handlers
    viewMore(): void {}
    openRankItem(item: RankedItem): void {}
}
