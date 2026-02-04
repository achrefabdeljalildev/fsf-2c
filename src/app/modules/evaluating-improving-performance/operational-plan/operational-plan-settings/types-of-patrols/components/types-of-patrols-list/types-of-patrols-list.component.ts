import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { TypesOfPatrolsModel } from 'src/app/modules/evaluating-improving-performance/operational-plan/operational-plan-settings/types-of-patrols/models/types-of-patrols.model';
import { TypesOfPatrolsService } from 'src/app/modules/evaluating-improving-performance/operational-plan/operational-plan-settings/types-of-patrols/services/types-of-patrols.service';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-types-of-patrols-list',
    templateUrl: './types-of-patrols-list.component.html',
    standalone: false,
})
export class TypesOfPatrolsListComponent extends BaseListComponent<TypesOfPatrolsModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: TypesOfPatrolsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<TypesOfPatrolsModel>>
    > {
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
