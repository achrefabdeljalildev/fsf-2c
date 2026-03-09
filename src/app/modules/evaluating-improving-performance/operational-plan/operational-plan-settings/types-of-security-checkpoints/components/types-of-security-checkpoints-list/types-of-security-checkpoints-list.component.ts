import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { TypesOfSecurityCheckpointsModel } from '../../models/types-of-security-checkpoints.model';
import { TypesOfSecurityCheckpointsService } from '../../services/types-of-security-checkpoints.service';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-types-of-security-checkpoints-list',
    templateUrl: './types-of-security-checkpoints-list.component.html',
    standalone: false,
})
export class TypesOfSecurityCheckpointsListComponent extends BaseListComponent<TypesOfSecurityCheckpointsModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: TypesOfSecurityCheckpointsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<TypesOfSecurityCheckpointsModel>>
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
