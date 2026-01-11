import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { ClassificationOfRiskSituations } from 'src/app/modules/settings/risk-register-settings/classification-of-risk-situations/models/classification-of-risk-situations';
import { ClassificationOfRiskSituationsService } from 'src/app/modules/settings/risk-register-settings/classification-of-risk-situations/services/classification-of-risk-situations.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-situation-list',
    templateUrl: './situation-list.component.html',
    standalone: false,
})
export class ClassificationOfRiskSituationsListComponent extends BaseListComponent<ClassificationOfRiskSituations> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

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
        ApiResponseModel<PagedResponse<ClassificationOfRiskSituations>>
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
