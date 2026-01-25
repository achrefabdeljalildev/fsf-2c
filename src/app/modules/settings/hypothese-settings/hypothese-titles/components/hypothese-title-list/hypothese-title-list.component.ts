import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { HypotheseTitle } from '../../models/hypothese-title.model';
import { HypotheseTitleService } from '../../services/hypothese-title.service';

@Component({
    selector: 'app-hypothese-title-list',
    templateUrl: './hypothese-title-list.component.html',
    standalone: false,
})
export class HypotheseTitleListComponent extends BaseListComponent<HypotheseTitle> {
    showDialog: boolean = false;
    selectedHypotheseTitleId: number | null = null;

    constructor(private hypotheseTitleService: HypotheseTitleService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'hypotheseTypeName', title: 'hypotheseType.hypotheseType' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<HypotheseTitle>>> {
        return this.hypotheseTitleService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    openCreateDialog() {
        this.selectedHypotheseTitleId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedHypotheseTitleId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeHypotheseTitle(id: number, hypotheseTitleName: string) {
        this.confirmDelete(hypotheseTitleName, () => {
            this.hypotheseTitleService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.hypotheseTitleDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }
}
