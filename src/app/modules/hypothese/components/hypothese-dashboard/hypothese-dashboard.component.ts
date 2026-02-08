import { Component, OnInit } from '@angular/core';
import { CriteriaModel } from '@shared/models/base/criteria.model';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { Hypothese } from '../../models/hypothese.model';
import { HypotheseService } from '../../services/hypothese.service';
type ActionSeverity = 'success' | 'info' | 'warn' | 'danger';

interface StatCard {
    icon: string;
    value: string;
    label: string;
}

interface ActionLogItem {
    id: number;
    name: string;
    title: string;
    date: string;
    locationCode: string;
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
    selector: 'app-hypothese-dashboard',
    templateUrl: './hypothese-dashboard.component.html',
    standalone: false,
})
export class HypotheseDashboardComponent extends BaseComponent implements OnInit {
    // Top stats
    stats: StatCard[] = [
        {
            icon: 'assets/images/icons/location-logo.svg',
            value: '15',
            label: 'عدد الفرضيات المنفذة بالمنطقة',
        },
        {
            icon: 'assets/images/icons/location-important-logo.svg',
            value: '25%',
            label: 'نسبة الفرضيات المرسلة للوزارة',
        },
        {
            icon: 'assets/images/icons/location-whait-active-logo.svg',
            value: '10',
            label: 'الفرضيات بإنتظار التنفيذ',
        },
        {
            icon: 'assets/images/icons/pending-verification-logo.svg',
            value: '08',
            label: 'الفرضيات المقترحة ',
        },
    ];

    // Action log
    actionLog: ActionLogItem[] = [];

    // Table
    searchText = '';

    constructor(private hypotheseService: HypotheseService) {
        super();
    }

    ngOnInit(): void {
        this.loadLastHypotheses();
    }

    private loadLastHypotheses(): void {
        const criteria = new CriteriaModel({ pageSize: 4 });
        this.hypotheseService.getPagedList(criteria).subscribe({
            next: (response: any) => {
                const hypotheses = response.data.items as Hypothese[];
                this.actionLog = hypotheses.map((hypothese: Hypothese) => ({
                    id: hypothese.id!,
                    name: hypothese.nameAr,
                    title: hypothese.hypotheseTitleName || '',
                    date: hypothese.date
                        ? new Date(hypothese.date).toLocaleDateString('ar-SA')
                        : '',
                    locationCode: hypothese.locationCode || '',
                }));
            },
            error: (error) => {
                console.error('Error loading hypotheses:', error);
            },
        });
    }

    private determineSeverity(hypothese: Hypothese): ActionSeverity {
        // You can customize this logic based on your needs
        return 'info';
    }

    clearSearch(): void {
        this.searchText = '';
    }

    // Dummy handlers
    viewMore(): void {
        this.router.navigate(['/hypothese/list']);
    }

    clickName(): void {
        this.router.navigate(['/hypothese/list']);
    }

    clickLocation(): void {
        this.router.navigate(['/location/list']);
    }

    openRankItem(item: RankedItem): void {}
}
