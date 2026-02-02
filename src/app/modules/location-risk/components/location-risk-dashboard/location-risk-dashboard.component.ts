import { Component, OnInit } from '@angular/core';
import { CriteriaModel } from '@shared/models/base/criteria.model';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { LocationRisk } from '../../models/location-risk.model';
import { LocationRiskService } from '../../services/location-risk.service';
type ActionSeverity = 'success' | 'info' | 'warn' | 'danger';

interface StatCard {
    icon: string;
    value: string;
    label: string;
}

interface ActionLogItem {
    name: string;
    title: string;
    locationCode: number;
    date: string;
    descriptionAr: string;
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
    selector: 'app-location-risk-dashboard',
    templateUrl: './location-risk-dashboard.component.html',
    styleUrls: ['./location-risk-dashboard.component.css'],
    standalone: false,
})
export class LocationRiskDashboardComponent extends BaseComponent implements OnInit {
    // Top stats
    stats: StatCard[] = [
        {
            icon: 'assets/images/icons/location-logo.svg',
            value: '16',
            label: 'الفرضيات المنفذة بالمنطقة',
        },
        {
            icon: 'assets/images/icons/location-important-logo.svg',
            value: '20%',
            label: 'نسبة الفرضيات المرسلة للوزارة',
        },
        {
            icon: 'assets/images/icons/location-whait-active-logo.svg',
            value: '08',
            label: 'الفرضيات بإنتظار التنفيذ',
        },
        {
            icon: 'assets/images/icons/pending-verification-logo.svg',
            value: '10',
            label: 'الفرضيات المقترحة ',
        },
    ];

    // Action log
    actionLog: ActionLogItem[] = [];

    // Table
    searchText = '';

    constructor(private LocationRiskService: LocationRiskService) {
        super();
    }

    ngOnInit(): void {
        this.loadLastHypotheses();
    }

    private loadLastHypotheses(): void {
        const criteria = new CriteriaModel({ pageSize: 4 });
        this.LocationRiskService.getPagedList(criteria).subscribe({
            next: (response: any) => {
                const LocationRisk = response.data.items as LocationRisk[];
                this.actionLog = LocationRisk.map((LocationRisk: LocationRisk) => ({
                    id: LocationRisk.id || 0,
                    name: LocationRisk.nameAr,
                    title: LocationRisk.riskCode || '',
                    date: LocationRisk.date
                        ? new Date(LocationRisk.date).toLocaleDateString('ar-SA')
                        : '01/01/2026',
                    locationCode: LocationRisk.locationId || 0,
                    descriptionAr: LocationRisk.descriptionAr || 'description ',
                }));
            },
            error: (error) => {
                console.error('Error loading hypotheses:', error);
            },
        });
    }

    private determineSeverity(hypothese: LocationRisk): ActionSeverity {
        // You can customize this logic based on your needs
        return 'info';
    }

    clearSearch(): void {
        this.searchText = '';
    }

    // Dummy handlers
    viewMore(): void {
        this.router.navigate(['/location-risk/list']);
    }

    clickName(): void {
        this.router.navigate(['/location-risk/list']);
    }

    openRankItem(item: RankedItem): void {}
}
