import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { TypeOfHypotheses } from 'src/app/modules/settings/assumption-settings/Types-of-hypotheses/models/Types-of-hypotheses.model';
import { TypeOfHypothesesService } from 'src/app/modules/settings/assumption-settings/Types-of-hypotheses/services/Types-of-hypotheses.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-types-of-hypotheses-list',
    templateUrl: './types-of-hypotheses-list.component.html',
    standalone: false,
})
export class TypeOfHypothesesListComponent extends BaseListComponent<TypeOfHypotheses> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: TypeOfHypothesesService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'assumptionSettings.typeOfHypothesis' },
            { field: 'descriptionAr', title: 'assumptionSettings.descriptionAr' },
            { field: 'actions', title: 'assumptionSettings.procedures', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<TypeOfHypotheses>>> {
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
