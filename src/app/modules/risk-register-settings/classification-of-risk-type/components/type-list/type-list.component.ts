import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { classificationOfRisktype } from 'src/app/modules/risk-register-settings/classification-of-risk-type/models/classification-of-risk-type';
import { ClassificationOfRiskTypeService } from 'src/app/modules/risk-register-settings/classification-of-risk-type/services/classification-of-risk-type.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-type-list',
    templateUrl: './type-list.component.html',
    standalone: false,
})
export class ClassificationOfRiskTypeListComponent extends BaseListComponent<classificationOfRisktype> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;

    constructor(private service: ClassificationOfRiskTypeService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<classificationOfRisktype>>
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
