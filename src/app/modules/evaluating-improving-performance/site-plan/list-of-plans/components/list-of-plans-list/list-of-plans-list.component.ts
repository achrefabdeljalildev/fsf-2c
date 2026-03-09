import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { listOfPlansModel } from '../../models/list-of-plans.model';
import { listOfPlansService } from '../../services/list-of-plans.service';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-list-of-plans-list',
    templateUrl: './list-of-plans-list.component.html',
    standalone: false,
})
export class listOfPlansListComponent extends BaseListComponent<listOfPlansModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: listOfPlansService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'codeId', title: 'formLabels.codeId' },
            { field: 'locationName', title: 'formLabels.codeIlocationName' },
            { field: 'region', title: 'formLabels.region' },
            { field: 'governorate', title: 'formLabels.governorate' },
            { field: 'affiliatedEntities', title: 'formLabels.affiliatedEntities' },
            { field: 'planUpdates', title: 'formLabels.planUpdates' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<listOfPlansModel>>> {
        return this.service.getPagedList(this.criteria);
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
