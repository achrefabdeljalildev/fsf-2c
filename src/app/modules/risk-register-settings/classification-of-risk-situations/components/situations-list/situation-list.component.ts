import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { classificationOfRisksituations } from 'src/app/modules/risk-register-settings/classification-of-risk-situations/models/classification-of-risk-situations';
import { ClassificationOfRiskSituationsService } from 'src/app/modules/risk-register-settings/classification-of-risk-situations/services/classification-of-risk-situations.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-situation-list',
    templateUrl: './situation-list.component.html',
    standalone: false,
})
export class ClassificationOfRiskSituationsListComponent extends BaseListComponent<classificationOfRisksituations> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;

    constructor(private service: ClassificationOfRiskSituationsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<classificationOfRisksituations>>
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
        this.itemToDelete = id;
        this.showDeleteDialog = true;
    }

    confirmDelete() {
        if (this.itemToDelete) {
            this.service.deleteById(this.itemToDelete).subscribe(
                () => {
                    this.showDeleteDialog = false;
                    this.itemToDelete = null;
                    this.loadData();
                },
                (error: any) => {
                    console.error('Error deleting item', error);
                    this.showDeleteDialog = false;
                },
            );
        }
    }

    onDialogSave() {
        this.showDialog = false;
        this.selectedItemId = null;
        this.loadData();
    }
}
