import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { preparingTheNamesOfHypotheses } from 'src/app/modules/settings/assumption-settings/preparing-the-names-of-hypotheses/models/preparing-the-names-of-hypotheses.model';
import { preparingTheNamesOfHypothesesService } from 'src/app/modules/settings/assumption-settings/preparing-the-names-of-hypotheses/services/preparing-the-names-of-hypotheses.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-preparing-the-names-of-hypotheses-list',
    templateUrl: './preparing-the-names-of-hypotheses-list.component.html',
    standalone: false,
})
export class PreparingTheNamesOfHypothesesListComponent extends BaseListComponent<preparingTheNamesOfHypotheses> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: preparingTheNamesOfHypothesesService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'assumptionSettings.HypothesisTitles' },
            {
                field: 'hypotheseTypeName',
                title: 'assumptionSettings.typeOfHypothese',
                width: '250px',
            },
            { field: 'actions', title: 'assumptionSettings.procedures', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<preparingTheNamesOfHypotheses>>
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
