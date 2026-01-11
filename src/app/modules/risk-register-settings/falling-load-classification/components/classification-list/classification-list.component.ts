import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { fallingLoadClassification } from 'src/app/modules/risk-register-settings/falling-load-classification/models/falling-load-classification';
import { FallingLoadClassificationService } from 'src/app/modules/risk-register-settings/falling-load-classification/services/falling-load-classification.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-classification-list',
    templateUrl: './classification-list.component.html',
    standalone: false,
})
export class FallingLoadClassificationListComponent extends BaseListComponent<fallingLoadClassification> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;

    constructor(private service: FallingLoadClassificationService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'color', title: 'formLabels.color' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<fallingLoadClassification>>
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
