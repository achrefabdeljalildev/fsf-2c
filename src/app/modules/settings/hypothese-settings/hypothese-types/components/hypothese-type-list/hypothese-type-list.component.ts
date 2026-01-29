import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { HypotheseType } from '../../models/hypothese-type.model';
import { HypotheseTypeService } from '../../services/hypothese-type.service';

@Component({
    selector: 'app-hypothese-type-list',
    templateUrl: './hypothese-type-list.component.html',
    standalone: false,
})
export class HypotheseTypeListComponent extends BaseListComponent<HypotheseType> {
    showDialog: boolean = false;
    selectedHypotheseTypeId: number | null = null;

    constructor(private hypotheseTypeService: HypotheseTypeService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<HypotheseType>>> {
        return this.hypotheseTypeService.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.selectedHypotheseTypeId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedHypotheseTypeId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeHypotheseType(id: number, hypotheseTypeName: string) {
        this.confirmDelete(hypotheseTypeName, () => {
            this.hypotheseTypeService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.hypotheseTypeDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }
}
