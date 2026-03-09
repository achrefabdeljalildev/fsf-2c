import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { planReviewsModel } from '../models/plan-reviews.model';
import { planReviewsService } from '../services/plan-reviews.service';

interface StatCard {
    icon: string;
    value: string;
    label: string;
}

@Component({
    selector: 'app-plan-reviews',
    templateUrl: './plan-reviews.component.html',
    standalone: false,
})
export class planReviewsComponent extends BaseListComponent<planReviewsModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;
    mapUrl!: SafeResourceUrl;

    constructor(
        private service: planReviewsService,
        private sanitizer: DomSanitizer,
    ) {
        super();
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://maps.google.com/maps?q=24.774265,46.738586&z=15&output=embed',
        );
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'patrols', title: 'locationCard.patrols' },
            { field: 'proactivePatrols', title: 'locationCard.proactivePatrols' },
            { field: 'stationedPatrols', title: 'locationCard.stationedPatrols' },
            { field: 'protectiveSystems', title: 'locationCard.protectiveSystems' },
            { field: 'protectiveSystems', title: 'locationCard.protectiveSystems' },
            { field: 'antiAircraftSystems', title: 'locationCard.antiAircraftSystems' },
            { field: 'pointContention', title: 'locationCard.pointContention' },
            { field: 'platoonSupervisor', title: 'locationCard.platoonSupervisor' },
            { field: 'oneFactionGroup', title: 'locationCard.oneFactionGroup' },
            { field: 'totalFactions', title: 'locationCard.totalFactions' },
            { field: 'morningFixer', title: 'locationCard.morningFixer' },
            { field: 'headquartersGuarding', title: 'locationCard.headquartersGuarding' },
            { field: 'numberOfAdministrators', title: 'locationCard.numberOfAdministrators' },
            { field: 'numberOfAlternates', title: 'locationCard.numberOfAlternates' },
            { field: 'holidaysAndCourses', title: 'locationCard.holidaysAndCourses' },
            { field: 'total', title: 'locationCard.total' },
        ];
    }

    search: string = '';

    candidates = [
        {
            code: 'A-5432',
            name: 'خالد عبدالله الأحمدي',
            image: '',
            departments: ['اسم الإدارة', 'اسم الإدارة'],
        },
        {
            code: 'A-5433',
            name: 'محمد علي الزهراني',
            image: '',
            departments: ['اسم الإدارة', 'اسم الإدارة'],
        },
        {
            code: 'A-5434',
            name: 'سلمان القحطاني',
            image: '',
            departments: ['اسم الإدارة', 'اسم الإدارة'],
        },
        {
            code: 'A-5435',
            name: 'عبدالله الدوسري',
            image: '',
            departments: ['اسم الإدارة', 'اسم الإدارة'],
        },
    ];

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<planReviewsModel>>> {
        return this.service.getPagedList(this.criteria);
    }

    workSystem = {
        groups: 5,
        classification: 'A+',
        date: '2023 / 04 / 11',
    };

    openCreateDialog() {
        this.selectedItemId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedItemId = id;
        this.showDialog = true;
    }

    removeItem(id: number) {
        this.confirmDelete('Item', () => {
            this.service.deleteById(id).subscribe(
                () => {
                    this.loadData();
                },
                (error: any) => {
                    console.error('Error deleting item', error);
                },
            );
        });
    }

    onDialogSave() {
        this.showDialog = false;
        this.selectedItemId = null;
        this.loadData();
    }
}
