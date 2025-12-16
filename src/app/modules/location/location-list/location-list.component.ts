import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';

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
    templateUrl: './location-list.component.html',
    standalone: false,
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
