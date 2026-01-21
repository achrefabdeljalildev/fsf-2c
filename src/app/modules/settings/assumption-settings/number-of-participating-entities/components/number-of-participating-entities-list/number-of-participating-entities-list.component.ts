import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { NumberOfParticipatingEntities } from 'src/app/modules/settings/assumption-settings/number-of-participating-entities/models/number-of-participating-entities';
import { NumberOfParticipatingEntitiesService } from 'src/app/modules/settings/assumption-settings/number-of-participating-entities/services/number-of-participating-entities.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-number-of-participating-entities-list',
    templateUrl: './number-of-participating-entities-list.component.html',
    standalone: false,
})
export class NumberOfParticipatingEntitiesListComponent extends BaseListComponent<NumberOfParticipatingEntities> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: NumberOfParticipatingEntitiesService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'assumptionSettings.ParticipatingPartiesNames' },
            { field: 'descriptionAr', title: 'assumptionSettings.descriptionAr' },
            { field: 'actions', title: 'assumptionSettings.procedures', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<NumberOfParticipatingEntities>>
    > {
        return this.service.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

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
