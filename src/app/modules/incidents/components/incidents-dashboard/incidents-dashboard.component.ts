import { Component, OnInit } from '@angular/core';
import { CriteriaModel } from '@shared/models/base/criteria.model';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { incidentsModel } from '../../models/incidents.model';
import { incidentsService } from '../../services/incidents.service';

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
    selector: 'app-incidents-dashboard',
    templateUrl: './incidents-dashboard.component.html',
    styleUrls: ['./incidents-dashboard.component.css'],
    standalone: false,
})
export class incidentsDashboardComponent extends BaseComponent implements OnInit {
    stats: StatCard[] = [
        {
            icon: 'assets/images/icons/location-logo.svg',
            value: '20',
            label: 'عدد البلاغات الاجمالي',
        },
        {
            icon: 'assets/images/icons/location-important-logo.svg',
            value: '09',
            label: 'بلاغات بانتظار الارسال',
        },
        {
            icon: 'assets/images/icons/location-whait-active-logo.svg',
            value: '08',
            label: 'بلاغات بانتظار التمرير',
        },
        {
            icon: 'assets/images/icons/pending-verification-logo.svg',
            value: '03',
            label: 'لاغات بانتظار رفعها للقيادة',
        },
    ];

    actionLog: ActionLogItem[] = [];

    searchText = '';

    constructor(private incidentsService: incidentsService) {
        super();
    }

    ngOnInit(): void {
        this.loadLastHypotheses();
    }

    private loadLastHypotheses(): void {
        const criteria = new CriteriaModel({ pageSize: 4 });
        this.incidentsService.getPagedList(criteria).subscribe({
            next: (response: any) => {
                const incidents = response.data.items as incidentsModel[];
                this.actionLog = incidents.map((incident: incidentsModel) => ({
                    id: incident.id || 0,
                    name: incident.nameAr,
                    title: incident.riskCode || '',
                    date: incident.date
                        ? new Date(incident.date).toLocaleDateString('ar-SA')
                        : '01/01/2026',
                    locationCode: incident.locationId || 0,
                    descriptionAr: incident.descriptionAr || 'description ',
                }));
            },
            error: (error) => {
                console.error('Error loading hypotheses:', error);
            },
        });
    }

    private determineSeverity(hypothese: incidentsModel): ActionSeverity {
        return 'info';
    }

    clearSearch(): void {
        this.searchText = '';
    }

    viewMore(): void {
        this.router.navigate(['/location-risk/list']);
    }

    clickName(): void {
        this.router.navigate(['/location-risk/list']);
    }

    openRankItem(item: RankedItem): void {}
}
