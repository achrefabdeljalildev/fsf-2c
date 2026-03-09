import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { locationCardModel } from '../models/location-card.model';
import { locationCardService } from '../services/location-card.service';

@Component({
    selector: 'app-location-card',
    templateUrl: './location-card.component.html',
    standalone: false,
})
export class locationCardComponent extends BaseListComponent<locationCardModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;
    mapUrl!: SafeResourceUrl;

    constructor(
        private service: locationCardService,
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

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<locationCardModel>>> {
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
